import axios from "axios";

const host = 'http://localhost:8080/api/v1/allergy'

export const getAllergyListKo = async () => {

    const res = await axios.get(`${host}/list/ko`)

    return res.data;
}