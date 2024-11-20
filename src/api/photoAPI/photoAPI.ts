import axios from "axios";

export async function photoAPI(base64Image: string): Promise<any> {
    try {
        const response = await axios.post("https://3dc9-58-235-119-39.ngrok-free.app/api/v1/saveState", {
            image: base64Image,
        });
        return response.data;
    } catch (error) {
        console.error("Error saving image to server:", error);
        throw error;
    }
}
