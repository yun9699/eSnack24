import axios from "axios";
import {IRequestAllergy} from "../../types/commnunityTypes.ts";

const host = 'https://esnack24.store/api/v1/request/allergy';

export const getRequestAllergyList = async ( page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list?page=${page}&size=${size}`);

    console.log(res.data);

    return res.data;
}

export const getRequestAllergyDetail = async (cano: number) => {
    const res = await axios.get(`${host}/detail/${cano}`);

    console.log(res.data);

    return res.data
}

export const registerRequestAllergy = async (allergy: IRequestAllergy):Promise<void> => {
    const res = await axios.post(`${host}/add`, allergy);

    console.log(res.data);

    return res.data
}

export const editRequestAllergy = async (cano: number, payload: { catitle: string; caallergy: string }) => {
    const res = await axios.put(`${host}/edit/${cano}`, payload);

    console.log(res.data);

    return res.data;
};


export const deleteRequestAllergy = async (cano: number) => {
    const res = await axios.delete(`${host}/delete/${cano}`);

    console.log(res.data);

    return res.data;
}