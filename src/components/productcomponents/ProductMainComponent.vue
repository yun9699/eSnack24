<script setup lang="ts">
import {onMounted, ref, computed, provide, inject} from 'vue'
import { getList } from "../../api/product/ProductAPI.ts"
import { useRouter } from "vue-router"

// 상품 데이터 타입 정의
interface Product {
  pno: number
  ptitle_ko: string
  price: number
  pfilename: string
}



const router = useRouter()

// 상품 리스트 및 페이지 인덱스 관리
const ProductList = ref<Product[]>([])


// 한 페이지에 보여줄 상품 개수
const itemsPerPage = 2

// 현재 페이지 인덱스
const currentIndex = ref(0)

// 상품 데이터를 불러오는 함수
const loadProductList = async (page) => {
  const data = await getList(page)
  ProductList.value = data.list
}

// 페이지 버튼 클릭 시 페이지 이동
const goToPage = (index: number) => {
  currentIndex.value = index
}

// 상품 리스트 페이지별로 분할
const paginatedProducts = computed(() => {
  const start = currentIndex.value * itemsPerPage
  return ProductList.value.slice(start, start + itemsPerPage)
})

// 동그라미 버튼 생성 (총 페이지 수 계산)
const totalPages = computed(() => {
  return Math.ceil(ProductList.value.length / itemsPerPage)
})

onMounted(() => {
  loadProductList(1)
})

const handleClikeMove = () => {
  router.push('/product/list')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 제목과 더보기 버튼을 flex로 배치 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">이번달 인기상품</h1>
      <div class="flex items-center text-blue-500 cursor-pointer ml-auto hover:text-blue-700">
        <span class="mr-2">
          <button @click="handleClikeMove">
            더보기 +
          </button>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 hover:text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
      </div>
    </div>


    <div class="relative">
      <!-- 상품 리스트 그리드 -->
      <transition name="slide-fade" mode="out-in">

        <div class="grid grid-cols-2 gap-4 w-full">
          <div
              v-for="product in paginatedProducts"
              :key="product.pno"
              class="flex-none bg-white shadow-lg rounded-lg overflow-hidden"
          >

            <img
                :src="'http://10.10.10.128/product/' + product.pfilename"
                :alt="product.ptitle_ko"
                class="w-full h-32 object-contain"
            />
            <div class="p-4">
              <h3 class="font-semibold text-lg">{{ product.ptitle_ko }}</h3>
              <p class="text-red-500 font-bold">{{ product.price }}원</p>
            </div>
          </div>
        </div>
      </transition>

      <!-- 페이지 네비게이션 (동그라미 버튼) -->
      <div class="flex justify-center mt-4">
        <div
            v-for="page in totalPages"
            :key="page"
            class="w-4 h-4 mx-2 bg-gray-300 rounded-full cursor-pointer"
            :class="{ 'bg-blue-500': currentIndex === page - 1 }"
            @click="goToPage(page - 1)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 슬라이드 애니메이션 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
