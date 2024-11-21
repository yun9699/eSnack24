import axios from "axios";

const host = `http://localhost:8080/api/v1/product`



export const getmainList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/main?page=${page}&size=${size}`)


    return res.data

}

export const getList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    console.log(res.data);


    return res.data

}

export const getDetail = async (pno: number) => {

    const res = await axios.get(`${host}/detail/${pno}`)

    return res.data

}


