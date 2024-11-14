<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getList} from "../../api/product/ProductAPI.ts";

// 상품 데이터
interface Product {
  pno: number
  ptitle_ko: string
  price: number
  image: string
}



// 상품 리스트
const products = ref<Product[]>([
  {
    pno: 1,
    ptitle_ko: '도도한 나쵸',
    price: 3900,
    image: '/snack/2b5be6a7-1ad8-4b2c-830d-345bce021272_b99b9eaa464cd13c37ab49b226cb50e4.png'
  },
  {
    pno: 2,
    ptitle_ko: '포카칩',
    price: 4800,
    image: '/snack/55f27028-7a3f-4ff7-94f9-d3523fe17d7e_873fce60a15a1f11dab2cc489e2f9d77.png'
  },
  {
    pno: 3,
    ptitle_ko: '땅콩강정',
    price: 1500,
    image: '/snack/637ce7b1-6314-4db6-ba56-de277eddacc9_aa4a5a1f3aa24132fc8d01c547878ddd.png'
  },
  {
    pno: 4,
    ptitle_ko: '기린 맥주',
    price: 12000,
    image: '/snack/2b5be6a7-1ad8-4b2c-830d-345bce021272_b99b9eaa464cd13c37ab49b226cb50e4.png'
  },
  {
    pno: 5,
    ptitle_ko: '배터리',
    price: 1000,
    image: '/snack/2b5be6a7-1ad8-4b2c-830d-345bce021272_b99b9eaa464cd13c37ab49b226cb50e4.png'
  },
])

// 현재 보여지는 상품들의 인덱스
const currentIndex = ref(0)

// 상품을 한 칸씩 이동하는 함수 (오른쪽으로 이동)
const slideNext = () => {
  if (currentIndex.value < products.value.length - 2) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // 처음으로 돌아가기
  }
}

const ProductList = ref<Product[]>([])

const loadProductList = async(page) => {

  const data = await getList(page)

  result.value = data

  console.log(result.value)
}

onMounted(() => {
  loadProductList()
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
      <!-- 상품 리스트 -->
      <div class="grid grid-cols-2 gap-4 w-full">
        <div
            v-for="(product, index) in products.slice(currentIndex, currentIndex + 2)"
            :key="product.id"
            class="flex-none bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
              :src="product.image"
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
