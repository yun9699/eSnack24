<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const responseData = ref<string | null>(null);

    const orderId = route.query.orderId as string;
    const amount = route.query.amount as string;
    const paymentKey = route.query.paymentKey as string;

    const formattedAmount = (Number(amount) || 0).toLocaleString() + "원";

    const handleClickDetail = () => {

      const ono = orderId.split("_")[1];
      router.push(`/order/detail/${ono}`)
    }

    const handleClickHome = () => {

      router.push('/');
    }

    onMounted(async () => {
      const requestData = {
        orderId,
        amount,
        paymentKey,
      };

      console.log(requestData);

      try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/toss/confirm",
            requestData, // 요청 본문은 두 번째 매개변수로 전달
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );

        // Axios는 JSON 응답을 자동으로 파싱하므로 response.data를 사용
        responseData.value = JSON.stringify(response.data, null, 4);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Unknown error";
        const errorCode = error.response?.data?.code || error.code || "Unknown code";
        await router.push(`/fail?code=${errorCode}&message=${errorMessage}`);
      }
    });

    return {
      orderId,
      formattedAmount,
      paymentKey,
      responseData,
      handleClickDetail,
      handleClickHome
    };
  },
});
</script>

<template>
  <div class="flex justify-center items-center p-6">
    <div class="w-full max-w-2xl p-6 border rounded-lg shadow-lg text-center">
      <img
          width="100"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 성공 이미지"
          class="mx-auto"
      />
      <h2 class="text-xl font-semibold mt-4">결제를 완료했어요</h2>

      <div class="mt-12 grid grid-cols-2 gap-4 text-left">
        <div class="font-bold">결제금액</div>
        <div class="text-right">{{ formattedAmount }}</div>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4 text-left">
        <div class="font-bold">주문번호</div>
        <div class="text-right">{{ orderId }}</div>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4 text-left">
        <div class="font-bold">paymentKey</div>
        <div class="text-right break-words">{{ paymentKey }}</div>
      </div>

      <div class="flex flex-col space-y-4">
        <button
            @click="handleClickDetail"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
        >
          주문 상세보기
        </button>
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