<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Icon } from '@iconify/vue';
import {IRequestProduct} from "../../../types/commnunityTypes.ts";
import {getRequestProductList} from "../../../api/commnunityAPI/requestProductAPI.ts";

const { t } = useI18n();

const requestProduct = ref<IRequestProduct[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);
const openProductDetails = ref<number | null>(null);

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
  const currentScrollY = window.scrollY;
  page.value += 1;
  await fetchRequestProduct();
  window.scrollTo(0, currentScrollY);
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

const toggleProductDetail = (cpno: number) => {
  openProductDetails.value = openProductDetails.value === cpno ? null : cpno;
};

onMounted(() => {
  fetchRequestProduct();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 상단 탭 -->
    <div class="flex gap-4 mb-6">
      <button
          class="px-8 py-2 rounded-full text-lg font-medium border border-gray-300 text-gray-600"
          @click="$router.push('/cs/faq')"
      >
        FAQ
      </button>
      <button
          class="px-8 py-2 rounded-full text-lg font-medium border border-gray-300 text-gray-600"
          @click="$router.push('/cs/qna')"
      >
        QNA
      </button>
      <button
          class="px-8 py-2 rounded-full text-lg font-medium
                 bg-gradient-to-r from-red-400 to-red-300
                 text-white
                 hover:from-red-400 hover:to-red-300
                 transition-colors duration-300"
      >
        {{ t('common.report') }}
      </button>
    </div>

    <div class="flex gap-4 mb-6">
      <button
          class="flex-1 py-3 rounded-full text-lg font-medium border border-gray-300 text-gray-600"
          @click="$router.push('/request/allergy/list')"
      >
        {{ t('allergyReportList.allergyReportListHeader') }}
      </button>
      <button
          class="flex-1 py-3 rounded-full text-lg font-medium
                 bg-gradient-to-r from-red-400 to-red-300
                 text-white
                 hover:from-red-400 hover:to-red-300
                 transition-colors duration-300"
          @click="$router.push('/request/product/list')"
      >
        {{ t('productReportList.productReportListHeader') }}
      </button>
    </div>

    <!-- 헤더와 등록 버튼 -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">{{ t('productReportList.productReportListHeader') }}</h2>
      <button
          @click="goToRegister"
          class="px-6 py-2 rounded-full
                 bg-gradient-to-r from-red-400 to-red-300
                 text-white
                 hover:from-red-400 hover:to-red-300
                 transition-colors duration-300"
      >
        {{ t('productReportList.buttons.registerProductRequest') }}
      </button>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center text-gray-500">
      {{ t('productReportList.loadingProductReports') }}
    </div>

    <!-- 리스트 -->
    <div v-else>
      <div v-if="requestProduct.length === 0" class="text-center text-gray-400 py-6">
        {{ t('productReportList.noProductReportsMessage') }}
      </div>

      <div class="space-y-4">
        <div
            v-for="product in requestProduct"
            :key="product.cpno"
            class="border-b border-gray-200 cursor-pointer"
            @click="goToDetail(product.cpno)"
        >
          <button
              class="w-full flex items-center py-4 hover:text-yellow-600 transition-colors"
              @click.stop="toggleProductDetail(product.cpno)"
          >
            <div class="flex items-start gap-3 flex-1">
            <span
                class="px-2 py-1 text-sm rounded-full"
                :class="product.cpanswer ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'"
            >
                {{ product.cpanswer ? t('productReportList.answered') : t('productReportList.pending_answer') }}
            </span>
              <span class="text-left">{{ product.cptitle }}</span>
            </div>
            <Icon
                :icon="openProductDetails === product.cpno ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="text-xl transition-transform shrink-0"
            />
          </button>

          <div
              v-if="openProductDetails === product.cpno"
              class="pb-4 text-gray-600 bg-gray-50 p-4 rounded-lg"
          >
            <p class="text-gray-700 mt-2">
              {{ t('productReportList.productReportLabels.content') }}: {{ product.cpproduct }}
            </p>
            <p class="text-xs text-gray-500 mt-2">
              {{ t('productReportList.productReportLabels.registrationDate') }}: {{ formatDate(product.cpregdate) }}
            </p>

            <div v-if="product.cpanswer" class="mt-4 p-4 bg-white rounded">
              <div class="font-bold mb-2">{{ t('productReportList.productReportLabels.answer') }}</div>
              <div class="mb-2">{{ product.cpanswer }}</div>
              <div class="text-sm text-gray-500">
                {{ t('productReportList.productReportLabels.modificationDate') }}: {{ formatDate(product.cpmoddate) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 더 보기 버튼 -->
      <button
          v-if="hasMore"
          @click.prevent="loadMore"
          class="w-full mt-6 py-2 rounded-full text-lg font-bold
                 bg-gradient-to-r from-red-400 to-red-300
                 text-white
                 hover:from-red-400 hover:to-red-300
                 transition-colors duration-300"
      >
        {{ t('productReportList.buttons.loadMoreProductReports') }}
      </button>
    </div>
  </div>
</template>

