<script setup lang="ts">
import { getKakaoLoginLink } from "../../api/LoginAPI/kakaoAPI.ts";
import { getGoogleLoginLink } from "../../api/LoginAPI/googleAPI.ts";

const kakaoLink: string = getKakaoLoginLink();
const googleLink: string = getGoogleLoginLink();

const handleClick = (link: string) => {
  window.location.href = link;
};
</script>

<template>
  <div class="flex flex-col space-y-4 items-center">
    <img
        src="/google_login_Button.png"
        alt="Google Login Button"
        class="w-64 h-auto cursor-pointer hover:scale-105 transition-transform duration-200"
        @click="() => handleClick(googleLink)"
    />
    <img
        src="/kakao_login_Button.png"
        alt="Kakao Login Button"
        class="w-64 h-auto cursor-pointer hover:scale-105 transition-transform duration-200"
        @click="() => handleClick(kakaoLink)"
    />
  </div>
</template>

<style scoped>
</style>
