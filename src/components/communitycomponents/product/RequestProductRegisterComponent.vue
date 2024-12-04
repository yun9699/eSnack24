<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {IRequestProduct} from "../../../types/commnunityTypes.ts";
import {registerRequestProduct} from "../../../api/commnunityAPI/requestProductAPI.ts";


const cptitle = ref("");
const cpproduct = ref("");
const submitting = ref(false);
const router = useRouter();
const route = useRoute();


const submitRequestProduct = async () => {
  if (!cptitle.value.trim() || !cpproduct.value.trim()) {
    return;
  }

  const newProduct: IRequestProduct = {
    cptitle: cptitle.value.trim(),
    cpproduct: cpproduct.value.trim()
  };

  try {
    submitting.value = true;
    await registerRequestProduct(newProduct);

    // 폼 초기화
    cptitle.value = "";
    cpproduct.value = "";

    await router.push(`/request/product/list`);
  } catch (error) {
    console.log(error.message);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  submitRequestProduct();
});
</script>


<template>
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <h2 class="text-lg font-semibold">상품 신고 작성</h2>
    </div>

    <div class="mb-4">
      <textarea
          v-model="cptitle"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="제목 입력"
      ></textarea>
    </div>

    <div class="mb-4">
      <textarea
          v-model="cpproduct"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="신고 내용 입력"
      ></textarea>
    </div>

    <button
        :disabled="submitting"
        @click="submitRequestProduct"
        class="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
    >
      {{ submitting ? '등록 중...' : '등록하기' }}
    </button>
  </div>
</template>
