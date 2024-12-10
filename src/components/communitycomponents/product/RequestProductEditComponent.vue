<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  deleteRequestProduct,
  editRequestProduct,
  getRequestProductDetail
} from "../../../api/commnunityAPI/requestProductAPI.ts";
import {IRequestProduct} from "../../../types/commnunityTypes.ts";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const cpno = ref<number | null>(null);
const requestProduct = ref<IRequestProduct | null>(null);
const submitting = ref(false);
const loading = ref(false);

const cptitle = ref("");
const cpproduct = ref("");

const fetchRequestProductDetail = async () => {
  if (!cpno.value) {
    console.error("리스트 번호가 없습니다.");
    return;
  }

  loading.value = true;
  try {
    const data = await getRequestProductDetail(cpno.value);
    requestProduct.value = data;
    cptitle.value = data.cptitle;
    cpproduct.value = data.cpproduct;
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

const editProduct = async () => {
  if (!cpno.value || !cptitle.value.trim() || !cpproduct.value.trim()) {
    return;
  }

  try {
    submitting.value = true;
    await editRequestProduct(cpno.value, {
      cptitle: cptitle.value.trim(),
      cpproduct: cpproduct.value.trim(),
    });
    await router.push(`/request/product/detail/${cpno.value}`);
  } catch (error: any) {
    console.error(error.message);
  } finally {
    submitting.value = false;
  }
};

const deleteProduct = async () => {
  if (!cpno.value) {
    console.error("리스트 번호가 없습니다.");
    return;
  }

  try {
    submitting.value = true;
    await deleteRequestProduct(cpno.value);
    await router.push(`/request/product/list`);
  } catch (error: any) {
    console.error("삭제 중 오류가 발생했습니다.");
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  cpno.value = Number(route.params.cpno);
  fetchRequestProductDetail();
});

</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-800">
        {{ t('productReportEdit.productReportEditHeader') }}
      </h1>
    </div>

    <div v-if="loading" class="text-center text-gray-500">
      {{ t('productReportEdit.loadingProductReportEdit') }}
    </div>
    <div v-else>
      <div v-if="requestProduct" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('productReportEdit.productReportEditLabels.title') }}
          </label>
          <textarea
              v-model="cptitle"
              rows="4"
              class="w-full mt-1 p-2 border rounded-lg"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('productReportEdit.productReportEditLabels.content') }}
          </label>
          <textarea
              v-model="cpproduct"
              rows="4"
              class="w-full mt-1 p-2 border rounded-lg"
          ></textarea>
        </div>

        <button
            :disabled="submitting"
            @click="editProduct"
            class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ submitting
            ? t('productReportEdit.productReportEditButtons.edit.loading')
}}
        </button>

        <div class="mt-4 text-right">
          <button
              @click="deleteProduct"
              class="px-4 py-2 text-sm text-red-600 bg-red-200 rounded-lg hover:bg-red-300 disabled:opacity-50"
              :disabled="submitting"
          >
            {{ t('productReportEdit.productReportEditButtons.delete') }}
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">
        {{ t('productReportEdit.noProductReportData') }}
      </div>
    </div>
  </div>
</template>