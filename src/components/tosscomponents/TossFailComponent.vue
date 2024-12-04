<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();

    const errorMessage = computed(() => {
      return route.query.message as string || "없음";
    });

    const errorCode = computed(() => {
      return route.query.code as string || "없음";
    });

    return {
      errorMessage,
      errorCode,
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
        <a
            href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
            target="_blank"
            class="button p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          연동 문서
        </a>
        <a
            href="https://discord.gg/A4fRFXQhRu"
            target="_blank"
            class="button p-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
        >
          실시간 문의
        </a>
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