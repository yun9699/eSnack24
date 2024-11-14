import axios from "axios";

const host = `http://localhost:8080/api/v1/product/`

export const getList = async ( page:number = 1, size:number = 10) => {

    const res = await jwtAxios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data
}