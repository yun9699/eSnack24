<template>
  <div class="container mx-auto px-4">
      <div class="container mx-auto px-4">
        <HeaderBar/>
      </div>



  </div>
  <BottomNavBar/>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import BottomNavBar from "./BottomNavBar.vue";
import HeaderBar from "./HeaderBar.vue";

const sortOption = ref('latest')

</script>