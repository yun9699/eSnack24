import axios from "axios";

const host = `https://esnack24.store/api/v1/fcm`;

// FAQ 목록 조회
export const getToken = async () => {
    const res = await axios.get(`${host}/gettoken`);
    console.log(res.data);
    return res.data;
};
