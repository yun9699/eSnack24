<script setup>
import {onMounted, ref} from 'vue';
import {getCartList} from "../../api/cartapi/cartapi.ts";
import useUserStore from "../../stores/useUserStore.ts";


const initCartList = {


}

const cartList = ref();

onMounted(() => {

  getCartList().then((res) => {

    cartList.value = res;
  })
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">장바구니</h1>
    <ul class="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      <li
          v-for="item in cartList"
          :key="item.id"
          class="flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <!-- 상품 이름 -->
        <span class="font-medium text-gray-800">{{ item.ptitle_ko }}</span>
        <!-- 상품 수량 -->
        <span class="text-gray-600">수량: {{ item.cqty }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
/* Tailwind CSS를 사용하기 때문에 추가 스타일은 필요하지 않음 */
</style>
