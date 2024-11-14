<!-- components/BottomNavBar.vue -->
<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
    <div class="flex justify-between items-center px-4 py-2">
      <router-link
          to="/search"
          class="flex flex-col items-center relative"
          :class="{ 'text-yellow-400': currentPath === '/search' }"
      >
        <Icon icon="material-symbols:search" class="text-2xl" />
        <span class="text-xs mt-1">검색</span>
        <div v-if="currentPath === '/search'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 mt-1"></div>
      </router-link>

      <router-link
          to="/cart"
          class="flex flex-col items-center relative"
          :class="{ 'text-yellow-400': currentPath === '/cart' }"
      >
        <Icon icon="material-symbols:shopping-cart-outline" class="text-2xl" />
        <span class="text-xs mt-1">장바구니</span>
        <div v-if="currentPath === '/cart'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 mt-1"></div>
      </router-link>

      <router-link
          to="/photo"
          class="flex flex-col items-center relative"
          :class="{ 'text-yellow-400': currentPath === '/photo' }"
      >
        <Icon icon="material-symbols:photo-camera-outline" class="text-2xl" />
        <span class="text-xs mt-1">카메라</span>
        <div v-if="currentPath === '/camera'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 mt-1"></div>
      </router-link>

      <router-link
          to="/contact"
          class="flex flex-col items-center relative"
          :class="{ 'text-yellow-400': currentPath === '/contact' }"
      >
        <Icon icon="material-symbols:call-outline" class="text-2xl" />
        <span class="text-xs mt-1">연락처</span>
        <div v-if="currentPath === '/contact'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 mt-1"></div>
      </router-link>

      <router-link
          to="/profile"
          class="flex flex-col items-center relative"
          :class="{ 'text-yellow-400': currentPath === '/profile' }"
      >
        <Icon icon="material-symbols:person-outline" class="text-2xl" />
        <span class="text-xs mt-1">프로필</span>
        <div v-if="currentPath === '/profile'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 mt-1"></div>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const currentPath = computed(() => route.path)
</script>