import useUserStore from "../../stores/useUserStore.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = `${import.meta.env.VITE_API_HOST}/cart`;

const user = useUserStore();

const uno = user.getUno;

export const getCartList = async (page: number) => {

    const pageNum: number = page || 1;

    console.log("uno");
    console.log(user.getUno);

    const res = await jwtAxios.get(`${host}/list/${uno}?page=${pageNum}`)

    return res.data;
}

export const addCartProduct = async (pno: number,ciqty: number) => {

    console.log(user.getUno);

    const res = await jwtAxios.post(`${host}/add/${uno}`,{pno,ciqty})
    console.log(res.data);

    return res.data
}

export const deleteCartItem = async (cino: number) => {

    const res = await jwtAxios.delete(`${host}/deleteItem/${cino}`)

    return res.data
}

export const incCartItem = async (cino: number) => {

    const res = await jwtAxios.put(`${host}/incqty/${cino}`)

    return res.data
}

export const decCartItem = async (cino: number) => {

    const res = await jwtAxios.put(`${host}/decqty/${cino}`)

    return res.data
}

export const clearCart = async () => {

    const res = await jwtAxios.delete(`${host}/clearItem/${uno}`);

    return res.data
}