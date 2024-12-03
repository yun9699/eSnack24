<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {IRequestAllergy} from "../../../types/commnunityTypes.ts";
import {getRequestAllergyDetail, editRequestAllergy, deleteRequestAllergy} from "../../../api/commnunityAPI/requestAllergyAPI.ts";

const route = useRoute();
const router = useRouter();
const cano = ref<number | null>(null);
const requestAllergy = ref<IRequestAllergy | null>(null);
const submitting = ref(false);
const loading = ref(false);

const catitle = ref("");
const caallergy = ref("");

const fetchRequestAllergyDetail = async () => {
  if (!cano.value) {
    console.error("리스트 번호가 없습니다.");
    return;
  }

  loading.value = true;
  try {
    const data = await getRequestAllergyDetail(cano.value);
    requestAllergy.value = data;
    catitle.value = data.catitle;
    caallergy.value = data.caallergy;
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

const editAllergy = async () => {
  if (!cano.value || !catitle.value.trim() || !caallergy.value.trim()) {
    return;
  }

  try {
    submitting.value = true;
    await editRequestAllergy(cano.value, {
      catitle: catitle.value.trim(),
      caallergy: caallergy.value.trim(),
    });
    await router.push(`/request/allergy/detail/${cano.value}`);
  } catch (error: any) {
    console.error(error.message);
  } finally {
    submitting.value = false;
  }
};

const deleteAllergy = async () => {
  if (!cano.value) {
    console.error("리스트 번호가 없습니다.");
    return;
  }

  try {
    submitting.value = true;
    await deleteRequestAllergy(cano.value);
    await router.push(`/request/allergy/list`);
  } catch (error: any) {
    console.error("삭제 중 오류가 발생했습니다.");
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  cano.value = Number(route.params.cano);
  fetchRequestAllergyDetail();
});

</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-800">수정</h1>
    </div>

    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else>
      <div v-if="requestAllergy" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">제목</label>
          <textarea
              v-model="catitle"
              rows="4"
              class="w-full mt-1 p-2 border rounded-lg"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">신고 내용</label>
          <textarea
              v-model="caallergy"
              rows="4"
              class="w-full mt-1 p-2 border rounded-lg"
          ></textarea>
        </div>

        <button
            :disabled="submitting"
            @click="editAllergy"
            class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ submitting ? "수정 중..." : "수정하기" }}
        </button>

        <div class="mt-4 text-right">
          <button
              @click="deleteAllergy"
              class="px-4 py-2 text-sm text-red-600 bg-red-200 rounded-lg hover:bg-red-300 disabled:opacity-50"
              :disabled="submitting"
          >
            삭제
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">데이터를 불러오는 중입니다...</div>
    </div>
  </div>

</template>
