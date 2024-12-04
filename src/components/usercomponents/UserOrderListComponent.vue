<script setup lang="ts">

import useUserStore from "../../stores/useUserStore.ts";
import {onMounted, ref} from "vue";
import {userOrder} from "../../api/orderapi/OrderAPI.ts";

const initData = {
  uno: '',
  ono: '',
  ptitle_ko: '',
  price: 0,
  pfilename:'',
  oiqty: 1
}
const user = useUserStore();
const uno = user.getUno;

const userOrders = ref([]);

onMounted(() => {
  console.log(uno);
  userOrder(uno).then((res) => {
    userOrders.value = res;
    console.log(res);

  })
})




</script>

<template>

</template>

<style scoped>
/* 필요에 따라 추가 스타일 작성 */
</style>