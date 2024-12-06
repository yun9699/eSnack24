import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/allergy`;

export const getAllergyListKo = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data;
}