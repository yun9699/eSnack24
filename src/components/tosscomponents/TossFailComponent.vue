<script lang="ts">
import { defineComponent, computed } from "vue";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const errorMessage = computed(() => {
      return route.query.message as string || "없음";
    });

    const errorCode = computed(() => {
      return route.query.code as string || "없음";
    });

    const handleClickHome = () => {

      router.push('/');
    }

    return {
      errorMessage,
      errorCode,
      handleClickHome,
    };
  },
});
</script>

<template>
  <div class="flex justify-center items-center p-6">
    <div class="w-full max-w-2xl p-6 border rounded-lg shadow-lg text-center">
      <img
          width="100"
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
          class="mx-auto"
      />
      <h2 class="text-xl font-semibold mt-4">결제를 실패했어요</h2>

      <div class="mt-12 grid grid-cols-2 gap-4 text-left">
        <div class="font-bold">에러메시지</div>
        <div class="text-right">{{ errorMessage }}</div>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4 text-left">
        <div class="font-bold">에러코드</div>
        <div class="text-right">{{ errorCode }}</div>
      </div>

      <div class="mt-6 flex justify-center gap-4">
        <button
            @click="handleClickHome"
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1rem;
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>