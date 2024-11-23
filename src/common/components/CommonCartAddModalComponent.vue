<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import useUserStore from "../../stores/useUserStore.ts";

const props = defineProps({
  isModalStatus:Boolean,
  modalClose:Function,
});

const user = useUserStore
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
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto relative">
      <!-- 닫기 버튼 -->
      <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          @click="props.modalClose"
      >
      ×
      </button>

      <!-- 모달 내용 -->
      <p class="text-center text-gray-800 text-lg font-semibold mb-4">장바구니로 이동하시겠습니까?</p>

      <!-- 장바구니로 이동 버튼 -->
      <div class="flex justify-center mt-6">
        <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
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
