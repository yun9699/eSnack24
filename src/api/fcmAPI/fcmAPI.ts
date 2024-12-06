import axios from "axios";

const host = `http://localhost:8080/admin/api/v1/fcm`;

// FAQ 목록 조회
export const getToken = async () => {
    const res = await axios.get(`${host}/gettoken`);
    console.log(res.data);
    return res.data;
};
