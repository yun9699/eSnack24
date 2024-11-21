import {ref} from "vue";
import type {Ref} from "vue";
import {photoAPI} from "../../api/photoAPI/photoAPI.ts";

export function useImageProcessor() {
    const base64Image: Ref<string> = ref("");
    const similarImages: Ref<Record<string, any>> = ref({});

    const takePhoto = (): void => {
        const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;
        const imageUrl = canvasElement.toDataURL("image/jpg");
        base64Image.value = imageUrl.split(",")[1];
    };

    const sendServer = async (): Promise<void> => {
        if (!base64Image.value) {
            console.error("No image to send.");
            return;
        }

        try {
            const response = await photoAPI(base64Image.value);
            console.log("Response from server:", response);

            if (response.similarImages) {
                similarImages.value = response.similarImages || {};
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
