
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getReviewList } from "../../../api/reviewAPI/productReviewAPI.ts";
import {Review} from "../../../types/reviewTypes.ts";


const reviews = ref<Review[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);

const route = useRoute();
const pno = ref<number>(null);



const fetchReviews = async () => {
  console.log(pno.value)
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


onMounted(() => {
  pno.value = Number(route.params.pno);
  fetchReviews();
});

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">리뷰 리스트</h1>
    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else>
      <div v-if="reviews.length === 0" class="text-center text-gray-400 py-6">리뷰가 없습니다.</div>
      <ul class="space-y-4">
        <li
            v-for="review in reviews"
            :key="review.rno"
            class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <div class="mt-2">
            <img
                v-if="review.rimage"
                :src="review.rimage"
                alt="리뷰 이미지"
                class="w-24 h-auto mt-2 border rounded"
            />
            <span v-else class="text-sm text-gray-400">이미지가 없습니다.</span>
          </div>
          <p class="text-yellow-500 text-lg mt-2">
            <span v-for="star in 5" :key="star">
              {{ star <= review.rstar ? "★" : "☆" }}
            </span>
          </p>
          <h3 class="text-lg font-semibold text-gray-700">상품 번호: {{ review.pno }}</h3>
          <p class="text-sm text-gray-600">리뷰 번호: {{ review.rno }}</p>
          <p class="text-sm text-gray-600">사용자 번호: {{ review.uno }}</p>
          <p class="text-gray-700 mt-2">내용: {{ review.rcontent }}</p>
          <p class="text-xs text-gray-500 mt-2">등록일: {{ formatDate(review.rregDate) }}</p>
          <p class="text-xs text-gray-500">수정일: {{ formatDate(review.rmodDate) }}</p>
        </li>
      </ul>
      <button
          v-if="hasMore"
          @click.prevent="loadMore"
      class="w-full mt-6 py-2 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
      >
      더 보기
      </button>
    </div>
  </div>
</template>

