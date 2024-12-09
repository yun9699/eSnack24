<script setup lang="ts">
import { ref } from "vue";
import { searchProducts } from "../../api/searchAPI/productSearchAPI.ts";
import {ISearch} from "../../types/SearchTypes.ts";
import { useI18n } from "vue-i18n"; // i18n import 추가

const searchQuery = ref("");  // 검색어
const searchProductList =  ref<ISearch[]>([]); // 검색 결과 리스트


const { t } = useI18n(); // i18n 함수 초기화

// 검색 버튼 클릭 핸들러
const handleSearch = async () => {
  console.log("검색어:", searchQuery.value);
  // 검색 API 호출
  const result: ISearch[] = await searchProducts(searchQuery.value);
  searchProductList.value = result;  // 검색 결과 업데이트
};
</script>

<template>
  <div class="w-full h-full bg-yellow-600 text-white p-6">
    <!-- 검색창 -->
    <div class="flex items-center space-x-4 mb-6">
      <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('search_page.placeholder')"
      class="flex-grow p-4 rounded-lg bg-white text-gray-800 focus:outline-none shadow-md"
      />
      <button
          class="bg-white text-yellow-600 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-100 transition"
          @click="handleSearch"
      >
        {{ t('search_page.search_button') }}  <!-- JSON에서 텍스트 가져오기 -->
      </button>
    </div>

    <!-- 검색 결과 목록 -->
    <div v-if="searchProductList.length > 0" class="space-y-4">
      <ul>
        <li v-for="item in searchProductList" :key="item.pno" class="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4 hover:shadow-xl transition">
          <RouterLink :to="`/product/list/${item.pno}`" class="btn btn-success">
            <div class="flex flex-col">
              <div class="text-gray-700 font-semibold">{{ item.ptitle_ko }}</div>
              <div class="text-gray-500">{{ item.price }} 원</div>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- 검색 결과가 없을 때 -->
    <div v-else class="text-center text-gray-300 mt-8">
      <p>{{ t('search_page.no_results') }}</p> <!-- JSON에서 텍스트 가져오기 -->
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일 조정 (선택 사항) */
</style>