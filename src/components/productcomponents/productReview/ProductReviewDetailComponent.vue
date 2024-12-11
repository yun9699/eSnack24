<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ReviewDetail } from "../../../types/reviewTypes";
import { fetchReviewDetailAPI } from "../../../api/reviewAPI/productReviewAPI";
import { fetchProductTitleAPI } from "../../../api/productAPI/productAPI.ts";
import { localeProduct } from "../../../locales/localeProduct.ts";
import useUserStore from "../../../stores/useUserStore.ts";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n(); // locale 추가
const { localePtitle } = localeProduct();

const route = useRoute();
const router = useRouter();
const rno = ref<number | null>(null);
const pno = ref<number | null>(null);
const review = ref<ReviewDetail | null>(null);
const product = ref(null); // 상품 데이터 저장
const productTitle = ref<string>(""); // 번역된 상품명 저장
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
    const reviewData = await fetchReviewDetailAPI(rno.value);
    review.value = reviewData;

    // 리뷰 데이터에서 pno 추출 및 상품 정보 가져오기
    if (reviewData.pno) {
      pno.value = reviewData.pno; // pno 값 설정
      product.value = await fetchProductTitleAPI(pno.value); // 상품 데이터 가져오기
      updateProductTitle(); // 초기 번역된 상품명 설정
    }
  } catch (error: any) {
    console.error("Error fetching review detail:", error.message);
  } finally {
    loading.value = false;
  }
};

// 번역된 상품명 업데이트 함수
const updateProductTitle = () => {
  if (product.value) {
    productTitle.value = localePtitle(product.value); // 번역된 상품명 설정
  }
};

// 리뷰 수정 페이지로 이동
const goToEditPage = () => {
  if (rno.value) {
    const unoParam = route.query.uno;
    router.push(`/review/edit/${rno.value}?uno=${unoParam}`);
  }
};

// 리스트 페이지로 이동
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

// 언어 변경 감지 및 상품명 업데이트
watch(locale, () => {
  updateProductTitle(); // 언어 변경 시 번역된 상품명 업데이트
});

onMounted(() => {
  rno.value = Number(route.params.rno);
  fetchReviewDetail();
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div v-if="loading" class="text-center text-gray-500">
      {{ t('reviewDetail.loadingReviewDetail') }}
    </div>
    <div v-else>
      <div v-if="review" class="space-y-4">
        <!-- 번역된 상품명 표시 -->
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ productTitle }}</h2>
        </div>
        <div>
          <img
              v-if="review.rimage"
              :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/review/${review.rimage}`"
              :alt="t('reviewDetail.reviewDetailLabels.image')"
              class="w-48 h-auto border rounded-lg"
          />
          <p v-else class="text-sm text-gray-400">
            {{ t('reviewDetail.reviewDetailLabels.noImage') }}
          </p>
        </div>

        <div>
          <p class="text-yellow-500 text-lg">
            <span v-for="star in 5" :key="star">
              {{ star <= review.rstar ? "★" : "☆" }}
            </span>
          </p>
        </div>

        <div>
          <p class="text-gray-700">{{ review.rcontent }}</p>
        </div>

        <div class="text-xs text-gray-500">
          <p>
            {{ t('reviewDetail.reviewDetailLabels.registrationDate') }} :
            {{ formatDate(review.rregDate) }}
          </p>
          <p>
            {{ t('reviewDetail.reviewDetailLabels.modificationDate') }} :
            {{ formatDate(review.rmodDate) }}
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">
        {{ t('reviewDetail.reviewDetailLabels.noReviewDetails') }}
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-8">
      <!-- 수정 버튼 -->
      <button
          v-if="review && uno === review.uno"
          @click="goToEditPage"
          class="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        {{ t('reviewDetail.buttons.editReviewDetail') }}
      </button>

      <!-- 리스트로 돌아가기 버튼 -->
      <button
          @click="goToListPage"
          class="px-6 py-3 bg-white text-yellow-500 border border-yellow-500 font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:text-white transition"
      >
        {{ t('reviewDetail.buttons.goBackToReviewList') }}
      </button>
    </div>
  </div>
</template>
