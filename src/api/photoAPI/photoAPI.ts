import axios from "axios";

const host = `${import.meta.env.VITE_API_HOST}`;

export async function photoAPI(base64Image: string): Promise<any> {
    try {
        const response = await axios.post(`${host}/saveState`, {
            image: base64Image,
        });
        return response.data;
    } catch (error) {
        console.error("Error saving image to server:", error);
        throw error;
    }
}
