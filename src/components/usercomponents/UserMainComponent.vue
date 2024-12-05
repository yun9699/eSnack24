<script setup lang="ts">
import {RouterLink, useRouter} from "vue-router";
  import useUserStore from "../../stores/useUserStore.ts";

  const user = useUserStore();

  const uno = user.getUno

  const router = useRouter();

  const email: string = user.getUserEmail

  console.log()

  const ClickLogout = () => {

    user.setUserEmail('');
    user.setUno(0);
    user.setPersonalAllergies([]);
    router.push('/');
  }

</script>

<template>
  <div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
    <!-- 상단 인사말과 로그아웃 버튼 -->
    <div class="flex justify-between items-center mb-8">
      <!-- 사용자 인사말 -->
      <h2 class="text-lg font-medium text-gray-800">
        안녕하세요, {{ email }}님!
      </h2>

      <!-- 로그아웃 버튼 -->
      <button
          class="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
          @click="ClickLogout"
      >
        로그아웃
      </button>
    </div>

    <!-- 본문 내용 -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

      <!-- 내 정보 수정 버튼 -->
      <router-link
          :to="`/my/edit/${user.getUno}`"
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        내 정보 수정
      </router-link>
      <!-- 주문내역 버튼 -->
      <router-link
          :to="`/my/${user.getUno}/order/list`"
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
          :to="`/review/user/${uno}`"
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        리뷰관리
      </router-link>
    </div>
  </div>
</template>
