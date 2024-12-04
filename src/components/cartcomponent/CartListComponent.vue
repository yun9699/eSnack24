<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {clearCart, decCartItem, deleteCartItem, getCartList, incCartItem} from "../../api/cartapi/cartapi.ts";
import { ICartItem } from "../../types/cartTypes.ts";
import {createOrder} from "../../api/orderapi/OrderAPI.ts";
import {useRouter} from "vue-router";

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

const router = useRouter();

let pageNum: number = 1;

let endPageNum: number = 1;

const totalItems = ref<number>(0);

const data = ref<ICartItem[]>([
  {...initCartItem}
])

const deleteItem = (cino: number) => {

  const item = data.value.find((item) => item.cino === cino)

  if (item) {

    deleteCartItem(cino).then(() => {

      data.value = data.value.filter((item) => item.cino !== cino);

      totalItems.value--;
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

const handleClickPay = () => {

  const pnos: number[] = [];
  const ciqtys: number[] = [];

  data.value.forEach((item) => {

    pnos.push(item.pno);
    ciqtys.push(item.ciqty);
  })

  createOrder(pnos, ciqtys).then((ono) => {

    console.log(ono);

    router.push(`/order/create/${ono}`);
  })
}

onMounted(() => {

  getCartList(pageNum).then((res) => {

    data.value = res.list;

    endPageNum = res.endPage;

    totalItems.value = res.total;
  })
});

</script>

<template>
  <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">장바구니</h1>

    <!-- 장바구니 비었을 때 메시지 -->
    <div v-if="totalItems === 0" class="text-center mt-10">
      <p class="text-gray-600 text-xl font-semibold">장바구니가 비었습니다.</p>
    </div>

    <!-- 장바구니 리스트 -->
    <ul v-else class="bg-white rounded-xl shadow-md divide-y divide-gray-100">
      <li
          v-for="item in data"
          :key="item.pno"
          class="flex flex-col md:flex-row items-center justify-between p-4 hover:bg-gray-100"
      >
        <!-- 상품 이미지 -->
        <RouterLink :to="`/product/list/${item.pno}`" class="btn btn-success">
          <img
              :src="`http://10.10.10.166/product/s_${item.pfilename}`"
              :alt="item.ptitle_ko"
              class="w-32 h-32 object-cover rounded-lg shadow-sm"
          />
        </RouterLink>

        <!-- 상품 이름 -->
        <span class="mt-2 md:mt-0 font-semibold text-gray-700 text-lg md:ml-4">
          {{ item.ptitle_ko }}
        </span>

        <!-- 상품 수량 및 조정 -->
        <div class="flex items-center space-x-4 mt-4 md:mt-0 md:ml-auto">
          <!-- 감소 버튼 -->
          <button
              @click="decreaseQty(item.cino)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-full shadow-md transition duration-200"
          >
            -
          </button>

          <!-- 상품 수량 -->
          <span class="text-gray-800 font-semibold text-lg">{{ item.ciqty }}</span>

          <!-- 증가 버튼 -->
          <button
              @click="increaseQty(item.cino)"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-full shadow-md transition duration-200"
          >
            +
          </button>

          <!-- 삭제 버튼 -->
          <button
              @click="deleteItem(item.cino)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200"
          >
            삭제
          </button>
        </div>
      </li>
    </ul>

    <!-- 더보기 버튼 -->
    <div class="mt-10 text-center">
      <button
          @click="moreInfo()"
          v-if="pageNum < endPageNum"
          class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        더보기
      </button>
    </div>

    <!-- 결제하기 버튼 (맨 아래) -->
    <div class="fixed bottom-0 left-0 right-0 bg-white py-4 shadow-lg">
      <div class="container mx-auto text-center">
        <button
            @click="handleClickPay"
            class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          결제하기
        </button>
      </div>
    </div>
  </div>
</template>