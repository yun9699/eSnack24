<script lang="ts">
import {inject, ref} from "vue";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import {getTossUser} from "../../api/UserAPI/userAPI.ts";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

const user = ref({username: '', uemail: ''});

export default {
  setup() {
    const ono = inject("ono")
    const data = inject("data");

    console.log(data);
    console.log(data.value.total_amount_krw);

    const amount = ref({ currency: "KRW", value: (Number)(data.value.total_amount_krw) });
    const ready = ref(false);
    const widgets = ref<any>(null);

    console.log(ono);
    console.log(amount.value);

    const onMounted = async () => {

      await getTossUser().then((info) => {

        console.log(info);

        user.value = info;
      })

      try {
        // ------  SDK 초기화 ------
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        const paymentWidgets = tossPayments.widgets({
          customerKey,
        });

        widgets.value = paymentWidgets;

        // 결제 위젯 설정
        await paymentWidgets.setAmount(amount.value);

        // 결제 수단 및 이용약관 렌더링
        await paymentWidgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });

        await paymentWidgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });

        ready.value = true;
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    onMounted();

    const onPaymentClick = async () => {

      console.log(amount.value.value)
      try {
        // 결제 요청
        if (widgets.value) {
          await widgets.value.requestPayment({
            orderId: generateRandomString() + "_" + ono,
            orderName: "" + ono,
            successUrl: window.location.origin + "/order/tosscomplete/" + ono,
            failUrl: window.location.origin + "/order/tossfail/" + ono,
            customerEmail: "" + user.value.uemail,
            customerName: "" + user.value.username,
          });
        }
      } catch (error) {
        console.error("Payment request failed:", error);
      }
    };

    return {
      amount,
      ready,
      onPaymentClick,
    };
  },
};

// 랜덤 문자열 생성 함수
function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
</script>

<template>
  <div class="flex justify-center items-center p-4">
    <div class="w-full max-w-xl p-6 border rounded-lg shadow-lg">
      <!-- 결제 UI -->
      <div id="payment-method" class="mb-6" />
      <!-- 이용약관 UI -->
      <div id="agreement" class="mb-6" />

      <!-- 결제하기 버튼 -->
      <button
          class="w-full mt-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          :disabled="!ready"
          @click="onPaymentClick"
      >
        결제하기
      </button>
    </div>
  </div>
</template>