<template>
  <div class="container mx-auto w-full">
    <HeaderBar/>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import HeaderBar from "./HeaderBar.vue";

const sortOption = ref('latest')

</script>
