import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/fcm`;

// FAQ 목록 조회
export const getToken = async () => {
    const res = await axios.get(`${host}/gettoken`);
    console.log(res.data);
    return res.data;
};
