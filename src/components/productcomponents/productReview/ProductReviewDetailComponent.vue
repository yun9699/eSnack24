<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ReviewDetail } from "../../../types/reviewTypes";
import { fetchReviewDetailAPI } from "../../../api/reviewAPI/productReviewAPI";
import useUserStore from "../../../stores/useUserStore.ts";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const rno = ref<number | null>(null);
const review = ref<ReviewDetail | null>(null);
const loading = ref(false);

const userStore = useUserStore();
const uno = userStore.getUno;

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 리뷰 상세 정보 가져오기
const fetchReviewDetail = async () => {
  if (!rno.value) {
    console.error("리뷰 번호가 없습니다.");
    return;
  }

  loading.value = true;
  try {
    review.value = await fetchReviewDetailAPI(rno.value);
  } catch (error: any) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

// 리뷰 수정 페이지로 이동
const goToEditPage = () => {
  if (rno.value) {
    const unoParam = route.query.uno;
    router.push(`/review/edit/${rno.value}?uno=${unoParam}`);
  }
};

const goToListPage = () => {
  const unoParam = route.query.uno;
  if (unoParam) {
    router.push(`/review/user/${unoParam}`);
  } else if (review.value?.pno) {
    router.push(`/review/list/${review.value.pno}`);
  } else {
    router.push(`/review/list`);
  }
};


onMounted(() => {
  rno.value = Number(route.params.rno);
  fetchReviewDetail();
});
</script>




<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-800">{{ t('reviewDetail.Header') }}</h1>
    </div>

    <div v-if="loading" class="text-center text-gray-500">{{ t('reviewDetail.loadingReviewDetail') }}</div>
    <div v-else>
      <div v-if="review" class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-700">{{ t('reviewDetail.reviewDetailLabels.productNumber') }} : {{ review.pno }}</h2>
          <p class="text-sm text-gray-600">{{ t('reviewDetail.reviewDetailLabels.reviewNumber') }} : {{ review.rno }}</p>
          <p class="text-sm text-gray-600">{{ t('reviewDetail.reviewDetailLabels.userNumber') }} : {{ review.uno }}</p>
        </div>

        <div>
          <img
              v-if="review.rimage"
              :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/review/${review.rimage}`"
              :alt="t('reviewDetail.reviewDetailLabels.image')"
              class="w-48 h-auto border rounded-lg"
          />
          <p v-else class="text-sm text-gray-400">{{ t('reviewDetail.reviewDetailLabels.noImage') }}</p>
        </div>

        <div>
          <p class="text-yellow-500 text-lg">
            <span v-for="star in 5" :key="star">
              {{ star <= review.rstar ? "★" : "☆" }}
            </span>
          </p>
        </div>

        <div>
          <p class="text-gray-700">{{ t('reviewDetail.reviewDetailLabels.content') }} : {{ review.rcontent }}</p>
        </div>

        <div class="text-xs text-gray-500">
          <p>{{ t('reviewDetail.reviewDetailLabels.registrationDate') }} : {{ formatDate(review.rregDate) }}</p>
          <p>{{ t('reviewDetail.reviewDetailLabels.modificationDate') }} : {{ formatDate(review.rmodDate) }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">{{ t('reviewDetail.reviewDetailLabels.noReviewDetails') }}</div>
    </div>

    <div  class="flex gap-4 mt-4">
      <button v-if="review && uno === review.uno"
          @click="goToEditPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {{ t('reviewDetail.buttons.editReviewDetail') }}
      </button>
      <button
          @click="goToListPage"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        {{ t('reviewDetail.buttons.goBackToReviewList') }}
      </button>
    </div>

  </div>
</template>

