import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";

const user = useUserStore();

const host = 'http://localhost:8080/api/v1/order';

export const createOrder = async (pnos: number[], ciqtys: number[]) => {

    console.log(pnos);

    const res = await axios.post(`${host}/create/${user.getUno}`,
        {pnos: pnos, ciqtys: ciqtys});

    return res.data;
}

export const viewOrder = async (ono: number) => {

    const res = await axios.get(`${host}/view/${ono}`);

    return res.data;
}

export const detailOrder = async (ono: number) => {

    const res = await axios.get(`${host}/detail/${ono}`);

    return res.data;
}