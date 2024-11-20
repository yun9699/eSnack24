<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 리뷰 목록 헤더 -->
    <h2 class="text-2xl font-bold mb-4">리뷰 목록</h2>


    <!-- 리뷰 목록 -->
    <div>
      <div v-for="review in filteredReviews" :key="review.id" class="review-item">
        <p>{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getReviewList } from "../../api/reviewAPI/ReviewAPI.ts"

// 상태 관리
const reviews = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)


// 리뷰 목록 조회
const fetchReviews = async () => {
  try {
    const response = await getReviewList(currentPage.value, pageSize.value)
    reviews.value = response.list || [] // 빈 배열로 설정
  } catch (error) {
    console.error('리뷰 목록 조회 실패:', error)
  }
}

// 컴포넌트 마운트 시 리뷰 목록 조회
onMounted(() => {
  fetchReviews()
})
</script>

<style scoped>
.review-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
