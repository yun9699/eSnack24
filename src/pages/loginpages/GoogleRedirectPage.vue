<script setup lang="ts">
import { onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { getGoogleAccessToken, getGoogleMemberWithAccessToken } from "../../api/loginapi/googleAPI.ts";
import useUserStore from "../../stores/useUserStore.ts";

const route = useRoute();
const router = useRouter();

const user = useUserStore();

const authCode = route.query.code as string | null;

onMounted(() => {
  if (authCode) {
    getGoogleAccessToken(authCode)
        .then((accessToken) => {
          console.log("Access Token:", accessToken);
          return getGoogleMemberWithAccessToken(accessToken);
        })
        .then((result) => {
          console.log("Google Member Data:", result);

          user.setUno(result.uno);
          user.setPersonalAllergies(result.anos);
          user.setUserEmail(result.email);
          user.setAccessToken(result.accessToken);
          user.setRefreshToken(result.refreshToken);

          if(result.new == true) router.push('/user/reg');
          if(result.new == false) router.push('/');
        });
  }
});
</script>

<template>
  <div>
    <div>Google Login Redirect</div>
  </div>
</template>

<style scoped>
/* 스타일 추가 가능 */
</style>
