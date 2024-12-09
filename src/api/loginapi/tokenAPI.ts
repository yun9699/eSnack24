import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}/login`

export const refreshRequest = async (accessToken: string, refreshToken: string) => {

    await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers: {'Authorization': `Bearer ${accessToken}`}
    })
}