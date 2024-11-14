<script setup lang="ts">

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getKakaoAccessToken, getKakaoMemberWithAccessToken } from '../../api/LoginAPI/kakaoAPI.ts'

const route = useRoute()

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
      })
    })
  }
})

</script>

<template>
  <div>
    <div>Kakao Login Redirect</div>
    <div>{authCode}</div>
  </div>
</template>

<style scoped>

</style>