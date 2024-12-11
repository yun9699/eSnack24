import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/swiper`;

export const getMainPageSwiper = async () => {

    const res = await axios.get(`${host}/main`);

    return res.data
}

export const getListPageSwiper = async () => {

    const res = await axios.get(`${host}/list`);

    return res.data;
}