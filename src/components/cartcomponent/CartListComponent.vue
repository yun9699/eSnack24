<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import {clearCart, decCartItem, deleteCartItem, getCartList, incCartItem} from "../../api/cartapi/cartapi.ts";
import { ICartItem } from "../../types/cartTypes.ts";
import {createOrder} from "../../api/orderapi/OrderAPI.ts";
import {getCartAddress} from "../../api/UserAPI/userAPI.ts";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import { Icon } from '@iconify/vue';

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

const address = ref({
  zipcode: '',
  address_line1: '',
  address_line2: ''
});

const router = useRouter();
const { t } = useI18n();
const pageNum = ref(1);
const endPageNum = ref(1);
const totalItems = ref(0);
const data = ref<ICartItem[]>([{...initCartItem}]);
const checkedItems = ref<number[]>([]);
const isHidden = ref(false);

// 체크박스 관련 함수
const toggleCheck = (cino: number) => {
  const index = checkedItems.value.indexOf(cino);
  if (index > -1) {
    checkedItems.value.splice(index, 1);
  } else {
    checkedItems.value.push(cino);
  }
};

const allChecked = computed(() => {
  return data.value.length > 0 && checkedItems.value.length === data.value.length;
});

const toggleAllCheck = () => {
  if (allChecked.value) {
    checkedItems.value = [];
  } else {
    checkedItems.value = data.value.map(item => item.cino);
  }
};

// 금액 계산
const totalAmount = computed(() => {
  return data.value
      .filter(item => checkedItems.value.includes(item.cino))
      .reduce((sum, item) => sum + (item.price * item.ciqty), 0);
});

const discount = ref(5000);  // 할인 금액
const shippingFee = ref(5000); // 배송비

const finalAmount = computed(() => {
  if (checkedItems.value.length === 0) return 0;
  return totalAmount.value - discount.value + shippingFee.value;
});

const deleteItem = (cino: number) => {
  const item = data.value.find((item) => item.cino === cino);
  if (item) {
    deleteCartItem(cino).then(() => {
      data.value = data.value.filter((item) => item.cino !== cino);
      checkedItems.value = checkedItems.value.filter(id => id !== cino);
      totalItems.value--;
    });
  }
};

const deleteCheckedItems = async () => {
  for (const cino of checkedItems.value) {
    await deleteCartItem(cino);
  }
  data.value = data.value.filter(item => !checkedItems.value.includes(item.cino));
  totalItems.value = data.value.length;
  checkedItems.value = [];
};

const increaseQty = (cino: number) => {
  const item = data.value.find((item) => item.cino === cino);
  if (item) {
    incCartItem(cino).then(() => item.ciqty++);
  }
};

const decreaseQty = (cino: number) => {
  const item = data.value.find((item) => item.cino === cino);
  if (item && item.ciqty > 1) {
    decCartItem(cino).then(() => item.ciqty--);
  }
};

const handleClickPay = () => {
  if (checkedItems.value.length === 0) return;

  const pnos: number[] = [];
  const ciqtys: number[] = [];

  data.value
      .filter(item => checkedItems.value.includes(item.cino))
      .forEach((item) => {
        pnos.push(item.pno);
        ciqtys.push(item.ciqty);
      });

  createOrder(pnos, ciqtys).then((ono) => {
    router.push(`/order/create/${ono}`);
  });
};

onMounted(async () => {
  try {
    // 장바구니 데이터 로드
    const cartRes = await getCartList(pageNum.value);
    data.value = cartRes.list;
    endPageNum.value = cartRes.endPage;
    totalItems.value = cartRes.total;

    // 모든 상품의 cino를 체크된 상태로 초기화
    if (cartRes.list && cartRes.list.length > 0) {
      checkedItems.value = cartRes.list.map(item => item.cino);
    }

    // 배송지 정보 로드
    const addressData = await getCartAddress();
    address.value = addressData;
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
  }
});

</script>

