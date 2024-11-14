<template>
  <div class="container mx-auto px-4">
    <header class="py-4">
      <div class="flex justify-between items-center">
        <button class="text-2xl">
          <span class="sr-only">메뉴</span>
          ☰
        </button>
      </div>
    </header>

    <div class="mt-4">
      <select class="w-full p-2 border rounded" v-model="sortOption">
        <option value="latest">최신순</option>
        <option value="price">가격순</option>
      </select>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div v-for="product in products" :key="product.id" class="border rounded-lg p-2">
        <div class="relative">
          <img :src="product.image" :alt="product.name" class="w-full rounded">
        </div>
        <div class="mt-2">
          <h3 class="font-medium">{{ product.name }}</h3>
          <p class="text-red-500 font-bold">{{ product.price }}원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const sortOption = ref('latest')

const products = ref<Product[]>([
  {
    id: 1,
    name: '좋은느낌 유기농 무표백',
    price: 3900,
    image: '/product1.jpg',
  },
  {
    id: 2,
    name: '좋은느낌 유기농 수퍼롱오버',
    price: 4800,
    image: '/product2.jpg',
  },
  // 추가 상품 데이터...
])
</script>
