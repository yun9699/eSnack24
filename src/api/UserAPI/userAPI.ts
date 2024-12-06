import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";
import {IAddress, IUserInfo} from "../../types/userRegisterTypes.ts";
import {IReadUser} from "../../types/userTypes.ts";

const user = useUserStore();

const uno: number = user.getUno;
const userEmail: string = user.getUserEmail;

const host = `${import.meta.env.VITE_API_HOST}`;

export const registerUser = async (userInfo: IUserInfo) => {

    const res = await axios.put(`${host}/login/reg/${uno}`, userInfo);

    return res.data;
}

export const registerPersonalAllergy = async (anos: number[]) => {

    const personalAllergy = { anos };

    user.setPersonalAllergies(anos);

    const res = await axios.post(`${host}/user/setallergies/${uno}`, personalAllergy);
    return res.data;
};

// export const readAgreementDoc = async () => {
//
//     const res = await axios.get('/Agreement_Doc.JSON');
//
//     return res.data;
// }

export const registerAddress = async (address: IAddress) => {

    const res = await axios.post(`${host}/address/reg/${uno}`, address);

    return res.data;
}

export const logoutUser = async () => {

    const res = await axios.post(`${host}/login/deleteToken`, userEmail);

    return res.data;
}

export const getTossUser = async () => {

    const res = await axios.get(`${host}/login/getTossUser/${uno}`);

    return res.data;
}

export const readUser = async () => {

    const res = await axios.get(`${host}/login/read/${uno}`);

    return res.data;
}

export const editUser = async (user: IReadUser) => {

    const res = await axios.put(`${host}/login/edit/${uno}`, user);

    return res.data;
}