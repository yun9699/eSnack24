<script setup lang="ts">

</script>

<template>
  <div class="app-container">
    <div class="mobile-container">
      <routerView />
    </div>
  </div>
</template>

<style>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.mobile-container {
  width: 100%;
  max-width: 40rem;
  min-height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

/* 태블릿 크기 이하에서는 최대 너비 제한을 해제하고 전체 화면을 사용 */
@media screen and (max-width: 30rem) {
  .app-container {
    background-color: white;
    padding: 0;
  }

  .mobile-container {
    max-width: 100%;
    box-shadow: none;
  }
}
</style>