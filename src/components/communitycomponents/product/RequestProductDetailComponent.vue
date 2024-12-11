<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {IRequestProduct} from "../../../types/commnunityTypes.ts";
import {getRequestProductDetail} from "../../../api/commnunityAPI/requestProductAPI.ts";

const { t } = useI18n();
const router = useRouter();
const cpno = ref<number | null>(null);
const requestProduct = ref<IRequestProduct[] | null>(null);
const loading = ref(false);
const route = useRoute();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const fetchRequestProductDetail = async () => {
  if (!cpno.value) {
    console.error("cpno 가 없습니다.");
    return;
  }

  loading.value = true;
  try {
    requestProduct.value = await getRequestProductDetail(cpno.value);
  } catch (error: any) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

const goToEditPage = () => {
  if (cpno.value) {
    router.push(`/request/product/edit/${cpno.value}`);
  }
};

const goToListPage = () => {
  router.push('/request/product/list');
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
        {{ t('productReportDetail.productReportDetailHeader') }}
      </h1>
    </div>

    <div v-if="loading" class="text-center text-gray-500">
      {{ t('productReportDetail.loadingProductReportDetail') }}
    </div>
    <div v-else>
      <div v-if="requestProduct" class="space-y-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-700">
            {{ t('productReportDetail.productReportDetailLabels.listNumber') }}: {{ requestProduct.cpno }}
          </h2>
        </div>
        <div>
          <p class="text-gray-700">
            {{ t('productReportDetail.productReportDetailLabels.title') }}: {{ requestProduct.cptitle }}
          </p>
        </div>
        <div>
          <p class="text-gray-700">
            {{ t('productReportDetail.productReportDetailLabels.content') }}: {{ requestProduct.cpproduct }}
          </p>
        </div>
        <div>
          <p class="text-gray-700">
            {{ t('productReportDetail.productReportDetailLabels.answer') }}: {{ requestProduct.cpanswer }}
          </p>
        </div>

        <div class="text-xs text-gray-500">
          <p>
            {{ t('productReportDetail.productReportDetailLabels.registrationDate') }}:
            {{ formatDate(requestProduct.cpregdate) }}
          </p>
          <p>
            {{ t('productReportDetail.productReportDetailLabels.modificationDate') }}:
            {{ formatDate(requestProduct.cpmoddate) }}
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-6">
        {{ t('productReportDetail.productReportDetailLabels.noProductReportDetails') }}
      </div>
    </div>

    <!-- 수정 버튼 -->
    <div class="flex gap-4 mt-4">
      <button
          @click="goToEditPage"
          class="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
      >
        {{ t('productReportDetail.buttons.editProductReportDetail') }}
      </button>
      <button
          @click="goToListPage"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        {{ t('productReportDetail.buttons.goBackToProductReportList') }}
      </button>
    </div>
  </div>
</template>