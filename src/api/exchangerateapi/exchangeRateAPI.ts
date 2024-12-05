import axios from "axios";

const host = 'https://esnack24.store/api/v1/exchange-rate';

export const getExchangeRate = async (targetCurrency: string) => {

    const res = await axios.get(`${host}/get`, {

        params: { targetCurrency: targetCurrency }
    });

    return res.data;
}