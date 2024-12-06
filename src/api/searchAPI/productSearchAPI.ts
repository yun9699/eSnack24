import axios from "axios";


const host = `${import.meta.env.VITE_API_HOST}/search`;


export const searchProducts = async (title:String) => {

    const res = await axios.get(`${host}/product?param=${title}`)

    console.log(res.data)

    return res.data

}