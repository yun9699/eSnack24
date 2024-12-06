<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";  // i18n import 추가

const route = useRoute();
const router = useRouter();

const { t } = useI18n();  // i18n 함수 초기화

const ono = route.params.ono;

const handleClickDetail = () => {
  router.push(`/order/detail/${ono}`);
};

const handleClickHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6">
    <!-- 카드 -->
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
      <!-- 성공 아이콘 -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2l4-4M7 12l-4-4m0 0l4 4m0 0l4 4m2-4l4-4"
            />
          </svg>
        </div>
      </div>

      <!-- 성공 메시지 -->
      <h1 class="text-center text-2xl font-bold text-gray-800 mb-4">{{ t('order_complete.success_message') }}</h1>
      <p class="text-center text-gray-600 mb-6">
        {{ t('order_complete.order_number') }}: <span class="font-semibold text-gray-800">{{ ono }}</span><br />
        {{ t('order_complete.payment_message') }}
      </p>

      <!-- 버튼 그룹 -->
      <div class="flex flex-col space-y-4">
        <button
            @click="handleClickDetail"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
        >
          {{ t('order_complete.view_order_details') }}
        </button>
        <button
            @click="handleClickHome"
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
        >
          {{ t('order_complete.go_home') }}
        </button>
      </div>
    </div>

    <!-- 하단 여백 -->
    <div class="mt-6 text-sm text-gray-500">
      더 궁금한 점이 있으신가요? <a href="/help" class="text-blue-500 underline">{{ t('order_complete.help_center') }}</a>
    </div>
  </div>
</template>