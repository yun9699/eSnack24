<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import useUserStore from "../../stores/useUserStore.ts";
import { useI18n } from "vue-i18n";

const user = useUserStore();
const { t } = useI18n();

const uno = user.getUno;
const router = useRouter();
const email: string = user.getUserEmail;

const ClickLogout = () => {
  user.setUserEmail('');
  user.setUno(0);
  user.setPersonalAllergies([]);
  router.push('/');
};
</script>

<template>
  <div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
    <!-- 상단 인사말과 로그아웃 버튼 -->
    <div class="flex justify-between items-center mb-8">
      <!-- 사용자 인사말 -->
      <h2 class="text-lg font-medium text-gray-800">
        {{ t('myprofile.greeting', { email: email }) }}
      </h2>

      <!-- 로그아웃 버튼 -->
      <button
          class="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
          @click="ClickLogout"
      >
        {{ t('myprofile.logout_button') }}
      </button>
    </div>

    <!-- 본문 내용 -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <!-- 내 정보 수정 버튼 -->
      <router-link
          :to="`/my/edit/${uno}`"
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        {{ t('myprofile.buttons.edit_profile') }}
      </router-link>

      <!-- 주문내역 버튼 -->
      <router-link
          :to="`/my/${uno}/order/list`"
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        {{ t('myprofile.buttons.order_history') }}
      </router-link>

      <!-- 내 문의 내역 버튼 -->
      <router-link
          to=""
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        {{ t('myprofile.buttons.my_inquiries') }}
      </router-link>

      <!-- 리뷰관리 버튼 -->
      <router-link
          :to="`/review/user/${uno}`"
          class="block w-full py-4 px-6 bg-gray-800 text-white text-center font-medium rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        {{ t('myprofile.buttons.review_management') }}
      </router-link>
    </div>
  </div>
</template>
