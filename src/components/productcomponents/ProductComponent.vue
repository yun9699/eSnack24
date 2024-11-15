<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {getList} from "../../api/product/ProductAPI.ts";

// 상품 데이터
interface Product {
  pno: number
  ptitle_ko: string
  price: number
  pfilename: string
}


// 현재 보여지는 상품들의 인덱스
const currentIndex = ref(0)

// 상품을 한 칸씩 이동하는 함수 (오른쪽으로 이동)
const slideNext = () => {
  if (currentIndex.value < productList.value.length - 2) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // 처음으로 돌아가기
  }
}

const ProductList = ref<Product[]>([])

const loadProductList = async(page) => {

  const data = await getList(page)

  ProductList.value = data.list

}

onMounted(() => {
  loadProductList(1)
})

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 제목과 더보기 버튼을 flex로 배치 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">이번달 인기상품</h1>
      <!-- '더보기' 버튼을 오른쪽으로 밀기 위해 ml-auto 사용 -->
      <div class="flex items-center text-blue-500 cursor-pointer ml-auto hover:text-blue-700">
        <span class="mr-2">더보기 +</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 hover:text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        </svg>
      </div>
    </div>

    <div class="relative flex items-center">

       상품 리스트
      <div class="grid grid-cols-2 gap-4 w-full">
        {{console.log(ProductList.value)}}
        <div
            v-for="product in ProductList.slice(currentIndex, currentIndex+2)"
            :key="product.pno"
            class="flex-none bg-white shadow-lg rounded-lg overflow-hidden">

          <img
              :src="product.pfilename"
              :alt="product.ptitle_ko"
              class="w-full h-32 object-contain"
          />
          <div class="p-4">
            <h3 class="font-semibold text-lg">{{ product.ptitle_ko }}</h3>
            <p class="text-red-500 font-bold">{{ product.price }}원</p>
          </div>
        </div>
      </div>

      <!-- 오른쪽 버튼 -->
      <button
          @click="slideNext"
          class="absolute right-0 p-2 bg-gray-200 text-black rounded-full hover:bg-yellow-400"
      >
        <span class="text-2xl"> > </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 모바일에서도 잘 보이도록 */
.container {
  max-width: 100%;
}

h1 {
  font-size: 1.5rem;
}

.flex {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}

.relative {
  position: relative;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #fef5a8;
}

img {
  object-fit: contain; /* 이미지가 잘리지 않도록 설정 */
}

/* 데스크탑에서 두 상품을 나란히 보이도록 */
@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr); /* 데스크탑에서는 두 개의 상품이 나란히 배치 */
  }
}

/* 모바일에서는 두 상품을 잘 볼 수 있도록 */
@media (max-width: 767px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr); /* 모바일에서도 두 개씩 나란히 */
  }
}
</style>
