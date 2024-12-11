<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ReviewRegister } from "../../../types/reviewTypes.ts";
import {submitReviewAPI, uploadBase64ImageAPI} from "../../../api/reviewAPI/productReviewAPI.ts";
import {fetchProductTitleAPI} from "../../../api/productAPI/productAPI.ts";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const uno = ref<number | null>(null);
const pno = ref<number | null>(null);
const productTitle = ref("");
const rating = ref(0);
const reviewText = ref("");
const selectedImageFile = ref<File | null>(null);
const selectedImageBlob = ref<string | null>(null); // Blob URL로 이미지 미리보기
const submitting = ref(false);
const router = useRouter();
const route = useRoute();

// 상품명 가져오기
const fetchProductTitle = async () => {
  if (!pno.value) return;
  try {
    productTitle.value = await fetchProductTitleAPI(pno.value);
  } catch (error) {
    console.log(error.message);
  }
};

// 이미지 파일 선택 처리
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedImageFile.value = file;
    selectedImageBlob.value = URL.createObjectURL(file); // Blob URL 생성
  }
};

// 리뷰 등록
const submitReview = async () => {
  if (rating.value <= 0 || !reviewText.value.trim()) {
    return;
  }

  let imageUrl = null;
  if (selectedImageFile.value) {
    try {
      imageUrl = await uploadBase64ImageAPI(selectedImageFile.value);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }

  const newReview: ReviewRegister = {
    uno: uno.value,
    pno: pno.value,
    rstar: rating.value,
    rcontent: reviewText.value.trim(),
    rimage: imageUrl || null,
  };

  try {
    submitting.value = true;
    await submitReviewAPI(newReview);

    // 폼 초기화
    rating.value = 0;
    reviewText.value = "";
    selectedImageFile.value = null;
    selectedImageBlob.value = null;

    await router.push(`/review/list/${pno.value}`);
  } catch (error) {
    console.log(error.message);
  } finally {
    submitting.value = false;
  }
};


onMounted(() => {
  uno.value = Number(route.params.uno);
  pno.value = Number(route.params.pno);
  fetchProductTitle();
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg">
    <!-- 헤더 -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-extrabold text-gray-700">
        {{ t('reviewRegister.Header') }}
      </h2>
    </div>

    <!-- 상품 번호 -->
    <div class="mb-6">
      <p class="text-gray-600 text-lg font-medium">
        <strong>{{ t('reviewRegister.labels.reviewProductNumber') }}:</strong> {{ pno }}
      </p>
    </div>

    <!-- 이미지 업로드 -->
    <div class="mb-6">
      <p class="text-gray-700 font-semibold mb-2">{{ t('reviewRegister.labels.imageUpload') }}</p>
      <input
          type="file"
          @change="handleImageChange"
          class="block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <div v-if="selectedImageBlob" class="mt-4">
        <img
            :src="selectedImageBlob"
            alt="Uploaded image"
            class="w-32 h-32 object-cover border rounded-lg shadow-md"
        />
      </div>
    </div>

    <!-- 별점 선택 -->
    <div class="mb-6">
      <p class="text-gray-700 font-semibold mb-2">
        {{ t('reviewRegister.labels.productExperience') }}: <span class="text-yellow-700">{{ productTitle }}</span>
      </p>
      <div class="flex space-x-2">
        <span
            v-for="star in 5"
            :key="star"
            @click="rating = star"
            class="text-4xl cursor-pointer transition-transform transform hover:scale-110"
            :class="star <= rating ? 'text-yellow-500' : 'text-gray-300'"
        >
          ★
        </span>
      </div>
    </div>

    <!-- 리뷰 텍스트 -->
    <div class="mb-6">
      <p class="text-gray-700 font-semibold mb-2">{{ t('reviewRegister.labels.positiveFeedback') }}</p>
      <textarea
          v-model="reviewText"
          rows="5"
          class="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          :placeholder="t('reviewRegister.labels.reviewPlaceholder')"
      ></textarea>
    </div>

    <!-- 제출 버튼 -->
    <button
        :disabled="submitting"
        @click="submitReview"
        class="w-full py-3 text-lg font-bold text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600 transition disabled:opacity-50"
    >
      {{ submitting ? t('reviewRegister.button.reviewSubmitting') : t('reviewRegister.button.reviewSubmit') }}
    </button>
  </div>
</template>
