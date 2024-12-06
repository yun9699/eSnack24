<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { detailOrder } from "../../api/orderapi/OrderAPI.ts";
import { IOrderItem } from "../../types/orderTypes.ts";
import { useI18n } from "vue-i18n"; // i18n import 추가

const route = useRoute();
const router = useRouter();
const { t } = useI18n(); // i18n 함수 초기화

const orderItems = ref<IOrderItem[]>([]);
const total_amount = ref<string>('');

const handleClickHome = () => {
  router.push('/');
}

onMounted(() => {
  detailOrder(Number(route.params.ono)).then((data) => {
    console.log(data);
    orderItems.value = data;
    total_amount.value = data[0].total_amount;
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-6 px-4">
    <!-- 페이지 제목 -->
    <div class="max-w-3xl mx-auto mb-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">{{ t('order_detail.page_title') }}</h1>
    </div>

    <!-- 주문 목록 -->
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <ul class="divide-y divide-gray-200">
        <!-- 리스트 아이템 -->
        <li
            v-for="item in orderItems"
            :key="item.pno"
            class="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <!-- 제품 이미지 -->
          <RouterLink :to="`/product/list/${item.pno}`" class="flex items-center space-x-4 w-full">
            <img
                :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`"
                :alt="item.ptitle_ko"
                class="w-24 h-24 object-cover rounded-lg shadow-md"
            />
            <!-- 제품 정보 -->
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-gray-800 truncate">{{ item.ptitle_ko }}</h2>
              <p class="text-sm text-gray-500">{{ t('order_detail.quantity') }}: {{ item.oiqty }}개</p>
            </div>
          </RouterLink>
          <!-- 제품 금액 (오른쪽 정렬) -->
          <div class="text-right ml-4">
            <p class="text-lg font-semibold text-gray-800">₩{{ item.price * item.oiqty }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 총 금액 -->
    <div class="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-gray-600">{{ t('order_detail.total_amount') }}</span>
        <span class="text-xl font-bold text-gray-800">{{ total_amount }}</span>
      </div>
    </div>

    <!-- 버튼 섹션 -->
    <div class="max-w-3xl mx-auto mt-6">
      <button
          @click="handleClickHome"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
      >
        {{ t('order_detail.go_home') }}
      </button>
    </div>
  </div>
</template>