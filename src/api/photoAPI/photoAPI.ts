import axios from "axios";

export async function photoAPI(base64Image: string): Promise<any> {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/saveState", {
            image: base64Image,
        });
        return response.data;
    } catch (error) {
        console.error("Error saving image to server:", error);
        throw error;
    }
}
