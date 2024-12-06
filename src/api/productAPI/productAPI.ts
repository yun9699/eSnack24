import axios from "axios";

const host = `http://localhost:8080/api/v1/product`


export const getmainList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/main?page=${page}&size=${size}`)


    return res.data

}

export const getList = async ( page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    console.log(res.data);

    console.log(import.meta.env)
    console.log(import.meta.env.VITE_API_HOST)


    return res.data

}

export const getFilterList = async ( uno:number = 0, page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list/filter?uno=${uno}&page=${page}&size=${size}`)

    return res.data
}

export const getDetail = async (pno: number) => {

    const res = await axios.get(`${host}/detail/${pno}`)

    return res.data

}

//상품 리뷰 등록에서 상품명 불러오기
export const fetchProductTitleAPI = async (pno: number): Promise<string> => {
    try {
        const response = await axios.get(`${host}/detail/${pno}`);
        return response.data.ptitle_ko;
    } catch (error) {
        console.error("상품명 불러오기 실패:", error);
        throw new Error("상품 정보를 불러오는 중 오류가 발생했습니다.");
    }
}


