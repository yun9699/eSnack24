import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/exchange-rate`;

export const getExchangeRate = async (targetCurrency: string) => {

    const res = await axios.get(`${host}/get`, {

        params: { targetCurrency: targetCurrency }
    });

    return res.data;
}