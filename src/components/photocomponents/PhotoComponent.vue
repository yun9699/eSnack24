<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCamera } from "../../hooks/camerahooks/useCamera.ts";
import { useImageProcessor } from "../../hooks/camerahooks/useImageProcessor.ts";
import { useAllergyWarning } from "../../hooks/camerahooks/useAllergyWarning.ts";
import Modal from "../modalcomponents/Modal.vue";
import useUser from "../../stores/useUser";
import { fetchAllergyInfo } from "../../api/product/productCameraAllegyAPI.ts";

// 카메라 및 사진 처리 관련 Hooks
const { isToggled, toggle, switchCamera } = useCamera();
const { similarImages, photosend } = useImageProcessor();

// 사용자 정보
const userStore = useUser();
const uno = userStore.getUno;

// 라우터
const router = useRouter();

// 알러지 경고 관련 Hooks
const {
  allergyInfo,
  imageWarnings,
  isAllergyModalVisible,
  currentAllergyInfo,
  currentWarning,
  loadAllergyInfo,
  checkAllergyWarnings,
  showAllergyModal,
  imageNames,
} = useAllergyWarning(uno);

// 모달 상태
const isModalVisible = ref(false);

// 사진 촬영 후 결과 표시
const takePhotoAndShowResult = async () => {
  await photosend();
  isModalVisible.value = true;
};

// 이미지 클릭 시 동작
const handleImageClick = async (image: string) => {
  const { pno } = await fetchAllergyInfo(image);
  if (pno) {
    await router.push({ path: `/product/list/${pno}` });
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-6 bg-gray-50 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">카메라</h1>

    <video
        ref="videoElement"
        width="640"
        height="480"
        autoplay
        class="block mx-auto border border-gray-300 rounded-lg shadow-md"
    ></video>
    <canvas
        ref="canvasElement"
        width="640"
        height="480"
        class="hidden"
    ></canvas>

    <div class="flex justify-center gap-4 mt-6">
      <button
          @click="toggle"
          class="px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow hover:bg-blue-700 transition"
      >
        {{ isToggled ? "카메라 끄기" : "카메라 켜기" }}
      </button>
      <button
          @click="switchCamera"
          class="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg shadow hover:bg-green-700 transition"
      >
        카메라 전환
      </button>
      <button
          v-if="isToggled"
          @click="takePhotoAndShowResult"
          class="px-6 py-3 bg-purple-600 text-white text-lg font-bold rounded-lg shadow hover:bg-purple-700 transition"
      >
        사진 찍기
      </button>
    </div>

    <modal
        :visible="isModalVisible"
        @update:visible="isModalVisible = $event"
        class="mt-8"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-4">유사 상품 검색 결과</h2>
      <p v-if="Object.keys(similarImages).length === 0" class="text-gray-500">
        검색 결과가 없습니다.
      </p>
      <ul
          v-if="Object.keys(similarImages).length > 0"
          class="flex flex-wrap justify-center gap-6"
      >
        <li
            v-for="(imagesArray, filename) in similarImages"
            :key="filename"
            class="space-y-4"
        >
          <ul>
            <li
                v-for="(imageGroup, groupIndex) in imagesArray"
                :key="groupIndex"
                class="space-y-4"
            >
              <ul>
                <li
                    v-for="(image, imageIndex) in imageGroup"
                    :key="imageIndex"
                    class="text-center space-y-2"
                >
                  <img
                      :src="`http://127.0.0.1:9000/static/${image}`"
                      :alt="image"
                      class="w-48 h-auto rounded-lg border border-gray-300 shadow hover:scale-105 transition transform"
                      @load="loadAllergyInfo(image)"
                      @click="handleImageClick(image)"
                  />
                  <p class="text-gray-600">{{ imageNames[image] }}</p>
                  <p
                      @click="showAllergyModal(image)"
                      class="cursor-pointer text-lg"
                      :class="{
                      'text-red-600 font-bold': allergyInfo[image],
                      'text-green-500': !allergyInfo[image],
                    }"
                  >
                    {{ allergyInfo[image] ? "알러지 정보 보기" : "알러지 정보 없음" }}
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </modal>

    <modal
        :visible="isAllergyModalVisible"
        @update:visible="isAllergyModalVisible = $event"
        class="mt-8"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-4">알러지 상세 정보</h2>
      <p v-if="currentAllergyInfo" class="text-gray-600">
        <span
            v-for="(info, index) in currentAllergyInfo.split(',')"
            :key="index"
            class="block"
        >
          {{ info }}
        </span>
      </p>
      <p
          v-if="currentWarning"
          class="text-red-600 font-bold mt-4 text-center"
      >
        {{ currentWarning }}
      </p>
    </modal>
  </div>
</template>
