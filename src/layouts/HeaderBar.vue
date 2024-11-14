<script setup lang="ts">
import { ref } from 'vue'

// 메뉴가 열려 있는지 여부를 나타내는 상태
const isMenuOpen = ref(false)
</script>

<template>
  <header class="py-4">
    <div class="flex justify-between items-center">
      <!-- 왼쪽에 뒤로가기 버튼 -->
      <button @click="window.history.back()" class="text-xl text-gray-600 hover:text-black">
        ←
      </button>

      <!-- 로고를 가운데로 배치 -->
      <div class="flex-1 text-center">
        <button>
          <!-- 반응형 로고 크기 설정 -->
          <img src="/eSnack24_logo_plain.png" class="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 mx-auto" />
        </button>
      </div>

      <!-- 오른쪽 공간, 필요 없다면 빈 div로 두기 -->
      <div class="w-8"></div>
    </div>

    <!-- 모바일 메뉴 (3단 메뉴는 제거) -->
    <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-white border-t border-gray-300 shadow-lg z-10">
      <nav class="flex flex-col items-center py-4">
        <button class="px-4 py-2 w-full text-gray-500 hover:bg-yellow-400">
          홈
        </button>
        <button class="px-4 py-2 w-full text-gray-500 hover:bg-yellow-400">
          제품
        </button>
        <button class="px-4 py-2 w-full text-gray-500 hover:bg-yellow-400">
          카트
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* 모바일 메뉴 스타일 */
button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

nav button {
  text-align: center;
  font-size: 16px;
}
</style>
