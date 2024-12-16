<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getReviewList } from "../../../api/reviewAPI/productReviewAPI.ts";
import { fetchProductTitleAPI } from "../../../api/productAPI/productAPI.ts";
import { Review } from "../../../types/reviewTypes.ts";
import { IProduct } from "../../../types/productTypes.ts";
import { localeProduct } from "../../../locales/localeProduct.ts";
import useUserStore from "../../../stores/useUserStore.ts";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const { localePtitle } = localeProduct();

const reviews = ref<Review[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);
const productData = ref<IProduct | null>(null);

const averageRating = ref(0); // 평균 별점
const starDistribution = ref([0, 0, 0, 0, 0]); // 별점 분포

const router = useRouter();
const route = useRoute();
const pno = ref<number | null>(null);
const userStore = useUserStore();
const uno = userStore.getUno;

// 상품명 가져오기
const fetchProductTitle = async () => {
  if (!pno.value) return;
  try {
    const product: IProduct = await fetchProductTitleAPI(pno.value);
    productData.value = product; // 전체 상품 데이터를 저장
  } catch (error) {
    console.error("Error fetching product title:", error);
  }
};

// `productTitle`을 번역된 값으로 동적으로 계산
const productTitle = computed(() => {
  return productData.value ? localePtitle(productData.value) : t("reviewList.noProductTitle");
});

const calculateStarStatistics = () => {
  const totalReviews = reviews.value.length;

  if (totalReviews === 0) {
    averageRating.value = 0;
    starDistribution.value = [0, 0, 0, 0, 0];
    return;
  }

  let totalStars = 0;
  const distribution = [0, 0, 0, 0, 0];

  reviews.value.forEach((review) => {
    totalStars += review.rstar;
    distribution[review.rstar - 1]++;
  });

  averageRating.value = (totalStars / totalReviews).toFixed(1);
  starDistribution.value = distribution.map((count) => ((count / totalReviews) * 100).toFixed(1));
};

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

    calculateStarStatistics(); // 별점 통계 계산
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
  fetchProductTitle();
  fetchReviews();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-extrabold text-gray-500 text-center mb-6">
      {{ t('reviewList.Header') }}
    </h1>
    <div class="text-center text-xl font-bold text-yellow-600 mb-4">
      {{ productTitle }}
    </div>
    <div class="w-24 h-1 bg-yellow-500 mx-auto rounded mb-8"></div>

    <!-- 별점 통계 -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <div class="flex justify-center items-center mb-4">
        <p class="text-4xl font-extrabold text-yellow-500 mr-2">{{ averageRating }}</p>
        <p class="text-gray-600 text-lg">/ 5</p>
      </div>
      <div class="space-y-2">
        <div v-for="(percentage, index) in starDistribution" :key="index" class="flex items-center">
          <p class="w-8 text-gray-700 text-sm">{{ index + 1 }} ★</p>
          <div class="w-full h-2 bg-gray-200 rounded-lg relative">
            <div
                class="absolute top-0 left-0 h-2 bg-yellow-500 rounded-lg"
                :style="{ width: `${percentage}%` }"
            ></div>
          </div>
          <p class="w-12 text-sm text-gray-500 text-right ml-2">{{ percentage }}%</p>
        </div>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="flex justify-center space-x-4 mb-8">
      <button
          @click="goToRegister"
          class="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        {{ t('reviewList.buttons.registerReview') }}
      </button>

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
                {{ productTitle }}
              </h3>
            </div>
          </div>
          <p class="text-gray-700 mt-4">{{ review.rcontent }}</p>
          <p class="text-xs text-gray-500 mt-4">
            {{ t('reviewList.reviewLabels.registrationDate') }} : {{ formatDate(review.rregDate) }}
          </p>
          <p class="text-xs text-gray-500">
            {{ t('reviewList.reviewLabels.modificationDate') }} : {{ formatDate(review.rmodDate) }}
          </p>
        </li>
      </ul>

      <!-- 더 보기 버튼 -->
      <div class="flex justify-center">
        <button
            v-if="hasMore"
            @click.prevent="loadMore"
            class="w-1/2 mt-8 py-3 bg-yellow-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          {{ t('user_reviewList.buttons.loadMoreUserReviews') }}
        </button>
      </div>
    </div>
  </div>
</template>