<template>
  <div class="container mx-auto p-4 bg-white min-h-screen">
    <!-- 헤더 -->
    <div class="flex items-center mb-4">
      <h1 class="text-lg">{{ t('cart.title') }} ({{ totalItems }})</h1>
      <div class="ml-auto flex gap-2">
      </div>
    </div>

    <!-- 배송지 정보 -->
    <div class="flex items-center p-4 bg-gray-50 rounded mb-4">
      <span class="mr-2"><Icon icon="mingcute:location-3-line" width="24" height="24" /></span>
      <div class="text-sm">
        [{{ address.zipcode }}] {{ address.address_line1 }} {{ address.address_line2 }}
      </div>
    </div>

    <!-- 전체 선택 및 선택 삭제 -->
    <div v-if="totalItems > 0" class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <input
            type="checkbox"
            :checked="allChecked"
            @change="toggleAllCheck"
            class="w-5 h-5 accent-[#f9bb00]"
        >
        <span>전체 선택</span>
      </div>
      <button
          @click="deleteCheckedItems"
          class="text-red-500"
          :disabled="checkedItems.length === 0"
      >
        선택 삭제
      </button>
    </div>

    <!-- 장바구니 비었을 때 메시지 -->
    <div v-if="totalItems === 0" class="text-center py-20 text-gray-500">
      {{ t('cart.empty_message') }}
    </div>

    <!-- 장바구니 아이템 목록 -->
    <div v-else class="space-y-4 mb-60">
      <div v-for="item in data"
           :key="item.pno"
           class="flex gap-4 border-b pb-4">
        <input
            type="checkbox"
            :checked="checkedItems.includes(item.cino)"
            @change="toggleCheck(item.cino)"
            class="w-5 h-5 mt-2 accent-[#f9bb00]"
        >

        <img :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`"
             :alt="item.ptitle_ko"
             class="w-20 h-20 object-cover rounded">

        <div class="flex-1">
          <div class="flex justify-between mb-2">
            <div>
              <p class="font-medium">{{ item.ptitle_ko }}</p>
              <p class="text-sm text-gray-500">최고판매가 {{ item.price.toLocaleString() }} ₩</p>
            </div>
            <div class="flex gap-2">
              <button @click="deleteItem(item.cino)" class="text-gray-500 hover:text-red-500 transition-colors">
                <Icon icon="icon-park-outline:delete" width="24" height="24" />
              </button>
            </div>
          </div>

          <div class="text-lg font-bold mb-2">{{ item.price.toLocaleString() }} ₩</div>

          <div class="flex items-center">
            <button @click="decreaseQty(item.cino)"
                    class="w-8 h-8 border rounded-full">-</button>
            <span class="mx-4">{{ item.ciqty }}</span>
            <button @click="increaseQty(item.cino)"
                    class="w-8 h-8 border rounded-full">+</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 결제 정보 -->
    <div v-if="checkedItems.length > 0"
         class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 transition-transform duration-300 z-[9999] shadow-lg"
         :style="{ transform: isHidden ? 'translateY(100%)' : 'translateY(0)' }"
    >
      <!-- mb-16 클래스 추가 -->
      <div class="space-y-2 mb-4">
        <div class="flex justify-between">
          <span>{{ t('cart.order_amount') }}</span>
          <span>+{{ totalAmount.toLocaleString() }} ₩</span>
        </div>
        <div class="flex justify-between text-red-500">
          <span>{{ t('cart.product_discount') }}</span>
          <span>-{{ discount.toLocaleString() }} ₩</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t('cart.shipping_fee') }}</span>
          <span>+{{ shippingFee.toLocaleString() }} ₩</span>
        </div>
        <div class="flex justify-between font-bold text-lg">
          <span>{{ t('cart.total_payment_amount') }}</span>
          <span>{{ finalAmount.toLocaleString() }} ₩</span>
        </div>
      </div>

      <button @click="handleClickPay"
              class="text-xl w-full py-3 bg-[#f9bb00] text-white rounded-full hover:bg-[#e0a800]">
        {{ t('cart.checkout_button') }}
      </button>
    </div>
  </div>
</template>