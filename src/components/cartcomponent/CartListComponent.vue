<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getCartList} from "../../api/cartapi/cartapi.ts";
import {IPageRequest, IPageResponse} from "../../types/commonTypes.ts";
import {ICartItem} from "../../types/cartTypes.ts";


const initPageRequest: IPageRequest = {

  page: 0,
  size: 0,
  type: '',
  keyword: '',
  arr: [],
  skip: 0
}

const initPageResponse: IPageResponse<ICartItem> = {

  list: <ICartItem>[],
  total: 0,
  startPage: 0,
  endPage: 0,
  prev: false,
  next: false,
  pageRequest: initPageRequest
}

const cartList = ref<{ cartListData: ICartItem[] }>({

  cartListData: initPageResponse.list,
});

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
        <!-- 상품 수량 및 조정 -->
        <div class="flex items-center space-x-2">
          <!-- 감소 버튼 -->
          <button
              @click="decreaseQuantity(item.id)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded"
          >
            -
          </button>
          <!-- 상품 수량 -->
          <span class="text-gray-800 font-medium">{{ item.cqty }}</span>
          <!-- 증가 버튼 -->
          <button
              @click="increaseQuantity(item.id)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded"
          >
            +
          </button>
        </div>
      </li>
    </ul>
  </div>

</template>

<style>
/* Tailwind CSS를 사용하기 때문에 추가 스타일은 필요하지 않음 */
</style>
