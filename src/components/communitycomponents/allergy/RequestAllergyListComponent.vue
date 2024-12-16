<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Icon } from '@iconify/vue';
import { IRequestAllergy } from "../../../types/commnunityTypes.ts";
import { getRequestAllergyList } from "../../../api/commnunityAPI/requestAllergyAPI.ts";

const { t } = useI18n();

const requestAllergy = ref<IRequestAllergy[]>([]);
const page = ref(1);
const size = ref(10);
const loading = ref(false);
const hasMore = ref(true);
const openAllergyDetails = ref<number | null>(null);

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
  const currentScrollY = window.scrollY;
  page.value += 1;
  await fetchRequestAllergy();
  window.scrollTo(0, currentScrollY);
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

const toggleAllergyDetail = (cano: number) => {
  openAllergyDetails.value = openAllergyDetails.value === cano ? null : cano;
};

onMounted(() => {
  fetchRequestAllergy();
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
          :style="{ backgroundColor: '#F9BB00', color: 'white' }"
      >
        {{ t('common.report') }}
      </button>
    </div>

    <div class="flex gap-4 mb-6">
      <button
          class="flex-1 py-3 rounded-full text-lg font-medium
                 bg-gradient-to-r from-red-400 to-red-300
                 text-white
                 hover:from-red-400 hover:to-red-300
                 transition-colors duration-300"
          @click="$router.push('/request/product/list')"
      >
        {{ t('allergyReportList.allergyReportListHeader') }}
      </button>
      <button
          class="flex-1 py-3 rounded-full text-lg font-medium border border-gray-300 text-gray-600"
          @click="$router.push('/request/product/list')"
      >
        {{ t('productReportList.productReportListHeader') }}
      </button>
    </div>

    <!-- 헤더와 등록 버튼 -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">{{ t('allergyReportList.allergyReportListHeader') }}</h2>
      <button
          @click="goToRegister"
          class="px-6 py-2 rounded-full
                 bg-gradient-to-r from-red-400 to-red-300
                 text-white
                 hover:from-red-400 hover:to-red-300
                 transition-colors duration-300"
          :style="{ backgroundColor: '#F9BB00', color: 'white' }"
      >
        {{ t('allergyReportList.buttons.registerAllergyRequest') }}
      </button>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-center text-gray-500">
      {{ t('allergyReportList.loadingAllergyReports') }}
    </div>

    <!-- 리스트 -->
    <div v-else>
      <div v-if="requestAllergy.length === 0" class="text-center text-gray-400 py-6">
        {{ t('allergyReportList.noAllergyReportsMessage') }}
      </div>

      <div class="space-y-4">
        <div
            v-for="allergy in requestAllergy"
            :key="allergy.cano"
            class="border-b border-gray-200 cursor-pointer"
            @click="goToDetail(allergy.cano)"
        >
        <button
            class="w-full flex items-center py-4 hover:text-yellow-600 transition-colors"
            @click.stop="toggleAllergyDetail(allergy.cano)"
        >
            <div class="flex items-start gap-3 flex-1">
              <span
                  class="px-2 py-1 text-sm rounded-full"
                  :class="allergy.caanswer ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'"
              >
                {{ allergy.caanswer ? t('productReportList.answered') : t('productReportList.pending_answer') }}
              </span>
              <span class="text-left">{{ allergy.catitle }}</span>
            </div>
            <Icon
                :icon="openAllergyDetails === allergy.cano ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="text-xl transition-transform shrink-0"
            />
          </button>

          <div
              v-if="openAllergyDetails === allergy.cano"
              class="pb-4 text-gray-600 bg-gray-50 p-4 rounded-lg"
          >
            <p class="text-gray-700 mt-2">
              {{ t('allergyReportList.allergyReportLabels.content') }}: {{ allergy.caallergy }}
            </p>
            <p class="text-xs text-gray-500 mt-2">
              {{ t('allergyReportList.allergyReportLabels.registrationDate') }}: {{ formatDate(allergy.caregdate) }}
            </p>

            <div v-if="allergy.caanswer" class="mt-4 p-4 bg-white rounded">
              <div class="font-bold mb-2">{{ t('allergyReportList.allergyReportLabels.answer') }}</div>
              <div class="mb-2">{{ allergy.caanswer }}</div>
              <div class="text-sm text-gray-500">
                {{ t('allergyReportList.allergyReportLabels.modificationDate') }}: {{ formatDate(allergy.camoddate) }}
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
          :style="{ backgroundColor: '#F9BB00', color: 'white' }"
      >
        {{ t('allergyReportList.buttons.loadMoreAllergyReports') }}
      </button>
    </div>
  </div>
</template>
