<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 리뷰 목록 헤더 -->
    <h2 class="text-2xl font-bold mb-4">리뷰 목록</h2>

    <!-- 검색창 -->
    <div class="relative mb-8">
      <input
          type="text"
          v-model="searchKeyword"
          placeholder="리뷰 검색하기"
          class="w-full p-3 pl-12 border border-gray-300 rounded-full"
      >
      <Icon
          icon="material-symbols:search"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
      />
    </div>

    <!-- 데이터가 없을 경우 -->
    <div
        v-if="filteredReviews.length === 0"
        class="text-center py-8 text-gray-500"
    >
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getReviewList } from "../../api/reviewAPI/ReviewAPI.ts"

// 상태 관리
const reviews = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)


// 리뷰 목록 조회
const fetchReviews = async () => {
  try {
    const response = await getReviewList(currentPage.value, pageSize.value)
    reviews.value = response.list
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
