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

    <div class="flex justify-center gap-4 mt-6">
      <button
          @click="toggle"
          class="px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow hover:bg-blue-700 transition"
      >
        {{ isToggled ? t('photo.toggleButton.on') : t('photo.toggleButton.off') }}
      </button>
      <button
          @click="switchCamera"
          class="px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg shadow hover:bg-green-700 transition"
      >
        {{ t('photo.switchCameraButton') }}
      </button>
      <button
          v-if="isToggled"
          @click="takePhotoAndShowResult"
          class="px-6 py-3 bg-purple-600 text-white text-lg font-bold rounded-lg shadow hover:bg-purple-700 transition"
      >
        {{ t('photo.takePhotoButton') }}
      </button>
    </div>

    <modal
        :visible="isModalVisible"
        @update:visible="isModalVisible = $event"
        class="mt-8"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ t('photo.modal.title') }}</h2>
      <p v-if="Object.keys(similarImages).length === 0" class="text-gray-500">
        {{ t('photo.modal.noResults') }}
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
                      :src="`https://esnack24.store/fastapi/static/${image}`"
                      :alt="image"
                      class="w-48 h-auto rounded-lg border border-gray-300 shadow hover:scale-105 transition transform"
                      @load="loadAllergyInfo(image)"
                      @click="handleImageClick(image)"
                  />
                  <p class="text-gray-600">{{ t(`photo.imageNames.${image}`, image) }}</p>
                  <p
                      @click="showAllergyModal(image)"
                      class="cursor-pointer text-lg"
                      :class="{
                      'text-red-600 font-bold': imageWarnings[image],
                      'text-green-500': !allergyInfo[image],
                    }"
                  >
                    {{ allergyInfo[image] ? t('photo.modal.allergyInfo') : t('photo.modal.noAllergyInfo') }}
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
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ t('photo.allergyModal.title') }}</h2>
      <p v-if="currentAllergyInfo" class="text-gray-600">
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
      </p>

      <p
          v-if="currentWarning"
          class="flex items-center gap-3 p-4 text-white bg-red-500 border border-red-700 rounded-lg shadow-md text-lg font-semibold animate-fadeIn"
      >
        <span class="text-2xl">⚠️</span>
        <span>{{ currentWarning }}</span>
      </p>

    </modal>
  </div>
</template>
