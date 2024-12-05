<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ReviewRegister } from "../../../types/reviewTypes.ts";
import {uploadImageAPI, submitReviewAPI, uploadBase64ImageAPI} from "../../../api/reviewAPI/productReviewAPI.ts";
import {fetchProductTitleAPI} from "../../../api/productAPI/productAPI.ts";


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
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <h2 class="text-lg font-semibold">후기 작성</h2>
    </div>

    <div class="mb-4">
      <p><strong>uno:</strong> {{ uno }}</p>
      <p><strong>상품 번호:</strong> {{ pno }}</p>
    </div>

    <div class="mb-4">
      <p>이미지 업로드 (선택)</p>
      <input type="file" @change="handleImageChange" class="w-full p-2 border rounded-lg" />
      <div v-if="selectedImageBlob" class="mt-2">
        <img :src="selectedImageBlob" alt="Uploaded image" class="w-32 h-32 object-cover border rounded-lg" />
      </div>
    </div>

    <div class="mb-4">
      <p>이 상품 어떠셨나요? (상품명: {{ productTitle }})</p>
      <div class="flex">
        <span
            v-for="star in 5"
            :key="star"
            @click="rating = star"
            class="text-yellow-500 cursor-pointer text-2xl"
        >
          {{ star <= rating ? '★' : '☆' }}
        </span>
      </div>
    </div>

    <div class="mb-4">
      <p>어떤 점이 좋았나요?</p>
      <textarea
          v-model="reviewText"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="후기 입력(필수)"
      ></textarea>
    </div>

    <button
        :disabled="submitting"
        @click="submitReview"
        class="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
    >
      {{ submitting ? '등록 중...' : '등록하기' }}
    </button>
  </div>
</template>
