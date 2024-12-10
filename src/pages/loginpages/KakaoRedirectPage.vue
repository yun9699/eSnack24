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
  <div>
    <div>Kakao Login Redirect</div>
  </div>
</template>

<style scoped>

</style>