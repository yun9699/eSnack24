import axios from "axios";
import { refreshRequest } from "../api/loginapi/tokenAPI.ts";
import useUserStore from "../stores/useUserStore.ts";
import {ITokenResponse} from "../types/loginTypes.ts";

const jwtAxios = axios.create();

const beforeReq = (config) => {
    console.log("beforeRequest");

    const userStore = useUserStore();

    const accessToken = userStore.getAccessToken;

    if (!accessToken) {
        throw new Error('Access Token not found');
    }

    console.log("accessToken", accessToken);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
};

const failReq = (error) => {
    console.log("fail Request");
    return Promise.reject(error);
};

const beforeRes = async (res) => {
    console.log("beforeResponse");

    const data = res.data;

    if (data.error && data.error === 'ERROR_ACCESS_TOKEN') {
        console.log('Access token expired, attempting refresh');

        const userStore = useUserStore();

        const accessToken: string = userStore.getAccessToken;
        const refreshToken: string = userStore.getRefreshToken;

        if (!accessToken || !refreshToken) {
            throw new Error('Tokens not found in user store');
        }

        try {
            const refreshResult: ITokenResponse = await refreshRequest(accessToken, refreshToken);

            console.log("refreshResult", refreshResult);

            // Update the store with new tokens
            userStore.setAccessToken(refreshResult.accessToken);
            userStore.setRefreshToken(refreshResult.refreshToken);

            // Retry the original request with the new access token
            const originalRequest = res.config;
            originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;

            return await axios(originalRequest);
        } catch (error) {
            console.error("Failed to refresh token:", error);
            throw error;
        }
    }

    return res;
};

const failRes = (error) => {
    console.log("fail Response");
    return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
