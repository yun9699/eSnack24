import axios from 'axios';


const rest_api_key = 'bbeea25e17d51b641cf643b1703c569b'

const redirect_uri = 'http://localhost:5173/login/kakaore'

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = 'https://kauth.kakao.com/oauth/token'

const host = `http://localhost:8080/api/v1/login/kakao`

export const getKakaoMemberWithAccessToken = async (accessToken:string)  => {

    const res = await axios.get(`${host}?accessToken=${accessToken}`)

    return res.data


}

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL
}

export const getKakaoAccessToken = async (authCode:string) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code:authCode
    }
    const res = await axios.post(access_token_url, params , header)
    const accessToken = res.data.access_token

    return accessToken
}


