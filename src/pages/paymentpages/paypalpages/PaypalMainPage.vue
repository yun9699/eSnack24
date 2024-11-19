
<script setup>
import { ref, onMounted } from "vue";
import { loadScript } from "@paypal/paypal-js";
import { createOrder, captureOrder } from "../../../api/paymentapi/paypal/paypalAPI.js"

const clientId = 'ARXsGAth3VQXmiZa7fzIK0DwKdZyAzwGCRD_fpxBdWRpvo2QezzYbWqHpckTcGn8XpjHUPNVuIu7GLTh'; // 실제 client-id를 사용하세요
const message = ref("");
const paypalButtonContainer = ref(null); // 여기서 ref로 DOM 요소를 참조

onMounted(async () => {
  const paypal = await loadScript({
    "client-id": clientId,
    "enable-funding": "paypal",
    currency: "USD",
    components: "buttons",
  });

  if (paypal) {
    await paypal.Buttons({
      createOrder: async () => {
        try {
          const orderData = await createOrder([
            {id: 12345, quantity: 2},
          ]);
          console.log("Order data");
          console.log(orderData);

          if (!orderData.id) throw new Error("Order creation failed");
          return orderData.id;
        } catch (error) {
          message.value = `Error: ${error}`;
        }
      },
      onApprove: async (data, actions) => {
        try {
          const orderData = await captureOrder(data.orderID);
          message.value = `Transaction: ${orderData?.id}`;
        } catch (error) {
          message.value = `Error: ${error}`;
        }
      },
    }).render(paypalButtonContainer.value); // DOM 요소에 PayPal 버튼 렌더링
  } else {
    message.value = "PayPal SDK could not be loaded.";
  }
});
</script>

<template>
  <div>PayPal Pay</div>
  <div ref="paypalButtonContainer"></div> <!-- PayPal 버튼을 렌더링할 DOM 요소 -->
</template>
