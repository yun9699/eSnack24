<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {detailOrder} from "../../api/orderapi/OrderAPI.ts";
  import {IOrderItem} from "../../types/orderTypes.ts";

  const route = useRoute();
  const router = useRouter();

  const orderItems = ref<IOrderItem[]>([]);

  const total_amount = ref<string>('');

  const handleClickHome = () => {

    router.push('/');
  }

  onMounted(() => {

    detailOrder((Number)(route.params.ono)).then((data) => {

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
      <h1 class="text-2xl font-bold text-gray-800 text-center">주문 상세</h1>
    </div>

    <!-- 주문 목록 -->
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <ul class="divide-y divide-gray-200">
        <!-- 리스트 아이템 -->
        <li
            v-for="item in orderItems"
            :key="item.pno"
            class="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <!-- 제품 이미지 -->
          <img
              :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/${item.pfilename}`"
              alt="제품 이미지"
              class="w-20 h-20 object-cover rounded-md shadow-sm"
          />
          <!-- 제품 정보 -->
          <div class="flex-1 ml-4">
            <h2 class="text-lg font-semibold text-gray-800">{{ item.ptitle_ko }}</h2>
            <p class="text-sm text-gray-500">수량: {{item.oiqty}}개</p>
          </div>
          <!-- 제품 금액 -->
          <div class="text-right">
            <p class="text-lg font-bold text-gray-800">{{ item.price }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 총 금액 -->
    <div class="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-gray-600">총 금액</span>
        <span class="text-xl font-bold text-gray-800">{{ total_amount }}</span>
      </div>
    </div>

    <!-- 버튼 섹션 -->
    <div class="max-w-3xl mx-auto mt-6">
      <button
          @click="handleClickHome"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
      >
        홈으로 돌아가기
      </button>
    </div>
  </div>
</template>