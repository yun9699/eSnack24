<script setup lang="ts">
import { onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { getGoogleAccessToken, getGoogleMemberWithAccessToken } from "../../api/LoginAPI/googleAPI.ts";
import useUser from "../../stores/useUser.ts";

const route = useRoute();
const router = useRouter();

const setUno = useUser();

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

          setUno.setUno(result.uno);

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
