<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
import {IRequestAllergy} from "../../../types/commnunityTypes.ts";
import {getRequestAllergyDetail} from "../../../api/commnunityAPI/requestAllergyAPI.ts";


const router = useRouter();
const cano = ref<number | null>(null);
const requestAllergy = ref<IRequestAllergy[] | null>(null);
const loading = ref(false);
const route = useRoute();



const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};


const fetchRequestAllergyDetail = async () => {
  if (!cano.value) {
    console.error("cano 가 없습니다.");
    return;
  }

  loading.value = true;
  try {
    requestAllergy.value = await getRequestAllergyDetail(cano.value);
  } catch (error: any) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

const goToEditPage = () => {
  if (cano.value) {
    router.push(`/request/allergy/edit/${cano.value}`);
  }
};

const goToListPage = () => {
  router.push('/request/allergy/list');
};


onMounted(() => {
  cano.value = Number(route.params.cano);
  fetchRequestAllergyDetail();
});
</script>




<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-800">리스트 상세 정보</h1>
    </div>

    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else>
      <div v-if="requestAllergy" class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-700">리스트 번호: {{ requestAllergy.cano }}</h2>
        </div>
        <div>
          <p class="text-gray-700">제목: {{ requestAllergy.catitle }}</p>
        </div>
        <div>
          <p class="text-gray-700">내용: {{ requestAllergy.caallergy }}</p>
        </div>
        <div>
          <p class="text-gray-700">답변: {{ requestAllergy.caanswer }}</p>
        </div>

        <div class="text-xs text-gray-500">
          <p>등록일: {{ formatDate(requestAllergy.caregdate) }}</p>
          <p>수정일: {{ formatDate(requestAllergy.camoddate) }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">리스트 상세 정보를 불러올 수 없습니다.</div>
    </div>

    <!-- 수정 버튼 -->
    <div class="flex gap-4 mt-4">
      <button
          @click="goToEditPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        수정
      </button>
      <button
          @click="goToListPage"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        리스트로 돌아가기
      </button>
    </div>
  </div>
</template>

