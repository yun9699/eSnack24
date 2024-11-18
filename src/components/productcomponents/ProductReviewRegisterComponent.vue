<template>
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <button class="p-2 border rounded-lg mr-2" @click="goBack">
        &lt;
      </button>
      <h2 class="text-lg font-semibold">후기 작성</h2>
    </div>

    <div class="mb-4">
      <p>이 상품 어떠셨나요?</p>
      <div class="flex items-center space-x-2 mt-2">
        <button class="px-3 py-1 border rounded-lg">{{ pno }}</button>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex">
        <span
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            class="cursor-pointer text-2xl"
        >
          {{ star <= rating ? '★' : '☆' }}
        </span>
      </div>
    </div>

    <div class="mb-4">
      <p>어떤 점이 좋았나요?</p>
      <textarea
          v-model="reviewText"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="후기 입력(필수)"
      ></textarea>
    </div>

    <button
        @click="submitReview"
        class="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
    >
      등록하기
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from "../../router/MainRouter.ts";

interface Review {
  pno: number
  rstar: number
  rcontent: string
}

const props = withDefaults(defineProps<{
  pno: number
  ptitle_ko: string

}>(), {
  ptitle_ko: '상품명',

})

const rating = ref(0)
const reviewText = ref('')

const setRating = (value: number) => {
  rating.value = value
}

const submitReview = () => {
  if (rating.value > 0 && reviewText.value.trim()) {
    const newReview: Review = {
      productId: props.productId,
      rating: rating.value,
      text: reviewText.value.trim()
    }
    // 여기서 리뷰를 서버에 제출하는 로직을 구현할 수 있습니다.
    console.log('제출된 리뷰:', newReview)
    // 폼 초기화
    rating.value = 0
    reviewText.value = ''
  }
}

const goBack = () => {
  router.back()
  console.log('뒤로 가기')
}
</script>