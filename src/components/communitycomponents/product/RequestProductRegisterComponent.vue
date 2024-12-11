<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {IRequestProduct} from "../../../types/commnunityTypes.ts";
import {registerRequestProduct} from "../../../api/commnunityAPI/requestProductAPI.ts";

const { t } = useI18n();

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
</script>

<template>
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <h2 class="text-lg font-semibold">
        {{ t('productReport.productReportHeader') }}
      </h2>
    </div>

    <div class="mb-4">
      <textarea
          v-model="cptitle"
          rows="4"
          class="w-full p-2 border rounded-lg"
          :placeholder="t('productReport.placeholders.productReportTitle')"
      ></textarea>
    </div>

    <div class="mb-4">
      <textarea
          v-model="cpproduct"
          rows="4"
          class="w-full p-2 border rounded-lg"
          :placeholder="t('productReport.placeholders.productReportContent')"
      ></textarea>
    </div>

    <button
        :disabled="submitting"
        @click="submitRequestProduct"
        class="w-full py-2 bg-gradient-to-r from-red-400 to-red-300 text-white rounded-lg hover:bg-gray-300 disabled:opacity-50"
    >
      {{ submitting
        ? t('productReport.buttons.submitProductReport.loading')
        : t('productReport.buttons.submitProductReport.default')
      }}
    </button>
  </div>
</template>