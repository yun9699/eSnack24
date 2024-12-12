<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { detailOrder } from "../../api/orderapi/OrderAPI.ts";
import { IOrderItem } from "../../types/orderTypes.ts";
import { useI18n } from "vue-i18n";
import {localeProduct} from "../../locales/localeProduct.ts";
import useUserStore from "../../stores/useUserStore.ts";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();
const { localePtitle } = localeProduct()

const uno = userStore.getUno;
const orderItems = ref<IOrderItem[]>([]);

//http://localhost:5173/review/9/294
const handleMoveReview = (pno:number) => {

  console.log("uno:",uno);
  console.log("pno:",pno)
  router.push(`/review/${uno}/${pno}`);
}

onMounted(() => {
  detailOrder(Number(route.params.ono)).then((data) => {

    // 주문 항목에 번역을 위한 필드 추가
    const translatedData = data.map(item => ({
      ...item,
      ptitle_ko: item.ptitle_ko,
      ptitle_en: item.ptitle_en,
      ptitle_ja: item.ptitle_ja,
      ptitle_zh: item.ptitle_zh
    }));

    orderItems.value = translatedData;
  })
})
</script>

<template>

  <div class="bg-gray-50 min-h-screen">
    <!-- 주문 상세 헤더 -->
    <div class="flex items-center p-4 bg-white border-b shadow-sm">
      <div class="flex-1 text-center text-lg font-medium text-gray-800">{{ t('order_detail.page_title') }}</div>
    </div>
    <div v-if="orderItems.length > 0" class="p-4 bg-white border-b">
      <div class="flex space-x-4 mt-2 text-sm justify-between">
        <div class="text-gray-500 text-lg font-bold">{{ t('order_detail.order_number') }} {{ orderItems[0].ono }}</div>
        <div>{{ t('order_detail.order_date') }}  {{ orderItems[0].oregdate.slice(0, 10) }}</div>
      </div>
    </div>


    <!-- 주문 상품 목록 -->
    <div class="pb-20">
      <div v-for="item in orderItems" :key="item.pno" class="mt-2">
        <!-- 상품 카드 -->
        <div class="bg-white p-4">
          <!-- 구매확정 상태 -->
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm text-blue-500">{{ t('order_detail.confirm_purchase') }} </span>
            <div class="flex space-x-2">
              <button class="text-sm text-gray-500">{{ t('order_detail.order_details') }} </button>
            </div>
          </div>

          <!-- 상품 정보 -->
          <div class="flex space-x-4">
            <RouterLink :to="`/product/list/${item.pno}`">
              <img
                  :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`"
                  :alt="item.ptitle_ko"
                  class="w-20 h-20 object-cover rounded"
              />
            </RouterLink>
            <div class="flex-1">
              <h3 class="text-sm mt-1">{{ localePtitle(item) }}</h3>
              <div class="mt-1 text-sm">{{ item.price }} ₩</div>
              <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-sm">{{ t('order_detail.quantity') }}: {{ item.oiqty }}{{ t('order_detail.unit') }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 리뷰쓰기 버튼 -->
        <div class="p-4">
          <button
              class="w-full text-sm py-3 px-6 rounded-md border border-[#F9BB00]"
              :style="{ backgroundColor: 'white', color: '#F9BB00' }"
              @click="handleMoveReview(item.pno)"
          >
            {{ t('order_detail.write_review') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gray-50 {
  background-color: #fafafa;
}
</style>
