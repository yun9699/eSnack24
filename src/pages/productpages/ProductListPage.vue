<script setup lang="ts">

import ProductListComponent from "../../components/productcomponents/ProductListComponent.vue";
import Basiclayout from "../../layouts/Basiclayout.vue";
import BottomNavBar from "../../layouts/BottomNavBar.vue";
</script>

<template>
  <Basiclayout/>
  <router-view/>
  <ProductListComponent/>
  <BottomNavBar/>
</template>

<style scoped>

</style>