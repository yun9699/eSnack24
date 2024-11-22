<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import useUser from "../../stores/useUser.ts";
  import {onMounted} from "vue";

  const user = useUser();

  const result = user.getPersonalAllergies;

  onMounted(() => {

    console.log(result);
  })

</script>

<template>
  <div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-800">마이 프로필</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

      <!-- 내 정보 수정 버튼 -->
      <router-link
          to=""
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        내 정보 수정
      </router-link>

      <!-- 주문내역 버튼 -->
      <router-link
          to=""
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        주문내역
      </router-link>

      <!-- 내 문의 내역 버튼 -->
      <router-link
          to=""
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        내 문의 내역
      </router-link>

      <!-- 리뷰관리 버튼 -->
      <router-link
          to=""
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        리뷰관리
      </router-link>
    </div>
  </div>
</template>
