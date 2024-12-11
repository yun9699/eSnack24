import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";
import {IProduct} from "../../types/productTypes.ts";

const host = `${import.meta.env.VITE_API_HOST}/product`;

const uno = useUserStore().getUno;


export const getmainList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/main?page=${page}&size=${size}`)


    return res.data

}

export const getList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    console.log(res.data);


    return res.data

}

export const getFilterList = async (page: number) => {

    const pageValue = (Number)(page || 1)

    const res = await axios.get(`${host}/list/filter?uno=${uno}&page=${pageValue}`)

    return res.data
}

export const getDetail = async (pno: number) => {

    const res = await axios.get(`${host}/detail/${pno}`)

    return res.data

}

//상품 리뷰 등록에서 상품명 불러오기
export const fetchProductTitleAPI = async (pno: number): Promise<IProduct> => {
    try {
        const response = await axios.get(`${host}/detail/${pno}`);
        console.log("API 응답:", response.data); // 이 부분을 확인
        return response.data;
    } catch (error) {
        console.error("상품명 불러오기 실패:", error);
        throw new Error("상품 정보를 불러오는 중 오류가 발생했습니다.");
    }
};





