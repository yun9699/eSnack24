<script setup lang="ts">
import { useRouter } from 'vue-router';

import useUserStore from "../../stores/useUserStore.ts";

const props = defineProps({
  isModalStatus:Boolean,
  modalClose:Function,
});

const user = useUserStore()

const uno = user.getUno;

const router = useRouter();


// 장바구니로 이동
const moveToCart = () => {
  router.push(`/cart/${uno}`);
};


</script>

<template>
  <div v-if="props.isModalStatus" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <!-- 모달 컨텐츠 -->
    <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto relative">
      <!-- 닫기 버튼 -->
      <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl transition-transform transform hover:scale-110"
          @click="props.modalClose"
      >
        ×
      </button>

      <!-- 모달 내용 -->
      <p class="text-center text-gray-900 text-xl font-semibold mb-6">
        장바구니에 담았습니다.
      </p>

      <!-- 장바구니로 이동 버튼 -->
      <div class="flex justify-center">
        <button
            class="px-6 py-3 bg-[#F9BB00] text-white text-base font-medium rounded-full hover:bg-[#D89C00] transition duration-200 shadow-md focus:outline-none focus:ring focus:ring-[#F9BB00]/50"
            @click="moveToCart"
        >
          장바구니로 이동
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* 배경을 덮는 어두운 배경에서 다른 화면 클릭 방지 */
.fixed {
  z-index: 50;
}

.relative {
  z-index: 100;
}
</style>
