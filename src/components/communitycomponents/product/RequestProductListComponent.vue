
<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router";
import {IRequestProduct} from "../../../types/commnunityTypes.ts";
import {getRequestProductList} from "../../../api/commnunityAPI/requestProductAPI.ts";


const requestProduct = ref<IRequestProduct[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);

const router = useRouter();

const fetchRequestProduct = async () => {

  loading.value = true;
  try {
    const data = await getRequestProductList(page.value, size.value);

    requestProduct.value.push(...data.list);

    if (data.list.length < size.value) {
      hasMore.value = false;
    }

  } catch (error) {
    console.error("리스트를 가져오는 중 오류 발생:", error);
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  const currentScrollY = window.scrollY; // 현재 스크롤 위치 저장
  page.value += 1; // 다음 페이지 요청
  await fetchRequestProduct(); // 데이터를 가져옴
  window.scrollTo(0, currentScrollY); // 스크롤 위치 복원
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const goToDetail = (cpno) => {
  console.log("cpno 값:", cpno);
  router.push(`/request/product/detail/${cpno}`);
};

const goToRegister = () => {
  router.push(`/request/product/add`);
};

onMounted(() => {
  fetchRequestProduct();
});

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <button
        class="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-400"
        @click="$router.push('/request/allergy/list')"
    >
      알러지 신고
    </button>
    <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">상품 신고 리스트</h1>

    <button
        @click="goToRegister"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      상품 요청 등록
    </button>

    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else>
      <div v-if="requestProduct.length === 0" class="text-center text-gray-400 py-6">리스트가 없습니다.</div>
      <ul class="space-y-4">
        <li
            v-for="product in requestProduct"
            :key="product.cpno"
            class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            @click="goToDetail(product.cpno)"
        >
          <h3 class="text-lg font-semibold text-gray-700">번호: {{ product.cpno }}</h3>
          <p class="text-gray-700 mt-2">제목: {{ product.cptitle }}</p>
          <p class="text-gray-700 mt-2">신고 내용: {{ product.cpproduct }}</p>
          <p class="text-gray-700 mt-2">답변: {{ product.cpanswer }}</p>
          <p class="text-xs text-gray-500 mt-2">등록일: {{ formatDate(product.cpregdate) }}</p>
          <p class="text-xs text-gray-500">수정일: {{ formatDate(product.cpmoddate) }}</p>
        </li>
      </ul>
      <button
          v-if="hasMore"
          @click.prevent="loadMore"
          class="w-full mt-6 py-2 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
      >
        더 보기
      </button>
    </div>
  </div>
</template>

