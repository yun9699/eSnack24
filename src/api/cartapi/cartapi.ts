import useUserStore from "../../stores/useUserStore.ts";
import axios from "axios";

const host = 'http://localhost:8080/api/v1/cart';

const user = useUserStore();

export const getCartList = async () => {

    console.log("uno");
    console.log(user.getUno);

    const res = await axios.get(`${host}/list/${user.getUno}?page=1&size=10`)

    return res.data;
}

export const addCartProduct = async (pno,ciqty) => {

    console.log("addCart");
    console.log(user.getUno);

    const res = await axios.post(`${host}/add/${user.getUno}`,{pno,ciqty})
    console.log(res.data);

    return res.data

}
//http://localhost:8080/api/v1/cart/add/2
