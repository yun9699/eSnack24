<script setup lang="ts">
import useUserStore from "../../stores/useUserStore.ts";
import { onMounted, ref } from "vue";
import { userOrder } from "../../api/orderapi/OrderAPI.ts";
import dayjs from 'dayjs';
import {useI18n} from "vue-i18n";
import {IOrderDetail} from "../../types/userTypes.ts";

const { t } = useI18n()

interface IOrderDetail {
  uno: number;
  ono: number;
  oregdate: string;
  orderItems: Array<{
    ptitle_ko: string;
    price: number;
    pfilename: string;
    oiqty: number;
  }>;
}

const initData: IOrderDetail = {
  uno: 0,
  ono: 0,
  oregdate: '',
  orderItems: [{
    ptitle_ko: '',
    price: 0,
    pfilename: '',
    oiqty: 1
  }]
};

const user = useUserStore();
const uno = user.getUno;
const userOrders = ref<IOrderDetail[]>([initData]);

onMounted(() => {
  userOrder(uno).then((res) => {
    // Format the oregdate using dayjs
    userOrders.value = res.map((order: IOrderDetail) => ({
      ...order,
      oregdate: dayjs(order.oregdate).format('YYYY-MM-DD') // 'YYYY-MM-DD'
    }));
  });
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <div class="flex items-center p-4 bg-white border-b shadow-sm">
      <div class="flex-1 text-center text-lg font-medium text-gray-800">{{ t('UserOrderList.order_tracking') }}</div>
    </div>

    <!-- 주문 목록 -->
    <div class="p-4">
      <div v-for="order in userOrders" :key="order.ono" class="mb-6 bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <!-- 주문번호 -->
          <div class="flex items-center space-x-2">
            <label class="text-gray-700 font-semibold">{{ t('UserOrderList.order_number') }}</label>
            <div class="text-gray-800 text-lg font-bold">{{ order.ono }}</div>
          </div>

          <!-- 주문날짜 -->
          <div class="text-gray-600 text-right">
            {{ t('UserOrderList.order_date') }} {{ order.oregdate }}
          </div>
        </div>

        <!-- 주문 상품 목록 -->
        <div class="p-4">
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(item) in order.orderItems.slice(0, 3)" :key="item.ptitle_ko" class="text-center">
              <img :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`" :alt="item.ptitle_ko" class="w-full h-auto rounded-lg mb-2 shadow-md" />
              <div class="text-sm font-medium text-gray-800">{{ item.ptitle_ko }}</div>
              <div class="text-lg font-bold text-gray-900">{{ item.price.toLocaleString() }}원</div>
              <div class="text-gray-600">{{ t('UserOrderList.quantity') }} {{ item.oiqty }}{{ t('UserOrderList.piece') }}</div>
            </div>
          </div>
        </div>

        <!-- 더보기 버튼 -->
        <div class="text-center mt-6">
          <router-link :to="`/order/detail/${order.ono}`">
            <button v-if="order.orderItems.length <= 3" class="bg-[#F9BB00] text-white flex items-center justify-center w-full py-3 px-5 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 shadow-md">
              {{ t('UserOrderList.view_product_details') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button v-else class="bg-[#F9BB00] text-white flex items-center justify-center w-full py-3 px-5 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 shadow-md">
              {{ t('UserOrderList.etc') }} {{ order.orderItems.length - 3 }}{{ t('UserOrderList.view_all_products') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>