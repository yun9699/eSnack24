import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";
import {IAddress, IUserInfo} from "../../types/userRegisterTypes.ts";

const user = useUserStore();

const uno: number = user.getUno;
const userEmail: string = user.getUserEmail;

const host = 'https://esnack24.store/api/v1';

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