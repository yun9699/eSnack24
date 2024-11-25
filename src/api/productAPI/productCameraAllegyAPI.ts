import axios from "axios";

// 알러지 정보를 가져오는 함수
export const fetchAllergyInfo = async (filename: string): Promise<string[]> => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/allergy/detail`, {
            params: { pfilename: filename },
        });
        const allergyTitles = response.data.atitle_ko;
        return Array.isArray(allergyTitles)
            ? allergyTitles
            : [allergyTitles || "알러지 정보 없음"];
    } catch (error) {
        console.error(`Failed to fetch allergy info for ${filename}:`, error);
        return ["정보 없음"];
    }
};

