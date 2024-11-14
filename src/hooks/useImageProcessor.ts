import { ref } from "vue";
import axios from "axios";
import type { Ref } from "vue";

export function useImageProcessor() {
    const base64Image: Ref<string> = ref("");
    const similarImages: Ref<Record<string, any>> = ref({});

    const takePhoto = (): void => {
        const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;
        const imageUrl = canvasElement.toDataURL("image/webp");
        base64Image.value = imageUrl.split(",")[1];
    };

    const sendServer = async (): Promise<void> => {
        if (!base64Image.value) {
            console.error("No image to send.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/saveState", {
                image: base64Image.value,
            });
            console.log("Response from server:", response.data);

            if (response.data.similarImages) {
                similarImages.value = response.data.similarImages || {};
            }
        } catch (err) {
            console.error("Server request failed:", err);
        }
    };

    const photosend = async (): Promise<void> => {
        takePhoto();
        await sendServer();
    };

    return {
        base64Image,
        similarImages,
        photosend,
    };
}
