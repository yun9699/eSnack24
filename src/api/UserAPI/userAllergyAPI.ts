import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";

const user = useUserStore();

const host = `${import.meta.env.VITE_API_HOST}/user`;

export const compareUserAllergies = async (
    uno: number,
    imageAllergies: Record<string, string[]>, // 다국어 알러지 데이터
    language: string // 현재 언어 정보
) => {
    try {
        // 현재 언어의 알러지 데이터 선택
        const allergiesToCompare = imageAllergies[language] || imageAllergies.ko;

        if (!Array.isArray(allergiesToCompare) || allergiesToCompare.length === 0) {
            console.warn(`No allergies found for language: ${language}`);
            return [];
        }

        console.log(`Sending allergies for language ${language}:`, allergiesToCompare);

        // 서버에 알러지 정보를 전송
        const response = await axios.post(`${host}/compare-allergies/${uno}`, allergiesToCompare);
        return response.data;
    } catch (error) {
        console.error(`Failed to compare allergies for user ${uno}:`, error);
        return [];
    }
};




export const editUserAllergies = async (anos: number[]) => {

    const personalAllergy = { anos };

    user.setPersonalAllergies(anos);

    const res = await axios.post(`${host}/editAllergies/${user.getUno}`, personalAllergy);

    return res.data;
}
