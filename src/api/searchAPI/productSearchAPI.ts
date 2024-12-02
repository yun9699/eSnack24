import axios from "axios";


const host = `https://esnack24.store/api/v1/search`



export const searchProducts = async (title:String) => {

    const res = await axios.get(`${host}/product?param=${title}`)

    console.log(res.data)

    return res.data

}