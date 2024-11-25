<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// ReviewDetail 타입 정의
interface ReviewDetail {
  rno: number;
  pno: number;
  uno: number;
  rcontent: string;
  rdelete: boolean;
  rstar: number;
  rimage: string | null;
  rregDate: string;
  rmodDate: string;
}

const route = useRoute(); // 현재 라우트 정보를 가져옴
const router = useRouter(); // 라우터 인스턴스
const rno = ref<number | null>(null); // 리뷰 번호
const review = ref<ReviewDetail | null>(null); // 리뷰 상세 정보
const loading = ref(false); // 로딩 상태

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
    const response = await axios.get(`http://localhost:8080/api/v1/review/detail/${rno.value}`);
    review.value = response.data; // API에서 가져온 데이터 설정
  } catch (error) {
    console.error("리뷰 상세 정보를 가져오는 중 오류 발생:", error);
    alert("리뷰 상세 정보를 가져오는 중 문제가 발생했습니다.");
  } finally {
    loading.value = false;
  }
};

// 뒤로가기
const goBack = () => {
  router.back();
};

// 컴포넌트가 로드될 때 리뷰 번호 설정 및 데이터 가져오기
onMounted(() => {
  rno.value = Number(route.params.rno); // URL에서 리뷰 번호 추출
  fetchReviewDetail();
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-800">리뷰 상세 정보</h1>
      <button @click="goBack" class="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300">
        뒤로가기
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else>
      <div v-if="review" class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-700">상품 번호: {{ review.pno }}</h2>
          <p class="text-sm text-gray-600">리뷰 번호: {{ review.rno }}</p>
          <p class="text-sm text-gray-600">사용자 번호: {{ review.uno }}</p>
        </div>

        <div>
          <img
              v-if="review.rimage"
              :src="review.rimage"
              alt="리뷰 이미지"
              class="w-48 h-auto border rounded-lg"
          />
          <p v-else class="text-sm text-gray-400">이미지가 없습니다.</p>
        </div>

        <div>
          <p class="text-yellow-500 text-lg">
            <span v-for="star in 5" :key="star">
              {{ star <= review.rstar ? "★" : "☆" }}
            </span>
          </p>
        </div>

        <div>
          <p class="text-gray-700">내용: {{ review.rcontent }}</p>
        </div>

        <div class="text-xs text-gray-500">
          <p>등록일: {{ formatDate(review.rregDate) }}</p>
          <p>수정일: {{ formatDate(review.rmodDate) }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">리뷰 상세 정보를 불러올 수 없습니다.</div>
    </div>
  </div>
</template>
