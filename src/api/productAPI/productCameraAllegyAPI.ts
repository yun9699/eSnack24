import axios from "axios";
import { IProduct } from "../../types/productTypes.ts";

const host = `${import.meta.env.VITE_API_HOST}/allergy`;

export const fetchAllergyInfo = async (
    filename: string
): Promise<{ allergyTitles: Record<string, string[]>; pno: number; product: IProduct }> => {
    try {
        const response = await axios.get(`${host}/detail`, {
            params: { pfilename: filename },
        });

        const allergyTitles = {
            ko: Array.isArray(response.data.atitle_ko) ? response.data.atitle_ko : [response.data.atitle_ko || ""],
            en: Array.isArray(response.data.atitle_en) ? response.data.atitle_en : [response.data.atitle_en || ""],
            ja: Array.isArray(response.data.atitle_ja) ? response.data.atitle_ja : [response.data.atitle_ja || ""],
            zh: Array.isArray(response.data.atitle_zh) ? response.data.atitle_zh : [response.data.atitle_zh || ""],
        };

        const product = {
            ptitle_ko: response.data.ptitle_ko || "",
            ptitle_en: response.data.ptitle_en || null,
            ptitle_ja: response.data.ptitle_ja || null,
            ptitle_zh: response.data.ptitle_zh || null,
            price: response.data.price || 0,
            pfilename: filename,
        };

        return {
            allergyTitles,
            pno: response.data.pno || 0,
            product,
        };
    } catch (error) {
        console.error(`Failed to fetch allergy info for ${filename}:`, error);
        return {
            allergyTitles: { ko: [], en: [], ja: [], zh: [] },
            pno: 0,
            product: {
                ptitle_ko: "",
                ptitle_en: null,
                ptitle_ja: null,
                ptitle_zh: null,
                price: 0,
                pfilename: filename,
            },
        };
    }
};


