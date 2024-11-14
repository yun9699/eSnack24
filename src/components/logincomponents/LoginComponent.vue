<script setup lang="ts">
import LoginButtons from "./LoginButtons.vue";
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <img
        src="/eSnack24_logo_full.png"
        alt="Logo Image"
        class="w-48 md:w-64 h-auto mb-8 cursor-pointer"
    />
    <div class="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4">

      <LoginButtons/>
    </div>
  </div>
</template>

<style scoped>
</style>
