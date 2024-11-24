<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {decCartItem, deleteCartItem, getCartList, incCartItem} from "../../api/cartapi/cartapi.ts";
import { ICartItem } from "../../types/cartTypes.ts";

const initCartItem: ICartItem = {
  cino: 0,
  price: 0,
  pno: 0,
  ptitle_ko: '',
  ptitle_en: '',
  ptitle_zh: '',
  ptitle_ja: '',
  pfilename: '',
  ciqty: 0
};

let pageNum: number = 1;

let endPageNum: number = 1;


const data = ref<ICartItem[]>([
  {...initCartItem}
])

const deleteItem = (cino: number) => {

  const item = data.value.find((item) => item.cino === cino)

  if (item) {

    deleteCartItem(cino).then(() => {

      data.value = data.value.filter((item) => item.cino !== cino);
    })
  }
}

const increaseQty = (cino: number) => {

  const item = data.value.find((item) => item.cino === cino)

  if (item) {

    incCartItem(cino).then(() => item.ciqty++)
  }
}

const decreaseQty = (cino: number) => {

  const item = data.value.find((item) => item.cino === cino)

  if (item && item.ciqty > 1) {

    decCartItem(cino).then(() => item.ciqty--)
  }
}

const moreInfo = () => {

  pageNum++;

  getCartList(pageNum).then((res) => {

    data.value = [...data.value, ...res.list];
  })
}

onMounted(() => {

  getCartList(pageNum).then((res) => {

    console.log(res);

    data.value = res.list;

    endPageNum = res.endPage;
  })
});

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">장바구니</h1>
    <ul class="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
      <li
          v-for="item in data"
          :key="item.pno"
          class="flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <!-- 상품 이름 -->
        <span class="font-medium text-gray-800">{{ item.ptitle_ko }}</span>
        <!-- 상품 수량 및 조정 -->
        <div class="flex items-center space-x-2">

          <!-- 감소 버튼 -->
          <button
              @click="decreaseQty(item.cino)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded"
          >
            -
          </button>

          <!-- 상품 수량 -->
          <span class="text-gray-800 font-medium">{{ item.ciqty }}</span>

          <!-- 증가 버튼 -->
          <button
              @click="increaseQty(item.cino)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded"
          >
            +
          </button>

          <!-- 삭제 버튼 -->
          <button
              @click="deleteItem(item.cino)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
          >
            삭제
          </button>
        </div>
      </li>
    </ul>

    <div class="mt-8 text-center">
      <button
          @click="moreInfo()"
          v-if="pageNum < endPageNum"
          class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        더보기
      </button>
    </div>
  </div>


</template>

<style>
/* Tailwind CSS를 사용하기 때문에 추가 스타일은 필요하지 않음 */
</style>