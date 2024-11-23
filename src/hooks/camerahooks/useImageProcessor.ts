import { ref } from "vue";
import { photoAPI } from "../../api/photoAPI/photoAPI.ts";

export function useImageProcessor() {
    const base64Image = ref<string>("");
    const similarImages = ref<Record<string, any>>({});

    const getCanvasElement = (): HTMLCanvasElement => {
        return document.querySelector("canvas") as HTMLCanvasElement;
    };

    const takePhoto = () => {
        const canvasElement = getCanvasElement();
        base64Image.value = canvasElement.toDataURL("image/jpg").split(",")[1];
    };

    const sendServer = async () => {
        if (!base64Image.value) {
            console.error("No image to send.");
            return;
        }

        try {
            const response = await photoAPI(base64Image.value);
            if (response.similarImages) {
                similarImages.value = response.similarImages;
            }
        } catch (err) {
            console.error("Server request failed:", err);
        }
    };

    const photosend = async () => {
        takePhoto();
        await sendServer();
    };

    return {
        base64Image,
        similarImages,
        photosend,
    };
}
