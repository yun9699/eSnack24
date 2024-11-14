import {ref, onBeforeUnmount} from "vue";
import type {Ref} from "vue";

export function useCamera() {
    const videoStream: Ref<MediaStream | null> = ref(null);
    const isToggled = ref(false);
    const currentDevice = ref<"environment" | "user">("environment");

    const startCamera = async (): Promise<void> => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentDevice.value },
        });
        videoStream.value = stream;
        const videoElement = document.querySelector("video") as HTMLVideoElement;
        videoElement.srcObject = stream;
        videoElement.onplaying = drawToCanvas;
    };

    const stopCamera = (): void => {
        if (videoStream.value) {
            const tracks = videoStream.value.getTracks();
            tracks.forEach((track) => track.stop());
            const videoElement = document.querySelector("video") as HTMLVideoElement;
            videoElement.srcObject = null;
        }
    };

    const drawToCanvas = (): void => {
        const videoElement = document.querySelector("video") as HTMLVideoElement;
        const canvasElement = document.querySelector("canvas") as HTMLCanvasElement;
        const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;

        const render = () => {
            ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            requestAnimationFrame(render);
        };

        render();
    };

    const switchCamera = (): void => {
        currentDevice.value = currentDevice.value === "environment" ? "user" : "environment";
        if (isToggled.value) {
            stopCamera();
            startCamera();
        }
    };

    const toggle = (): void => {
        if (isToggled.value) {
            stopCamera();
        } else {
            startCamera();
        }
        isToggled.value = !isToggled.value;
    };

    onBeforeUnmount(() => {
        if (videoStream.value) {
            const tracks = videoStream.value.getTracks();
            tracks.forEach((track) => track.stop());
        }
    });

    return {
        isToggled,
        currentDevice,
        toggle,
        switchCamera,
    };
}
