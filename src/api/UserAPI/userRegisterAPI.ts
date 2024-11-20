import axios from "axios";
import useUser from "../../stores/useUser.ts";

const user = useUser();

const uno = user.getUno;

const host = 'http://localhost:8080/api/v1';

export const registerUser = async (userInfo: any) => {

    console.log("uno: " + uno);

    const res = await axios.put(`${host}/login/reg/${uno}`, userInfo);

    console.log("userInfo")
    console.log(userInfo);

    return res.data;
}

export const registerPersonalAllergy = async (anos: number[]) => {
    const personalAllergy = { anos };

    const res = await axios.post(`${host}/user/setallergies/${uno}`, personalAllergy);
    return res.data;
};

export const readAgreementDoc = async () => {

    const res = await axios.get('/Agreement_Doc.JSON');

    return res.data;
}

export const registerAddress = async (address: any) => {

    const res = await axios.post(`${host}/address/reg/${uno}`, address);

    return res.data;
}