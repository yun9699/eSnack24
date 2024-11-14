import axios from "axios";

const auth_code_path = 'https://accounts.google.com/o/oauth2/v2/auth'

const rest_api_key = '6550639460-vq6qpp6ea2u77fabbo3gkhud9mdedtn9.apps.googleusercontent.com';

const redirect_uri = 'http://localhost:5173/login/googlere';

const access_token_url = 'https://oauth2.googleapis.com/token';

const host = 'http://localhost:8080/api/v1/login/google';


export const getGoogleLoginLink = () => {

    const GoogleURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&scope=email profile`

    return GoogleURL
}

export const getGoogleMemberWithAccessToken = async (accessToken: string) => {
    const res = await axios.get(`${host}?accessToken=${accessToken}`);
    return res.data;
};

export const getGoogleAccessToken = async (authCode: string) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        client_secret: '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',
        response_type: 'code',
        code: authCode,
    });

    const res = await axios.post(access_token_url, params, header);

    return res.data.access_token;
};
