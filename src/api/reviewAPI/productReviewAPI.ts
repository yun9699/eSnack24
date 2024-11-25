import axios from 'axios'

const host = 'http://localhost:8080/api/v1/review'

export const getReviewList = async (page: number = 1, size: number = 10, pno?: number) => {
    try {
        const res = await axios.get(`${host}/list`, {
            params: { pno, page, size },
        });
        console.log("API 응답 데이터:", res.data);
        return res.data;
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        throw error;
    }
};
