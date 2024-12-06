import axios from 'axios'

const host = `${import.meta.env.VITE_API_HOST}/review`;

export const getUserReviewList = async (page: number = 1, size: number = 10, uno?: number) => {
    try {
        const res = await axios.get(`${host}/user`, {
            params: { uno, page, size },
        });
        console.log("API 응답 데이터:", res.data);
        return res.data;
    } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        throw error;
    }
};
