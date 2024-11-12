<template>
  <div class="container mx-auto px-4">
    <header class="py-4">
      <div class="flex justify-between items-center">
        <!--        <img src="/emart24-logo.png" alt="emart24" class="h-8">-->
        <button class="text-2xl">
          <span class="sr-only">메뉴</span>
          ☰
        </button>
      </div>
    </header>

    <nav class="flex gap-4 py-4 border-b">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
          'px-4 py-2 rounded-full',
          selectedTab === tab.id ? 'bg-yellow-400 text-black' : 'text-gray-500'
        ]"
          @click="selectedTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </nav>

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
          <span v-if="product.isNew" class="absolute top-2 left-2 bg-white px-2 py-1 text-xs rounded">NEW</span>
          <span v-if="product.promotion" class="absolute top-2 right-2 bg-yellow-400 px-2 py-1 text-xs rounded">1+1</span>
        </div>
        <div class="mt-2">
          <h3 class="font-medium">{{ product.name }}</h3>
          <p class="text-red-500 font-bold">{{ product.price }}원</p>
        </div>
      </div>
    </div>
    <BottomNavBar/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  id: string
  name: string
}

interface Product {
  id: number
  name: string
  price: number
  image: string
  isNew: boolean
  promotion: string
}

const tabs = ref<Tab[]>([
  { id: 'all', name: '전체' },
  { id: '1plus1', name: '1+1' },
  { id: '2plus1', name: '2+1' },
  { id: 'sale', name: '세일' },
  { id: 'new', name: '덤증정' },
])

const selectedTab = ref('all')
const sortOption = ref('latest')

const products = ref<Product[]>([
  {
    id: 1,
    name: '좋은느낌 유기농 무표백',
    price: 3900,
    image: '/product1.jpg',
    isNew: true,
    promotion: '1+1'
  },
  {
    id: 2,
    name: '좋은느낌 유기농 수퍼롱오버',
    price: 4800,
    image: '/product2.jpg',
    isNew: true,
    promotion: '1+1'
  },
  // 추가 상품 데이터...
])
</script>