<script setup lang="ts">
import { ref } from "vue";
import { searchProducts } from "../../api/searchAPI/productSearchAPI.ts";

const searchQuery = ref("");  // 검색어
const searchProductList = ref([]);  // 검색 결과 리스트

// 검색 버튼 클릭 핸들러
const handleSearch = async () => {
  console.log("검색어:", searchQuery.value);
  // 검색 API 호출
  await searchProducts(searchQuery.value).then((result) => {
    searchProductList.value = result;  // 검색 결과 업데이트
  });
};
</script>

<template>
  <div class="w-full h-full bg-yellow-600 text-white p-6">
    <!-- 검색창 -->
    <div class="flex items-center space-x-4 mb-6">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="검색어를 입력해 주세요"
          class="flex-grow p-4 rounded-lg bg-white text-gray-800 focus:outline-none shadow-md"
      />
      <button
          class="bg-white text-yellow-600 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-100 transition"
          @click="handleSearch"
      >
        검색
      </button>
    </div>

    <!-- 검색 결과 목록 -->
    <div v-if="searchProductList.length > 0" class="space-y-4">
      <ul>
        <li v-for="item in searchProductList" :key="item.pno" class="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4 hover:shadow-xl transition">
          <div class="flex flex-col">
            <div class="text-gray-700 font-semibold">{{ item.ptitle_ko }}</div>
            <div class="text-gray-500">{{ item.price }} 원</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 검색 결과가 없을 때 -->
    <div v-else class="text-center text-gray-300 mt-8">
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일 조정 (선택 사항) */
</style>
