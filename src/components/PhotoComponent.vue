<script lang="ts">
import { defineComponent } from "vue";
import { useCamera } from "../hooks/useCamera.ts"
import { useImageProcessor } from "../hooks/useImageProcessor.ts";

export default defineComponent({
  setup() {
    const { isToggled, toggle, switchCamera } = useCamera();
    const { base64Image, similarImages, photosend } = useImageProcessor();

    return {
      isToggled,
      base64Image,
      similarImages,
      toggle,
      switchCamera,
      photosend,
    };
  },
});
</script>

<template>
  <div>
    <h1>Camera Feed on Canvas</h1>
    <video ref="videoElement" width="640" height="480" autoplay></video>
    <canvas ref="canvasElement" width="640" height="480"></canvas>
    <button @click="toggle">{{ isToggled ? 'Stop Camera' : 'Start Camera' }}</button>
    <button @click="switchCamera">Switch Camera</button>
    <button @click="photosend" v-if="isToggled">Photo And Send</button>
  </div>
  <div>
    <h2>유사 상품 검색 결과</h2>
    <p v-if="Object.keys(similarImages).length === 0">검색 결과가 없습니다.</p>
    <ul v-if="Object.keys(similarImages).length > 0">
      <li v-for="(imagesArray, filename) in similarImages" :key="filename">
        <h3>{{ filename }}의 유사 상품</h3>
        <ul>
          <li v-for="(imageGroup, groupIndex) in imagesArray" :key="groupIndex">
            <ul>
              <li v-for="(image, imageIndex) in imageGroup" :key="imageIndex">
                <img :src="`http://127.0.0.1:9000/static/${image}`" :alt="image" width="200"/>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>



<style scoped>
h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

video,
canvas {
  display: block;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%; /* 부모 요소의 전체 너비 사용 */
  position: absolute; /* 화면에 대해 절대 위치 */
  top: 50%; /* 화면의 세로 중앙 */
  left: 50%; /* 화면의 가로 중앙 */
  transform: translate(-50%, -50%); /* 부모 요소를 정확히 중앙으로 */
}

button {
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button:active {
  background-color: #00408b;
}

button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-top: 30px;
  color: #444;
}

ul {
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

li {
  text-align: center;
  margin-bottom: 20px;
}

img {
  border-radius: 8px;
  border: 2px solid #ddd;
  max-width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}

p {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

textarea {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
}

a {
  display: none;
}
</style>



