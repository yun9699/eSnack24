<script setup lang="ts">
import { ref } from "vue";
import { searchProducts } from "../../api/searchAPI/productSearchAPI.ts";
import { ISearch } from "../../types/SearchTypes.ts";
import { useI18n } from "vue-i18n";

const searchQuery = ref("");
const searchProductList = ref<ISearch[]>([]);
const { t } = useI18n();

const handleSearch = async () => {
  console.log("검색어:", searchQuery.value);
  const result: ISearch[] = await searchProducts(searchQuery.value);
  searchProductList.value = result;
};
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- 검색창 영역 - 노란색 배경 -->
    <div class="w-full" style="background-color: #F9BB00">
      <div class="flex items-center justify-center p-4">
        <div class="relative w-full max-w-xl">
          <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('ProductSearch.placeholder')"
              class="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none shadow-sm"
              @input="handleSearch"
          />
          <button
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
              @click="handleSearch"

          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 검색 결과 영역 - 검색어가 있을 때만 표시 -->
    <div v-if="searchQuery.trim() !== ''" class="flex-grow bg-white">
      <!-- 검색 결과 목록 -->
      <div v-if="searchProductList.length > 0" class="mt-2 mb-20">
        <div>
          <RouterLink
              v-for="item in searchProductList"
              :key="item.pno"
              :to="`/product/list/${item.pno}`"
              class="block border-b last:border-b-0 px-4 py-3 hover:bg-gray-50"
          >
            <div class="text-gray-800">{{ item.ptitle_ko }}</div>
            <div class="text-sm text-gray-500">{{ item.price }}원</div>
          </RouterLink>
        </div>
      </div>

      <!-- 검색 결과가 없을 때 -->
      <div v-else-if="searchQuery" class="text-center p-4 text-gray-600 mb-20">
        {{ t('ProductSearch.no_results') }}
      </div>
    </div>
  </div>
</template>


<style scoped>
.relative {
  position: relative;
}

input {
  padding-right: 2.5rem;
}

button:focus {
  outline: none;
}
</style>
