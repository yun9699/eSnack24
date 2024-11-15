import axios from "axios";

const host = `http://localhost:8080/api/v1/faq`;

// FAQ 목록 조회
export const getFAQList = async (page: number = 1, size: number = 10, fcategory?: string) => {
    const res = await axios.get(`${host}/list/${fcategory}?page=${page}&size=${size}`);
    console.log(res.data);
    return res.data;
};

// FAQ 상세 조회
export const getFAQOne = async (fno: number) => {
    const res = await axios.get(`${host}/${fno}`);
    console.log(res.data);
    return res.data;
};