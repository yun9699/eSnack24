import axios from 'axios'
import {ReviewDetail, ReviewRegister} from "../../types/reviewTypes.ts";

const host = 'http://3.34.191.185:8080/api/v1/review'

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

// 이미지 업로드
export const uploadImageAPI = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${host}/upload-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.url;
    } catch (error) {
        console.error("이미지 업로드 실패:", error);
        throw new Error("이미지 업로드 중 오류가 발생했습니다.");
    }
};

// 리뷰 등록
export const submitReviewAPI = async (review: ReviewRegister): Promise<void> => {
    try {
        await axios.post(`${host}/add`, review);
    } catch (error) {
        console.error("리뷰 등록 실패:", error);
        throw new Error("리뷰 등록 중 오류가 발생했습니다.");
    }
};

export const fetchReviewDetailAPI = async (rno: number): Promise<ReviewDetail> => {
    try {
        const response = await axios.get(`${host}/detail/${rno}`);
        return response.data;
    } catch (error) {
        console.error("리뷰 상세 정보를 가져오는 중 오류 발생:", error);
        throw new Error("리뷰 상세 정보를 가져오는 중 문제가 발생했습니다.");
    }
};

// 리뷰 수정
export const editReviewAPI = async (rno: number, editData: Partial<ReviewDetail>): Promise<ReviewDetail> => {
    try {
        const response = await axios.post(`${host}/edit/${rno}`, editData);
        return response.data;
    } catch (error) {
        console.error("리뷰 수정 실패:", error);
        throw new Error("리뷰 수정 중 오류가 발생했습니다.");
    }
};

// 리뷰 삭제
export const deleteReviewAPI = async (rno: number): Promise<void> => {
    try {
        await axios.post(`${host}/delete/${rno}`);
    } catch (error) {
        console.error("리뷰 삭제 실패:", error);
        throw new Error("리뷰 삭제 중 오류가 발생했습니다.");
    }
};
