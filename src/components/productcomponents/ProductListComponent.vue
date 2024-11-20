<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {getList} from "../../api/product/ProductAPI.ts";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

interface Product {
  pno: number
  ptitle_ko: string
  price: number
  pfilename: string
}

const serverData = ref({
  ProductList: [],
  number: 0,
  size: 0,
  totalPages: 0
});

const router = useRouter();
const route = useRoute();


const handleClickPage = (pageNum) => {
  const currentQueryPage = parseInt(route.query.page || 1);
  if (currentQueryPage === pageNum) {
    getList(pageNum).then(res => serverData.value = res);
  } else {
    router.push({ path: '/product/list', query: { page: pageNum } });
  }
};

const pageNums = computed(() => {
  const current = serverData.value.number + 1;
  let lastPageNum = Math.ceil(current / 10.0) * 10;
  const startPageNum = lastPageNum - 9;
  const prev = startPageNum !== 1;
  let next = true;

  if (serverData.value.totalPages <= lastPageNum) {
    lastPageNum = serverData.value.totalPages;
    next = false;
  }

  const arr = [];
  if (prev) {
    arr.push({ page: startPageNum - 1, label: "Prev" });
  }
  for (let i = startPageNum; i <= lastPageNum; i++) {
    arr.push({ page: i, label: i });
  }
  if (next) {
    arr.push({ page: lastPageNum + 1, label: "Next" });
  }
  return arr;
});


onMounted(async () => {
  const page = route.query.page || 1;
  const result = await getList(page);
  serverData.value.ProductList = result.list;
  console.log("--------------------------------")
  console.log(serverData.value)
})

onBeforeRouteUpdate(async (to, from, next) => {
  const result = await getList(to.query.page);
  serverData.value = result;
  next();
});



</script>

<template>
    <!-- Header Section -->
    <header class="bg-yellow-500 p-4 flex justify-between items-center">
      <div class="flex space-x-4">
        <button class="px-4 py-2 bg-yellow-600 text-white rounded">행사상품</button>
        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded">차별화 상품</button>
        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded">Fresh Food</button>
      </div>
    </header>

    <!-- Banner Section -->
    <section class="p-4 bg-gray-100 text-center">
      <p class="text-gray-600">이스낵이 준비한 이달의 행사상품을 만나보세요.</p>
      <div class="bg-yellow-200 p-4 mt-2 rounded">

        <button class="mt-4 px-6 py-2 bg-yellow-500 text-white rounded">앱 다운로드</button>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="p-4">
      <div class="flex space-x-2 mb-4">
        <input
            type="text"
            placeholder="상품명을 입력해주세요."
            class="w-full p-2 border rounded"
        />
        <button class="px-4 py-2 bg-yellow-500 text-white rounded">검색</button>
      </div>
      <div class="flex space-x-2 mb-4">
        <button class="px-4 py-1 bg-yellow-500 text-white rounded">전체</button>
        <button class="px-4 py-1 bg-gray-200 text-gray-700 rounded">1+1</button>
        <button class="px-4 py-1 bg-gray-200 text-gray-700 rounded">2+1</button>
        <button class="px-4 py-1 bg-gray-200 text-gray-700 rounded">세일</button>
        <button class="px-4 py-1 bg-gray-200 text-gray-700 rounded">덤증정</button>
      </div>
      <select class="p-2 border rounded w-full">
        <option>최신순</option>
        <option>가격 낮은순</option>
        <option>가격 높은순</option>
      </select>
    </section>

    <!-- Product List Section -->


    <section class="p-4 grid grid-cols-2 gap-4">
      <!-- Example Product Card -->
      <div
          v-for="item in serverData.ProductList"
          :key="item.pno">

      <div class="border rounded p-4 text-center">
        <div class="flex justify-between">
          <span class="text-gray-500">NEW</span>
          <span class="bg-yellow-500 text-white text-sm px-2 rounded">1+1</span>
        </div>

        <img
            :src="`http://10.10.10.128/product/s_${item.pfilename}`"
            :alt="item.ptitle_ko"
            class="w-full h-32 object-contain"
        />

        <p class="mt-2 text-gray-700">{{item.ptitle_ko}}</p>
        <p class="mt-2 text-orange-500 font-semibold">{{item.price}}원</p>
      </div>

      </div>
      <!-- Add more product cards as needed -->
    </section>


  <div class="d-flex justify-content-center align-items-center mt-4">
    <ul class="pagination">
      <li v-for="{ page, label } in pageNums" :key="page" :class="`page-item ${ page == serverData.number + 1 ? 'active' : ''}`">
        <a class="page-link" @click="() => handleClickPage(page)">{{ label }}</a>
      </li>
    </ul>
  </div>



</template>

<style scoped>
/* You can add custom styles here if needed */
</style>
