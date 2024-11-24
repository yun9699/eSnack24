import { ref, onBeforeUnmount } from "vue";

export function useCamera() {
    const videoStream = ref<MediaStream | null>(null);
    const isToggled = ref(false);
    const currentDevice = ref<"environment" | "user">("environment");

    const getVideoElement = (): HTMLVideoElement => {
        return document.querySelector("video") as HTMLVideoElement;
    };

    const getCanvasElement = (): HTMLCanvasElement => {
        return document.querySelector("canvas") as HTMLCanvasElement;
    };

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentDevice.value },
        });
        videoStream.value = stream;
        const videoElement = getVideoElement();
        videoElement.srcObject = stream;
        videoElement.onplaying = drawToCanvas;
    };

    const stopCamera = () => {
        if (videoStream.value) {
            videoStream.value.getTracks().forEach((track) => track.stop());
            getVideoElement().srcObject = null;
        }
    };

    const drawToCanvas = () => {
        const videoElement = getVideoElement();
        const canvasElement = getCanvasElement();
        const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;

        const render = () => {
            ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            requestAnimationFrame(render);
        };

        render();
    };

    const switchCamera = () => {
        currentDevice.value = currentDevice.value === "environment" ? "user" : "environment";
        if (isToggled.value) {
            stopCamera();
            startCamera();
        }
    };

    const toggle = () => {
        if (isToggled.value) {
            stopCamera();
        } else {
            startCamera();
        }
        isToggled.value = !isToggled.value;
    };

    onBeforeUnmount(() => {
        stopCamera();
    });

    return {
        isToggled,
        currentDevice,
        toggle,
        switchCamera,
    };
}
