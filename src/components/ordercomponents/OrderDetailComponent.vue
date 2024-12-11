<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { detailOrder } from "../../api/orderapi/OrderAPI.ts";
import { IOrderItem } from "../../types/orderTypes.ts";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const orderItems = ref<IOrderItem[]>([]);

onMounted(() => {
  detailOrder(Number(route.params.ono)).then((data) => {
    orderItems.value = data;
  })
})
</script>

<template>

  <div class="bg-gray-50 min-h-screen">
    <!-- 주문 상세 헤더 -->
    <div v-if="orderItems.length > 0" class="p-4 bg-white border-b">
      <div class="text-lg">주문 상세</div>
      <div class="flex space-x-4 mt-2 text-sm justify-between">
        <div class="text-gray-500">주문번호: {{ orderItems[0].ono }}번</div>
        <div>주문날짜: {{ orderItems[0].oregdate.slice(0, 10) }}</div>
      </div>
    </div>


    <!-- 주문 상품 목록 -->
    <div class="pb-20">
      <div v-for="item in orderItems" :key="item.pno" class="mt-2">
        <!-- 상품 카드 -->
        <div class="bg-white p-4">
          <!-- 구매확정 상태 -->
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm text-blue-500">구매확정</span>
            <div class="flex space-x-2">
              <button class="text-sm text-gray-500">주문내역확인</button>
            </div>
          </div>

          <!-- 상품 정보 -->
          <div class="flex space-x-4">
            <img
                :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`"
                :alt="item.ptitle_ko"
                class="w-20 h-20 object-cover rounded"
            />
            <div class="flex-1">
              <h3 class="text-sm mt-1">{{ item.ptitle_ko }}</h3>
              <div class="mt-1 text-sm">{{ item.price }}원</div>
              <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-sm">수량: {{ item.oiqty }}개</span>
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
          >
            리뷰쓰기
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
