import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/fcm`;

// FAQ 목록 조회
export const getToken = async () => {
    console.log("----------token1")
    const res = await axios.get(`${host}/gettoken`);
    console.log("----------token2")
    console.log(res.data);
    return res.data;
};
