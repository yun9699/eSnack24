<script setup lang="ts">
import {inject, onMounted, Ref, ref} from 'vue';
import { readAgreementDoc } from "../../api/UserAPI/userRegisterAPI.ts";

const isAgree = inject<Ref<boolean>>("isAgree");


const terms = ref(null);

onMounted(async () => {
  terms.value = await readAgreementDoc();
});
</script>

<template>
  <div v-if="terms" class="p-6">
    <div class="max-h-[400px] overflow-y-auto">
      <div v-for="(section, index) in terms.terms" :key="index" class="mb-6">
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ section.description_Section1 }}</h2>
          <p class="text-gray-700">{{ section.details }}</p>
          <div v-if="Array.isArray(section.details)" class="mt-4">
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="(detail, idx) in section.details" :key="idx" class="text-gray-700">
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-lg font-medium text-gray-600">로딩 중...</p>
  </div>

  <!-- 체크박스 -->
  <div class="mt-4 flex items-center justify-end">
    <label for="agreement-checkbox" class="text-gray-700">
      모든 내용을 확인하였으며, 동의합니다.
    </label>
    <input
        id="agreement-checkbox"
        type="checkbox"
        v-model="isAgree"
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
    />
  </div>
</template>

<style scoped>
/* Optionally, add some custom styles */
</style>
