<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCamera } from "../../hooks/camerahooks/useCamera.ts";
import { useImageProcessor } from "../../hooks/camerahooks/useImageProcessor.ts";
import { useAllergyWarning } from "../../hooks/camerahooks/useAllergyWarning.ts";
import Modal from "../modalcomponents/Modal.vue";
import useUser from "../../stores/useUser";
import { fetchAllergyInfo } from "../../api/product/productCameraAllegyAPI.ts";

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const { isToggled, toggle, switchCamera } = useCamera();
    const { similarImages, photosend } = useImageProcessor();


    const userStore = useUser();
    const uno = userStore.getUno;

    const router = useRouter();

    const {
      allergyInfo,
      imageWarnings,
      isAllergyModalVisible,
      currentAllergyInfo,
      currentWarning,
      loadAllergyInfo,
      checkAllergyWarnings,
      showAllergyModal,
      imageNames
    } = useAllergyWarning(uno);

    const isModalVisible = ref(false);

    const takePhotoAndShowResult = async () => {
      await photosend();
      isModalVisible.value = true;
    };

    const handleImageClick = async (image: string) => {
      const { pno } = await fetchAllergyInfo(image);
      if (pno) {
        await router.push({path: `/product/list/${pno}`});
      }
    };

    return {
      isToggled,
      toggle,
      switchCamera,
      similarImages,
      takePhotoAndShowResult,
      isModalVisible,
      allergyInfo,
      imageWarnings,
      isAllergyModalVisible,
      currentAllergyInfo,
      currentWarning,
      loadAllergyInfo,
      checkAllergyWarnings,
      showAllergyModal,
      handleImageClick,
      imageNames,
    };
  },
});
</script>

<template>
  <div>
    <h1>카메라</h1>
    <video ref="videoElement" width="640" height="480" autoplay></video>
    <canvas ref="canvasElement" width="640" height="480" class="hidden"></canvas>
    <button @click="toggle">{{ isToggled ? '카메라 끄기' : '카메라 켜기' }}</button>
    <button @click="switchCamera">카메라 전환</button>
    <button @click="takePhotoAndShowResult" v-if="isToggled">사진 찍기</button>
  </div>

  <modal :visible="isModalVisible" @update:visible="isModalVisible = $event">
    <h2>유사 상품 검색 결과</h2>
    <p v-if="Object.keys(similarImages).length === 0">검색 결과가 없습니다.</p>
    <ul v-if="Object.keys(similarImages).length > 0">
      <li v-for="(imagesArray, filename) in similarImages" :key="filename">
        <ul>
          <li v-for="(imageGroup, groupIndex) in imagesArray" :key="groupIndex">
            <ul>
              <li v-for="(image, imageIndex) in imageGroup" :key="imageIndex">
                <img
                    :src="`http://127.0.0.1:9000/static/${image}`"
                    :alt="image"
                    width="200"
                    @load="loadAllergyInfo(image)"
                    @click="handleImageClick(image)"
                />
                <p>{{ imageNames[image] }}</p>
                <p
                    @click="showAllergyModal(image)"
                    style="cursor: pointer; color: yellowgreen;"
                    :style="{ color: allergyInfo[image] ? 'red' : 'yellowgreen' }"
                >
                  {{ allergyInfo[image] ? '알러지 정보 보기' : '알러지 정보 없음' }}
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </modal>
  <!-- 알러지 상세 정보 모달 -->
  <modal :visible="isAllergyModalVisible" @update:visible="isAllergyModalVisible = $event">
    <h2>알러지 상세 정보</h2>
    <p v-if="currentAllergyInfo">
      <span v-for="(info, index) in currentAllergyInfo.split(',')" :key="index">
        {{ info }}<br>
      </span>
    </p>
    <p v-if="currentWarning" style="color: red; font-weight: bold;">
      {{ currentWarning }}
    </p>
    <p v-else></p>
  </modal>
</template>





<style scoped>
.hidden {
  display: none;
}

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
  word-wrap: break-word;
  white-space: normal; /* 줄 바꿈 허용 */
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
