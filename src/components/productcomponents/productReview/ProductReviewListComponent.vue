<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getReviewList } from "../../../api/reviewAPI/productReviewAPI.ts";
import { Review } from "../../../types/reviewTypes.ts";
import useUserStore from "../../../stores/useUserStore.ts";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const reviews = ref<Review[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);

const router = useRouter();
const route = useRoute();
const pno = ref<number>(null);
const userStore = useUserStore();
const uno = userStore.getUno;

const fetchReviews = async () => {
  if (!pno.value) {
    console.error("pno 값이 없습니다.");
    return;
  }

  loading.value = true;
  try {
    const data = await getReviewList(page.value, size.value, pno.value);

    reviews.value.push(...data.list);

    if (data.list.length < size.value) {
      hasMore.value = false;
    }
  } catch (error) {
    console.error("리뷰를 가져오는 중 오류 발생:", error);
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  const currentScrollY = window.scrollY; // 현재 스크롤 위치 저장
  page.value += 1; // 다음 페이지 요청
  await fetchReviews(); // 데이터를 가져옴
  window.scrollTo(0, currentScrollY); // 스크롤 위치 복원
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const goToDetail = (rno) => {
  router.push(`/review/detail/${rno}`);
};

const goToRegister = () => {
  router.push(`/review/${uno}/${pno.value}`);
};

const goToProductDetailPage = () => {
  if (pno.value) {
    router.push(`/product/list/${pno.value}`);
  } else {
    console.error("상품 번호가 없습니다.");
  }
};

onMounted(() => {
  pno.value = Number(route.params.pno);
  fetchReviews();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-extrabold text-gray-500 text-center mb-6">
      {{ t('reviewList.Header') }}
    </h1>
    <div class="w-24 h-1 bg-yellow-500 mx-auto rounded mb-8"></div>

    <!-- 버튼 -->
    <div class="flex justify-center space-x-4 mb-8">
      <button
          @click="goToRegister"
          class="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        {{ t('reviewList.buttons.registerReview') }}
      </button>

      <!-- 상세로 돌아가기 버튼 -->
      <button
          @click="goToProductDetailPage"
          class="px-6 py-3 bg-white text-yellow-500 border border-yellow-500 font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition"
      >
        {{ t('reviewList.buttons.goToProductDetail') }}
      </button>


    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center text-gray-500">
      {{ t('reviewList.loadingReviews') }}
    </div>

    <!-- 리뷰 리스트 -->
    <div v-else>
      <div v-if="reviews.length === 0" class="text-center text-gray-400 py-6">
        {{ t('reviewList.noReviewsMessage') }}
      </div>
      <ul class="space-y-6">
        <li
            v-for="review in reviews"
            :key="review.rno"
            class="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-yellow-400"
            @click="goToDetail(review.rno)"
        >
          <div class="flex items-center space-x-4">
            <img
                v-if="review.rimage"
                :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/review/${review.rimage}`"
                alt="리뷰 이미지"
                class="w-24 h-24 object-cover rounded-lg border"
            />
            <div>
              <p class="text-yellow-500 text-lg mb-2">
                <span v-for="star in 5" :key="star">
                  {{ star <= review.rstar ? "★" : "☆" }}
                </span>
              </p>
              <h3 class="text-lg font-semibold text-gray-700">
                {{ t('reviewList.reviewLabels.productNumber') }} : {{ review.pno }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ t('reviewList.reviewLabels.reviewNumber') }} : {{ review.rno }}
              </p>
              <p class="text-sm text-gray-600">
                {{ t('reviewList.reviewLabels.userNumber') }} : {{ review.uno }}
              </p>
            </div>
          </div>
          <p class="text-gray-700 mt-4">{{ t('reviewList.reviewLabels.content') }} : {{ review.rcontent }}</p>
          <p class="text-xs text-gray-500 mt-4">
            {{ t('reviewList.reviewLabels.registrationDate') }} : {{ formatDate(review.rregDate) }}
          </p>
          <p class="text-xs text-gray-500">
            {{ t('reviewList.reviewLabels.modificationDate') }} : {{ formatDate(review.rmodDate) }}
          </p>
        </li>
      </ul>

      <!-- 더 보기 버튼 -->
      <button
          v-if="hasMore"
          @click.prevent="loadMore"
          class="w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition"
      >
        {{ t('reviewList.buttons.loadMoreReviews') }}
      </button>
    </div>
  </div>
</template>
