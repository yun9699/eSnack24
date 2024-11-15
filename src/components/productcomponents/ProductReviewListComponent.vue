<template>
  <div class="p-4 border rounded-lg">
    <h2 class="text-lg font-semibold mb-4">리뷰 목록</h2>

    <div v-if="isLoading" class="text-center py-4">
      리뷰를 불러오는 중...
    </div>

    <div v-if="reviews.length === 0" class="text-center py-4 text-gray-500">
      아직 리뷰가 없습니다.
    </div>

    <div v-else v-for="review in reviews" :key="review.rno" class="mb-4 p-4 border rounded-lg">
      <div class="flex items-center mb-2">
        <div v-if="review.rimage" class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
          <img :src="review.rimage" alt="리뷰 이미지" class="w-full h-full object-cover rounded-lg">
        </div>
        <div v-else class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
          이미지 없음
        </div>
        <div>
          <div class="text-xl">
            <span v-for="star in 5" :key="star" :class="{ 'text-yellow-400': star <= review.rstar, 'text-gray-300': star > review.rstar }">
              ★
            </span>
          </div>
          <p>{{ review.rcontent }}</p>
          <p class="text-sm text-gray-500">작성일: {{ formatDate(review.rregDate) }}</p>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        이전
      </button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

interface Review {
  rno: number;
  pno: number;
  uno: number;
  rcontent: string;
  rdelete: boolean;
  rstar: number;
  rimage: string;
  rregDate: string;
  rmodDate: string;
}

const props = defineProps<{
  pno: number
}>()

const reviews = ref<Review[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 10

const isLoading = ref(true)

const fetchReviews = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`http://localhost:8080/api/v1/review/list`, {
      params: {
        rno: props.pno,
        page: currentPage.value - 1,
        size: pageSize
      }
    })
    reviews.value = response.data.list
    totalPages.value = Math.ceil(response.data.total / pageSize)
  } catch (error) {
    console.error('리뷰를 불러오는 데 실패했습니다:', error)
  } finally {
    isLoading.value = false
  }
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

onMounted(fetchReviews)

watch(currentPage, fetchReviews)
</script>