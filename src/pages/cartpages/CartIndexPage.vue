<script setup lang="ts">

import Basiclayout from "../../layouts/Basiclayout.vue";
import Footer from "../../layouts/Footer.vue";
import BottomNavBar from "../../layouts/BottomNavBar.vue";
</script>

<template>
  <Basiclayout/>
  <router-view/>
  <Footer/>
  <BottomNavBar/>
</template>

<style scoped>

</style>