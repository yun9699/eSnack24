<script setup lang="ts">
import useUserStore from "../../stores/useUserStore.ts";
import { onMounted, ref } from "vue";
import { userOrder } from "../../api/orderapi/OrderAPI.ts";
import dayjs from 'dayjs';
import {IOrderDetail} from "../../types/userTypes.ts"; // Import dayjs



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
    userOrders.value = res.map((order) => ({
      ...order,
      oregdate: dayjs(order.oregdate).format('YYYY-MM-DD') // 'YYYY-MM-DD'
    }));
  });
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <div class="flex items-center p-4 bg-white border-b">
      <div class="flex-1 text-center text-lg font-medium">주문/배송 조회</div>
    </div>

    <!-- 주문 목록 -->
    <div class="p-4">
      <div v-for="order in userOrders" :key="order.ono" class="mb-6">
        <!-- 주문번호 -->
        <label>
          주문번호
        </label>
        {{ order.ono }}

        <!-- 주문 상품 목록 -->
        <div class="p-4">
          <!-- 주문날짜 텍스트 오른쪽 정렬 -->
          <div class="text-gray-600 mb-4 text-right">
            주문날짜 {{ order.oregdate }}
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(item) in order.orderItems.slice(0, 3)" :key="item.ptitle_ko" class="text-center">
              <img :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`" :alt="item.ptitle_ko" class="w-full h-auto rounded-lg mb-2" />
              <div class="text-sm font-medium">{{ item.ptitle_ko }}</div>
              <div class="text-lg font-bold">{{ item.price.toLocaleString() }}원</div>
              <div class="text-gray-600">수량 {{ item.oiqty }}개</div>
            </div>
          </div>
        </div>

        <!-- 더보기 버튼 -->
        <div class="text-center mt-4">
          <router-link :to="`/order/detail/${order.ono}`">
            <button v-if="order.orderItems.length <= 3" class="bg-blue-500 text-white flex items-center justify-center w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            상품 자세히 보기
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button v-else class="bg-blue-500 text-white flex items-center justify-center w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            외 {{ order.orderItems.length - 3 }}건 전체상품 보기
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>