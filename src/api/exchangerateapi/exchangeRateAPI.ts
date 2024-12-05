import axios from "axios";

const host = 'http://localhost:8080/api/v1/exchange-rate';

export const getExchangeRate = async (targetCurrency: string) => {

    const res = await axios.get(`${host}/get`, {

        params: { targetCurrency: targetCurrency }
    });

    return res.data;
}