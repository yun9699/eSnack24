<script setup lang="ts">

import { onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { getKakaoAccessToken, getKakaoMemberWithAccessToken } from '../../api/loginapi/kakaoAPI.ts'
import useUserStore from "../../stores/useUserStore.ts";

const route = useRoute()
const router = useRouter()

const user = useUserStore();

// "code" 파라미터 가져오기
const authCode = route.query.code as string | null

onMounted(() => {
  if (authCode) {
    // Access Token을 가져오고 로그인을 진행
    getKakaoAccessToken(authCode).then((accessToken) => {
      console.log(accessToken)
      getKakaoMemberWithAccessToken(accessToken).then((result) => {
        console.log("=========================")
        console.log(result)

        user.setUno(result.uno);
        user.setPersonalAllergies(result.anos);
        user.setUserEmail(result.email);
        user.setUserName(result.username);
        user.setAccessToken(result.accessToken);
        user.setRefreshToken(result.refreshToken);

        if(result.new == true) router.push('/user/reg');
        if(result.new == false) router.push('/');
      })
    })
  }
})

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <!-- 로딩 페이지 컨테이너 -->
    <div class="text-center p-6 bg-white rounded-lg shadow-lg w-96">
      <div class="flex justify-center mb-4">
        <!-- 로딩 애니메이션 (원) -->
        <svg
            class="animate-spin h-16 w-16 text-[#F9BB00]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <circle
              cx="12"
              cy="12"
              r="10"
              stroke-width="4"
              class="opacity-25"
          />
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M4 12a8 8 0 118 8 8 8 0 01-8-8z"
          />
        </svg>
      </div>
      <!-- 로딩 메시지 -->
      <p class="text-lg text-gray-700">Loading</p>
    </div>
  </div>
</template>

<style scoped>

</style>