<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import useUserStore from "../../stores/useUserStore.ts";
import { useI18n } from "vue-i18n";

const user = useUserStore();
const { t } = useI18n();

const uno = user.getUno;
const router = useRouter();
const email: string = user.getUserEmail;
const username: string = user.getUserName;


const ClickLogout = () => {
  user.setUserEmail('');
  user.setUserName('');
  user.setUno(0);
  user.setPersonalAllergies([]);
  router.push('/');
};
</script>

<template>
  <div class="max-w-xl mx-auto px-4">
    <!-- 사용자 정보 헤더 -->
    <div class="flex items-center justify-between py-4 border-b">
      <div class="flex items-center space-x-2">
        <h2 class="text-xl">{{ username }}</h2>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
      <button
          @click="ClickLogout"
          class="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
      >
        {{ t('userprofile.logout_button') }}
      </button>
    </div>

    <!-- 메뉴 리스트 -->
    <div class="divide-y mt-16">
      <RouterLink :to="`/my/${uno}/order/list`" class="flex items-center justify-between py-4">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span>{{ t('userprofile.buttons.order_history') }}</span>
        </div>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </RouterLink>

      <RouterLink :to="`/my/edit/${uno}`" class="flex items-center justify-between py-4">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span>{{ t('userprofile.buttons.edit_profile') }}</span>
        </div>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </RouterLink>

      <RouterLink to="/cs/faq" class="flex items-center justify-between py-4">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span>{{ t('userprofile.buttons.my_inquiries') }}</span>
        </div>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </RouterLink>

      <RouterLink :to="`/review/user/${uno}`" class="flex items-center justify-between py-4">
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <span>{{ t('userprofile.buttons.review_management') }}</span>
        </div>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </RouterLink>
    </div>
  </div>
</template>