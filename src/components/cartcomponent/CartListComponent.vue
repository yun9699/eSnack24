<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { getCartList } from "../../api/cartapi/cartapi.ts";
import { ICartItem } from "../../types/cartTypes.ts";
import { InitPageResponse } from "../../init/CommonInit.ts";
import { IPageResponse } from '../../types/commonTypes';

const initCartItem: ICartItem = {
  price: 0,
  pno: 0,
  ptitle_ko: '',
  ptitle_en: '',
  ptitle_zh: '',
  ptitle_ja: '',
  pfilename: '',
  ciqty: 0
};

const initPage = InitPageResponse<ICartItem>();

const data = ref<{ pageData: IPageResponse<ICartItem> }>({

  pageData: initPage
});

const tmpData = ref<ICartItem[]>([
  {...initCartItem}
])

const deleteItem = (pno: number) => {

  tmpData.value = tmpData.value.filter((item) => item.pno !== pno);
}

const increaseQty = (pno: number) => {

  const item = tmpData.value.find((item) => item.pno === pno)

  if (item) {
    item.ciqty++;
  }
}

const decreaseQty = (pno: number) => {

  const item = tmpData.value.find((item) => item.pno === pno)

  if (item && item.ciqty > 1) {
    item.ciqty--;
  }
}

onMounted(() => {
  console.log(data.value.pageData.list);

  getCartList().then((res) => {

    console.log(res);

    data.value.pageData.list = res;
    tmpData.value = res.list;
  })
});

onBeforeUnmount(() => {

  if(data.value.pageData.list != tmpData.value) {

    console.log("aaaaaaaa");
  }
})

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">장바구니</h1>
    <ul class="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      <li
          v-for="item in tmpData"
          :key="item.pno"
          class="flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <!-- 상품 이름 -->
        <span class="font-medium text-gray-800">{{ item.ptitle_ko }}</span>
        <!-- 상품 수량 및 조정 -->
        <div class="flex items-center space-x-2">

          <!-- 감소 버튼 -->
          <button
              @click="decreaseQty(item.pno)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded"
          >
            -
          </button>

          <!-- 상품 수량 -->
          <span class="text-gray-800 font-medium">{{ item.ciqty }}</span>

          <!-- 증가 버튼 -->
          <button
              @click="increaseQty(item.pno)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded"
          >
            +
          </button>

          <!-- 삭제 버튼 -->
          <button
              @click="deleteItem(item.pno)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
          >
            삭제
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
/* Tailwind CSS를 사용하기 때문에 추가 스타일은 필요하지 않음 */
</style>