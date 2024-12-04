<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {registerRequestAllergy} from "../../../api/commnunityAPI/requestAllergyAPI.ts";
import {IRequestAllergy} from "../../../types/commnunityTypes.ts";


const catitle = ref("");
const caallergy = ref("");
const submitting = ref(false);
const router = useRouter();
const route = useRoute();


const submitRequestAllergy = async () => {
  if (!catitle.value.trim() || !caallergy.value.trim()) {
    return;
  }

  const newAllergy: IRequestAllergy = {
    catitle: catitle.value.trim(),
    caallergy: caallergy.value.trim()
  };

  try {
    submitting.value = true;
    await registerRequestAllergy(newAllergy);

    // 폼 초기화
    catitle.value = "";
    caallergy.value = "";

    await router.push(`/request/allergy/list`);
  } catch (error) {
    console.log(error.message);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  submitRequestAllergy();
});
</script>


<template>
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <h2 class="text-lg font-semibold">알러지 신고 작성</h2>
    </div>

    <div class="mb-4">
      <textarea
          v-model="catitle"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="제목 입력"
      ></textarea>
    </div>

    <div class="mb-4">
      <textarea
          v-model="caallergy"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="신고 내용 입력"
      ></textarea>
    </div>

    <button
        :disabled="submitting"
        @click="submitRequestAllergy"
        class="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
    >
      {{ submitting ? '등록 중...' : '등록하기' }}
    </button>
  </div>
</template>
