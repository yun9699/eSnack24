import axios from "axios";

const host = 'http://localhost:8080/api/v1/login'

export const refreshRequest = async (accessToken, refreshToken) => {

    await axios.get(`${host}/refresh?refreshToken=${refreshToken}`, {
        headers: {'Authorization': `Bearer ${accessToken}`}
    })
}