<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCamera } from "../../hooks/camerahooks/useCamera.ts";
import { useImageProcessor } from "../../hooks/camerahooks/useImageProcessor.ts";
import { useAllergyWarning } from "../../hooks/camerahooks/useAllergyWarning.ts";
import Modal from "../modalcomponents/Modal.vue";
import useUserStore from "../../stores/useUserStore.ts";
import { fetchAllergyInfo } from "../../api/productAPI/productCameraAllegyAPI.ts";
import {useI18n} from "vue-i18n";
import {Icon} from "@iconify/vue";

const { t } = useI18n();

const { isToggled, toggle, switchCamera } = useCamera();
const { similarImages, photosend } = useImageProcessor();

const userStore = useUserStore();
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
  imageNames,
} = useAllergyWarning(uno);


const isModalVisible = ref(false);


const takePhotoAndShowResult = async () => {
  await photosend();
  isModalVisible.value = true;
};


const handleImageClick = async (image: string) => {
  const { pno } = await fetchAllergyInfo(image);
  if (pno) {
    await router.push({ path: `/product/list/${pno}` });
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-6 bg-gray-50 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">{{ t('photo.cameraHeader') }}</h1>

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

    <div class="relative z-10">
    <div class="flex justify-center gap-4 mt-6">
      <button
          @click="toggle"
          class="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        {{ isToggled ? t('photo.toggleButton.on') : t('photo.toggleButton.off') }}
      </button>

      <button
          v-if="isToggled"
          @click="takePhotoAndShowResult"
          class="px-6 py-3 bg-white text-yellow-500 border border-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition flex items-center justify-center space-x-2"
      >
        <Icon icon="mdi:camera" class="text-2xl" />
      </button>

      <button
          @click="switchCamera"
          class="px-6 py-3 bg-yellow-700 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        {{ t('photo.switchCameraButton') }}
      </button>
    </div>
    </div>


    <modal
        :visible="isModalVisible"
        @update:visible="isModalVisible = $event"
        class="fixed inset-0 z-40 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
          {{ t('photo.modal.title') }}
        </h2>

        <p v-if="Object.keys(similarImages).length === 0" class="text-center text-gray-500">
          {{ t('photo.modal.noResults') }}
        </p>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <!-- 이미지 카드 -->
          <div
              v-for="(imagesArray, filename) in similarImages"
              :key="filename"
              class="bg-gray-50 border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div v-for="(imageGroup, groupIndex) in imagesArray" :key="groupIndex">
              <div
                  v-for="(image, imageIndex) in imageGroup"
                  :key="imageIndex"
                  class="text-center p-4"
              >
                <!-- 이미지 -->
                <img
                    :src="`https://esnack24.store/fastapi/static/${image}`"
                    :alt="image"
                    class="w-full h-40 object-cover rounded-t-lg"
                    @load="loadAllergyInfo(image)"
                    @click="handleImageClick(image)"
                />

                <!-- 상품 이름 -->
                <p class="text-gray-800 font-semibold mt-2">
                  {{ imageNames[image] || image }}
                </p>

                <!-- 알러지 정보 문구 -->
                <p
                    class="text-sm font-semibold"
                    :class="{
        'text-red-600': Array.isArray(imageWarnings[image]) && imageWarnings[image].length > 0, // 경고가 있을 때 빨간색
        'text-green-500': Array.isArray(imageWarnings[image]) && imageWarnings[image].length === 0 && allergyInfo[image], // 알러지 정보가 있는 경우 초록색
        'text-gray-500': !allergyInfo[image] && (!Array.isArray(imageWarnings[image]) || imageWarnings[image].length === 0) // 알러지 정보가 없는 경우 회색
    }"
                >
                  {{
                    Array.isArray(imageWarnings[image]) && imageWarnings[image].length > 0
                        ? `⚠️ ${t('allergyWarning.warningContent')}`
                        : allergyInfo[image]
                            ? `✅ ${t('allergyWarning.okContent')}`
                            : `ℹ️ ${t('allergyWarning.noneContent')}`
                  }}
                </p>



                <!-- 알러지 정보 버튼 -->
                <button
                    @click="showAllergyModal(image)"
                    class="mt-2 cursor-pointer text-sm font-bold px-6 py-3 bg-white rounded-lg shadow-md border-2 transition hover:shadow-lg"
                    :class="{
        'border-red-600 text-red-600': Array.isArray(imageWarnings[image]) && imageWarnings[image].length > 0, // 경고가 있을 때 빨간색
        'border-green-500 text-green-500': Array.isArray(imageWarnings[image]) && imageWarnings[image].length === 0 && allergyInfo[image], // 알러지 정보가 있는 경우 초록색
        'border-gray-500 text-gray-500': !allergyInfo[image] && (!Array.isArray(imageWarnings[image]) || imageWarnings[image].length === 0) // 알러지 정보가 없는 경우 회색
    }"
                >
                  {{ allergyInfo[image] ? t('photo.modal.allergyInfo') : t('photo.modal.noAllergyInfo') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>



    <modal
        :visible="isAllergyModalVisible"
        @update:visible="isAllergyModalVisible = $event"
        class="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">{{ t('photo.allergyModal.title') }}</h2>

        <!-- 알러지 정보 리스트 -->
        <div v-if="currentAllergyInfo" class="text-center text-gray-600 space-y-2">
        <span
            v-for="(info, index) in currentAllergyInfo.split(',')"
            :key="index"
            :class="{
            'text-red-600 font-bold': currentWarning.includes(info.trim()),
            'text-gray-800': !currentWarning.includes(info.trim()),
          }"
            class="block"
        >
          {{ info }}
        </span>
        </div>

        <!-- 경고 메시지 -->
        <div v-if="currentWarning.length > 0" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xl">⚠️</span>
            <span class="text-lg font-semibold">{{ currentWarning.join(', ') + " " + t('photo.allergyModal.Warning') }}</span>
          </div>
        </div>

        <!-- 경고 없음 -->
        <div v-else class="mt-4 p-4 bg-green-100 text-green-700 rounded-lg shadow text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xl">✅</span>
            <span class="text-lg font-semibold">{{ t('photo.allergyModal.noWarning') }}</span>
          </div>
        </div>

        <div v-else class="mt-4 p-4 bg-gray-100 text-gray-700 rounded-lg shadow text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xl">ℹ️</span>
            <span class="text-lg font-semibold">{{ t('photo.allergyNoContent') }}</span>
          </div>
        </div>
      </div>


    </modal>

  </div>
</template>
