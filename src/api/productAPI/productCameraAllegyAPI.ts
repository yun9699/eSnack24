import axios from "axios";

const host = "http://3.34.191.185:8080/api/v1/allergy"

export const fetchAllergyInfo = async (filename: string): Promise<{ allergyTitles: string[], pno: number, ptitle_ko: string }> => {
    try {
        const response = await axios.get(`${host}/detail`, {
            params: { pfilename: filename },
        });
        const allergyTitles = response.data.atitle_ko;
        const pno = response.data.pno;
        const ptitle_ko = response.data.ptitle_ko;
        return {
            allergyTitles: Array.isArray(allergyTitles) ? allergyTitles : [allergyTitles || "알러지 정보 없음"],
            pno: pno,
            ptitle_ko: ptitle_ko
        };
    } catch (error) {
        console.error(`Failed to fetch allergy info for ${filename}:`, error);
        return { allergyTitles: ["정보 없음"], pno: "" , ptitle_ko: ""};
    }
};

