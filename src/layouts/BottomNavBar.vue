<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import useUserStore from "../stores/useUserStore.ts";

const route = useRoute();
const currentPath = computed(() => route.path);
const { t } = useI18n();
const user = useUserStore();

const isHidden = ref(false);
const showToTopButton = ref(false);

let lastScrollPosition = 0;

// 스크롤 핸들러
const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  isHidden.value = currentScrollPosition > lastScrollPosition && currentScrollPosition > 20;
  showToTopButton.value = currentScrollPosition > 200;
  lastScrollPosition = currentScrollPosition;
};


// 맨 위로 이동
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 이벤트 등록
onMounted(() => {
  window.addEventListener('scroll', handleScroll);

});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);

});
</script>

<template>
  <!-- 하단바 -->
  <nav
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 z-[9999]"
      :style="{ transform: isHidden ? 'translateY(100%)' : 'translateY(0)' }"
  >
    <div class="flex justify-around items-center px-4 py-3">
      <!-- 검색 -->
      <router-link
          to="/search"
          class="flex flex-col items-center group"
          :class="{ 'text-yellow-500': currentPath === '/search' }"
      >
        <Icon icon="material-symbols:search" class="text-3xl group-hover:text-yellow-400 transition duration-200" />
        <span class="text-xs mt-1 text-gray-600 group-hover:text-yellow-400 transition duration-200">
          {{ t('bottom_nav.search') }}
        </span>
      </router-link>

      <!-- 장바구니 -->
      <router-link
          :to="`/cart/${user.getUno}`"
          class="flex flex-col items-center group"
          :class="{ 'text-yellow-500': currentPath === '/cart' }"
      >
        <Icon icon="material-symbols:shopping-cart-outline" class="text-3xl group-hover:text-yellow-400 transition duration-200" />
        <span class="text-xs mt-1 text-gray-600 group-hover:text-yellow-400 transition duration-200">
          {{ t('bottom_nav.cart') }}
        </span>
      </router-link>

      <!-- 사진 -->
      <router-link
          to="/photo"
          class="flex flex-col items-center group"
          :class="{ 'text-yellow-500': currentPath === '/photo' }"
      >
        <Icon icon="material-symbols:photo-camera-outline" class="text-3xl group-hover:text-yellow-400 transition duration-200" />
        <span class="text-xs mt-1 text-gray-600 group-hover:text-yellow-400 transition duration-200">
          {{ t('bottom_nav.camera') }}
        </span>
      </router-link>

      <!-- 문의 -->
      <router-link
          to="/cs/faq"
          class="flex flex-col items-center group"
          :class="{ 'text-yellow-500': currentPath === '/contact' }"
      >
        <Icon icon="material-symbols:call-outline" class="text-3xl group-hover:text-yellow-400 transition duration-200" />
        <span class="text-xs mt-1 text-gray-600 group-hover:text-yellow-400 transition duration-200">
          {{ t('bottom_nav.contact') }}
        </span>
      </router-link>

      <!-- 프로필 또는 로그인 -->
      <router-link
          v-if="user.getUno !== 0 && user.getUno !== undefined"
          :to="`/my/${user.getUno}`"
          class="flex flex-col items-center group"
          :class="{ 'text-yellow-500': currentPath === `/my/${user.getUno}` }"
      >
        <Icon icon="material-symbols:person-outline" class="text-3xl group-hover:text-yellow-400 transition duration-200" />
        <span class="text-xs mt-1 text-gray-600 group-hover:text-yellow-400 transition duration-200">
          {{ t('bottom_nav.profile') }}
        </span>
      </router-link>

      <!-- 로그인 버튼 -->
      <router-link
          v-else
          to="/login"
          class="flex flex-col items-center group"
      >
        <Icon icon="majesticons:login-line" class="text-3xl group-hover:text-yellow-400 transition duration-200" />
        <span class="text-xs mt-1 text-gray-600 group-hover:text-yellow-400 transition duration-200">
          {{ t('bottom_nav.login') }}
        </span>
      </router-link>
    </div>
  </nav>
  <!-- 맨 위로 가기 버튼 -->
  <button
      v-if="showToTopButton"
      @click="scrollToTop"
      class="fixed bottom-20 right-4 bg-yellow-400 text-white p-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-200"
  >
    <Icon icon="material-symbols:arrow-upward-rounded" class="text-xl" />
  </button>
</template>

<style>
/* 맨 위로 가기 버튼 스타일 */
button {
  z-index: 1000;
}
</style>

