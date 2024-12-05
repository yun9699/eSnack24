import axios from "axios";

const host = 'https://esnack24.store/api/v1/allergy'

export const getAllergyListKo = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data;
}