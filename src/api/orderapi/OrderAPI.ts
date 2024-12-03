import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";

const user = useUserStore();

const host = 'http://localhost:8080/api/v1/order';

export const createOrder = async (pnos: number[], ciqtys: number[], currency: string) => {

    console.log(pnos);

    const res = await axios.post(`${host}/create/${user.getUno}`,
        {pnos: pnos, ciqtys: ciqtys, currency: currency});

    return res.data;
}

export const viewOrder = async (ono: number) => {

    const res = await axios.get(`${host}/view/${ono}`);

    return res.data;
}