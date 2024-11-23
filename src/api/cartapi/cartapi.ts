import useUserStore from "../../stores/useUserStore.ts";
import axios from "axios";

const host = 'http://localhost:8080/api/v1/cart';

const user = useUserStore();

export const getCartList = async () => {

    console.log("uno");
    console.log(user.getUno);

    const res = await axios.get(`${host}/list/${user.getUno}?page=1&size=10`)

    return res.data.list;
}

export const addCart = async () => {

    console.log("addCart");

    const res = await axios.post(`${host}/add/${user.getUno}`)

    return res.data

}
