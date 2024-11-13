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
    <div v-if="base64Image">
      <h3>Base64 Encoded Image:</h3>
      <textarea v-model="base64Image" rows="6" cols="80" readonly></textarea>
    </div>
  </div>
  <div>
    <h2>유사 이미지 검색 결과</h2>
    <p v-if="Object.keys(similarImages).length === 0">검색 결과가 없습니다.</p>
    <ul v-if="Object.keys(similarImages).length > 0">
      <li v-for="(imagesArray, filename) in similarImages" :key="filename">
        <h3>{{ filename }}의 유사 이미지</h3>
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
}

video,
canvas {
  display: block;
  margin: 0 auto;
}

button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

textarea {
  width: 100%;
  margin: 10px 0;
}

a {
  display: none;
}
</style>
