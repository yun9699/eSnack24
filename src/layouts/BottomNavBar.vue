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

const isHidden = ref(false); // 하단바 숨김 상태
const showToTopButton = ref(false); // 맨 위로 가기 버튼 상태
const bottomNavHeight = ref(0); // 하단바 높이 저장

let lastScrollPosition = 0;

// 스크롤 핸들러
const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  isHidden.value = currentScrollPosition > lastScrollPosition && currentScrollPosition > 20;
  showToTopButton.value = currentScrollPosition > 200;
  lastScrollPosition = currentScrollPosition;
};

// 하단바 높이 계산
const updateBottomPadding = () => {
  const bottomNav = document.querySelector('nav');
  if (bottomNav) {
    bottomNavHeight.value = bottomNav.offsetHeight;
  }
};

// 맨 위로 이동
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 이벤트 등록
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', updateBottomPadding);
  updateBottomPadding(); // 초기 높이 설정
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateBottomPadding);
});
</script>

<template>
  <!-- 콘텐츠 -->
  <div :style="{ paddingBottom: `${bottomNavHeight}px` }" class="content">
    <div class="p-4">
    </div>
  </div>

  <!-- 하단바 -->
  <nav
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300"
      :style="{ transform: isHidden ? 'translateY(100%)' : 'translateY(0)' }"
  >
    <div class="flex justify-around items-center px-4 py-3">
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
/* 하단바와 맨 위로 가기 버튼 스타일 */
nav {
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

button {
  z-index: 1000;
}
</style>
