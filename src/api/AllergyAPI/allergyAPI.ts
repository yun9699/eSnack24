import axios from "axios";

const host = 'http://3.34.191.185:8080/api/v1/allergy'

export const getAllergyListKo = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data;
}