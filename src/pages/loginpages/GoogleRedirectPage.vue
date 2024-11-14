<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getGoogleAccessToken, getGoogleMemberWithAccessToken } from "../../api/loginapi/googleAPI.ts";

const route = useRoute();
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
        })
        .catch((error) => {
          console.error("Error during Google Login process:", error);
        });
  }
});
</script>

<template>
  <div>
    <div>Google Login Redirect</div>
    <div>{{ authCode }}</div>
  </div>
</template>

<style scoped>
/* 스타일 추가 가능 */
</style>
