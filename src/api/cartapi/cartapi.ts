import useUser from "../../stores/useUser.ts";
import axios from "axios";

const host = 'http://localhost:8080/api/v1/cart';

const user = useUser();

export const getCartList = async () => {

    console.log("uno");
    console.log(user.getUno);

    const res = await axios.get(`${host}/list/13?page=1&size=10`)

    console.log(res.data.list);

    return res.data.list;
}