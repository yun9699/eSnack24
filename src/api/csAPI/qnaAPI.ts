import axios from "axios";

const host = `https://esnack24.store/api/v1/qna`;

// QNA 목록 조회
export const getQNAList = async (uno: number, page: number = 1, size: number = 10) => {
    const res = await axios.get(`${host}/list?uno=${uno}&page=${page}&size=${size}`);
    console.log(res.data);
    return res.data;
};

// QNA 상세 조회
export const getQNAOne = async (qno: number) => {
    const res = await axios.get(`${host}/detail/${qno}`);
    console.log(res.data);
    return res.data;
};

// QNA 등록
export const registerQNA = async (qnaData: any) => {
    const res = await axios.post(`${host}/add`, qnaData);
    console.log(res.data);
    return res.data;
};

// QNA 수정
export const updateQNA = async (qno: number, qnaData: any) => {
    const res = await axios.put(`${host}/edit/${qno}`, qnaData);
    console.log(res.data);
    return res.data;
};

// QNA 삭제
export const deleteQNA = async (qno: number) => {
    const res = await axios.delete(`${host}/delete/${qno}`);
    return res.data;
};