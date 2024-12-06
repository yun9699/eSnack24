<script setup lang="ts">
import PaypalComponent from "../paypalcomponents/PaypalComponent.vue";
import { onMounted, provide, ref } from "vue";
import { useRoute } from "vue-router";
import { viewOrder } from "../../api/orderapi/OrderAPI.ts";
import TossComponent from "../tosscomponents/TossComponent.vue";
import { getExchangeRate } from "../../api/exchangerateapi/exchangeRateAPI.ts";
import {useI18n} from "vue-i18n";
import {IOrder} from "../../types/orderTypes.ts";

const route = useRoute();

const { t } = useI18n()

const init: IOrder = {
  currency: "USD",
  total_amount: 0,
  total_amount_krw: 0,
  total_amount_usd: 0
};

const data = ref(init);
const exchangeRate = ref(0);

// 지원하는 통화 리스트
const currencies = ["KRW", "USD"];

// 드롭다운 열림 상태 관리
const isDropdownOpen = ref(false);

const isTossOpen = ref(false);

onMounted(() => {

  getExchangeRate(data.value.currency).then((res) => {

    console.log(res);
    exchangeRate.value = Number(res);

    viewOrder(Number(route.params.ono)).then((order) => {

      console.log(order);
      data.value.currency = order.currency;
      data.value.total_amount_krw = order.total_amount;
      data.value.total_amount_usd = parseFloat((order.total_amount * exchangeRate.value).toFixed(2));
      data.value.total_amount = parseFloat((order.total_amount * exchangeRate.value).toFixed(2));


      isTossOpen.value = true;
    });
  })

});

provide("ono", route.params.ono);
provide("data", data);

// 통화 변경 함수
const changeCurrency = (newCurrency: string) => {

  data.value.currency = newCurrency;

  if (newCurrency === "USD") {

    data.value.total_amount = data.value.total_amount_usd;
  } else {
    data.value.total_amount = data.value.total_amount_krw;
  }

  isDropdownOpen.value = false; // 드롭다운 닫기
};
</script>

<template>
  <div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ t('order_confirmation.title') }}</h2>

    <!-- currency와 total_amount만 보여주는 부분 -->
    <div class="space-y-4">
      <div class="flex justify-between items-center p-4 bg-white rounded-lg shadow-md relative">
        <span class="text-lg font-medium text-gray-700">{{ t('order_confirmation.currency') }}</span>
        <div class="relative">
          <button
              class="p-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-300"
              @click="isDropdownOpen = !isDropdownOpen"
          >
            {{ data.currency }}
          </button>

          <!-- 드롭다운 메뉴 -->
          <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-md z-10"
          >
            <ul class="py-1">
              <li
                  v-for="currency in currencies"
                  :key="currency"
                  @click="changeCurrency(currency)"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {{ currency }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
        <span class="text-lg font-medium text-gray-700">{{ t('order_confirmation.total_amount') }}</span>
        <span class="text-lg font-bold text-gray-900">{{ data.total_amount }}</span>
      </div>
    </div>

    <!-- 결제 컴포넌트 -->
    <div class="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md text-center">
      <p class="text-base text-gray-600 mb-4">
        {{ t('order_confirmation.paypal_info') }} <span class="font-semibold text-gray-800">USD</span>
      </p>
      <PaypalComponent class="w-full max-w-sm mx-auto" />

      <TossComponent v-if="isTossOpen == true" class="w-full max-w-sm mx-auto" />
    </div>
  </div>
</template>