<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  fetchReviewDetailAPI,
  editReviewAPI,
  uploadImageAPI,
  uploadBase64ImageAPI, deleteReviewAPI
} from "../../../api/reviewAPI/productReviewAPI";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const rno = ref<number | null>(null);
const review = ref(null);
const submitting = ref(false);
const pno = ref<number | null>(null);

// 수정 폼 데이터
const rcontent = ref("");
const rstar = ref<number | null>(null);
const selectedImageFile = ref<File | null>(null);
const selectedImageBlob = ref<string | null>(null);
const currentImageUrl = ref<string | null>(null);

// 리뷰 상세 정보 가져오기
const fetchReviewDetail = async () => {
  if (!rno.value) {
    console.error("리뷰 번호가 없습니다.");
    return;
  }

  try {
    const data = await fetchReviewDetailAPI(rno.value);
    review.value = data;
    rcontent.value = data.rcontent;
    rstar.value = data.rstar;
    currentImageUrl.value = data.rimage;
    pno.value = data.pno;
  } catch (error) {
    console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

// 이미지 파일 선택 처리
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedImageFile.value = file;
    selectedImageBlob.value = URL.createObjectURL(file);
  }
};

const setStar = (star: number) => {
  rstar.value = star;
};

// 이미지 업로드 처리
const uploadImage = async () => {
  if (!selectedImageFile.value) return null;

  const formData = new FormData();
  formData.append("file", selectedImageFile.value);

  try {
    const response = await uploadBase64ImageAPI(selectedImageFile.value);
    return response; // 서버에서 반환된 URL
  } catch (error) {
    console.error("이미지 업로드 중 오류가 발생했습니다.");
    return null;
  }
};

// 리뷰 수정
const editReview = async () => {
  if (!rno.value || !rcontent.value.trim() || !rstar.value) {
    console.error("내용과 별점을 입력해주세요.");
    return;
  }

  let imageUrl = currentImageUrl.value;
  if (selectedImageFile.value) {
    imageUrl = await uploadImage();
  }

  try {
    submitting.value = true;
    await editReviewAPI(rno.value, {
      rcontent: rcontent.value.trim(),
      rstar: rstar.value,
      rimage: imageUrl || null,
    });

    const unoParam = route.query.uno;
    if (unoParam && unoParam !== "undefined") {
      await router.push({ path: `/review/user/${unoParam}` });
    } else {
      await router.push(`/review/detail/${rno.value}`);
    }
  } catch (error) {
    console.error("리뷰 수정 중 오류가 발생했습니다.");
  } finally {
    submitting.value = false;
  }
};

const deleteReview = async () => {
  if (!rno.value) {
    console.log("리뷰 번호가 없습니다.");
    return;
  }

  try {
    submitting.value = true;
    await deleteReviewAPI(rno.value);

    const unoParam = route.query.uno;
    if (unoParam && unoParam !== "undefined") {
      await router.push({ path: `/review/user/${unoParam}` });
    } else if (pno.value) {
      await router.push(`/review/list/${pno.value}`);
    } else {
      // 기본 리스트로 이동
      await router.push(`/review/list`);
    }
  } catch (error) {
    console.error("리뷰 삭제 중 오류가 발생했습니다.");
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  rno.value = Number(route.params.rno);
  fetchReviewDetail();
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg">
    <!-- 헤더 -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-extrabold text-gray-700">{{ t('reviewEdit.Header') }}</h1>
    </div>

    <!-- 이미지 업로드 섹션 -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700">{{ t('reviewEdit.labels.reviewImage') }}</label>
      <div class="mt-4 flex flex-col items-center space-y-4">
        <img
            v-if="selectedImageBlob"
            :src="selectedImageBlob"
            alt="New Preview Image"
            class="w-48 h-auto border rounded-lg shadow-md"
        />
        <img
            v-else-if="currentImageUrl && !selectedImageBlob"
            :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/review/${currentImageUrl}`"
            alt="Current Image"
            class="w-48 h-auto border rounded-lg shadow-md"
        />
        <p v-else class="text-sm text-gray-500">{{ t('reviewEdit.labels.noImage') }}</p>
      </div>
      <input
          type="file"
          @change="handleImageChange"
          class="mt-4 w-full p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
      />
    </div>

    <!-- 리뷰 수정 폼 -->
    <div v-if="review" class="space-y-6">
      <!-- 별점 -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('reviewEdit.labels.rating') }}</label>
        <div class="flex space-x-1 mt-2 justify-center">
          <span
              v-for="star in 5"
              :key="star"
              class="cursor-pointer text-4xl transition-colors duration-200"
              :class="{ 'text-yellow-500': star <= rstar, 'text-gray-300': star > rstar }"
              @click="setStar(star)"
          >
            ★
          </span>
        </div>
      </div>

      <!-- 리뷰 내용 -->
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ t('reviewEdit.labels.reviewContent') }}</label>
        <textarea
            v-model="rcontent"
            rows="5"
            class="w-full mt-2 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            :placeholder="t('reviewEdit.labels.reviewContentPlaceholder')"
        ></textarea>
      </div>

      <!-- 버튼 섹션 -->
      <div class="flex justify-end gap-4 mt-4">
        <button
            :disabled="submitting"
            @click="editReview"
            class="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition disabled:opacity-50"
        >
          {{ submitting ? t('reviewEdit.buttons.editReview.loading') : t('reviewEdit.buttons.editReview.default') }}
        </button>
        <button
            @click="deleteReview"
            :disabled="submitting"
            class="w-full py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition disabled:opacity-50"
        >
          {{ t('reviewEdit.buttons.deleteReview') }}
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-6">
      {{ t('reviewEdit.labels.loadingReviewData') }}
    </div>
  </div>
</template>