
<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
import {Review} from "../../../types/reviewTypes.ts";
import {getUserReviewList} from "../../../api/reviewAPI/userReviewAPI.ts";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const reviews = ref<Review[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);

const router = useRouter()
const route = useRoute();
const uno = ref<number>(null);



const fetchReviews = async () => {
  console.log(uno.value)
  if (!uno.value) {
    console.error("uno 값이 없습니다.");
    return;
  }

  loading.value = true;
  try {
    const data = await getUserReviewList(page.value, size.value, uno.value);

    reviews.value.push(...data.list);

    if (data.list.length < size.value) {
      hasMore.value = false;
    }

    console.log("현재 리뷰 개수:", reviews.value.length);
    console.log("hasMore 상태:", hasMore.value);

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

const goToDetail = (rno: number) => {
  router.push(`/review/detail/${rno}?uno=${uno.value}`);
};

onMounted(() => {
  uno.value = Number(route.params.uno);
  fetchReviews();
});

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-extrabold text-gray-500 text-center mb-6">
      {{ t('user_reviewList.Header') }}
    </h1>
    <div class="w-24 h-1 bg-yellow-500 mx-auto rounded mb-8"></div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center text-gray-500">
      {{ t('user_reviewList.loadingUserReviews') }}
    </div>

    <!-- 리뷰 리스트 -->
    <div v-else>
      <div v-if="reviews.length === 0" class="text-center text-gray-400 py-6">
        {{ t('user_reviewList.noUserReviewsMessage') }}
      </div>
      <ul class="space-y-6">
        <li
            v-for="review in reviews"
            :key="review.rno"
            @click="goToDetail(review.rno)"
            class="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-yellow-400 cursor-pointer"
        >
          <div class="flex items-center space-x-4">
            <img
                v-if="review.rimage"
                :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/review/${review.rimage}`"
                :alt="t('user_reviewList.userReviewLabels.image')"
                class="w-24 h-24 object-cover rounded-lg border"
            />
            <div>
              <p class="text-yellow-500 text-lg mb-2">
                <span v-for="star in 5" :key="star">
                  {{ star <= review.rstar ? "★" : "☆" }}
                </span>
              </p>
              <h3 class="text-lg font-semibold text-gray-700">
                {{ t('user_reviewList.userReviewLabels.productNumber') }} : {{ review.pno }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ t('user_reviewList.userReviewLabels.reviewNumber') }} : {{ review.rno }}
              </p>
              <p class="text-sm text-gray-600">
                {{ t('user_reviewList.userReviewLabels.userNumber') }} : {{ review.uno }}
              </p>
            </div>
          </div>
          <p class="text-gray-700 mt-4">
            {{ review.rcontent }}
          </p>
          <p class="text-xs text-gray-500 mt-4">
            {{ t('user_reviewList.userReviewLabels.registrationDate') }} : {{ formatDate(review.rregDate) }}
          </p>
          <p class="text-xs text-gray-500">
            {{ t('user_reviewList.userReviewLabels.modificationDate') }} : {{ formatDate(review.rmodDate) }}
          </p>
        </li>
      </ul>

      <!-- 더 보기 버튼 -->
      <button
          v-if="hasMore"
          @click.prevent="loadMore"
          class="w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition"
      >
        {{ t('user_reviewList.userReviewLabels.loadMoreUserReviews') }}
      </button>
    </div>
  </div>
</template>


