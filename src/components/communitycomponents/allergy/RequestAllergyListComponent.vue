
<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router";
import {IRequestAllergy} from "../../../types/commnunityTypes.ts";
import {getRequestAllergyList} from "../../../api/commnunityAPI/requestAllergyAPI.ts";


const requestAllergy = ref<IRequestAllergy[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);

const router = useRouter();

const fetchRequestAllergy = async () => {

  loading.value = true;
  try {
    const data = await getRequestAllergyList(page.value, size.value);

    requestAllergy.value.push(...data.list);

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
  await fetchRequestAllergy(); // 데이터를 가져옴
  window.scrollTo(0, currentScrollY); // 스크롤 위치 복원
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const goToDetail = (cano) => {
  console.log("cano 값:", cano);
  router.push(`/request/allergy/detail/${cano}`);
};

const goToRegister = () => {
  router.push(`/request/allergy/add`);
};

onMounted(() => {
  fetchRequestAllergy();
});

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">

    <button
        class="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-300"
        @click="$router.push('/request/product/list')"
    >
      상품 신고
    </button>

    <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">알러지 신고 리스트</h1>

    <button
        @click="goToRegister"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      알러지 요청 등록
    </button>


    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else>
      <div v-if="requestAllergy.length === 0" class="text-center text-gray-400 py-6">리스트가 없습니다.</div>
      <ul class="space-y-4">
        <li
            v-for="allergy in requestAllergy"
            :key="allergy.cano"
            class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            @click="goToDetail(allergy.cano)"
        >
          <h3 class="text-lg font-semibold text-gray-700">번호: {{ allergy.cano }}</h3>
          <p class="text-gray-700 mt-2">제목: {{ allergy.catitle }}</p>
          <p class="text-gray-700 mt-2">신고 내용: {{ allergy.caallergy }}</p>
          <p class="text-gray-700 mt-2">답변: {{ allergy.caanswer }}</p>
          <p class="text-xs text-gray-500 mt-2">등록일: {{ formatDate(allergy.caregdate) }}</p>
          <p class="text-xs text-gray-500">수정일: {{ formatDate(allergy.camoddate) }}</p>
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

