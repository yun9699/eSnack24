import axios from "axios";
import {IRequestProduct} from "../../types/commnunityTypes.ts";

const host = 'http://localhost:8080/api/v1/request/product';

export const getRequestProductList = async ( page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list?page=${page}&size=${size}`);

    console.log(res.data);

    return res.data;
}

export const getRequestProductDetail = async (cpno: number) => {
    const res = await axios.get(`${host}/detail/${cpno}`);

    console.log(res.data);

    return res.data
}

export const registerRequestProduct = async (product: IRequestProduct):Promise<void> => {
    const res = await axios.post(`${host}/add`, product);

    console.log(res.data);

    return res.data
}

export const editRequestProduct = async (cpno: number, payload: { cptitle: string; cpproduct: string }) => {
    const res = await axios.put(`${host}/edit/${cpno}`, payload);

    console.log(res.data);

    return res.data;
};


export const deleteRequestProduct = async (cpno: number) => {
    const res = await axios.delete(`${host}/delete/${cpno}`);

    console.log(res.data);

    return res.data;
}