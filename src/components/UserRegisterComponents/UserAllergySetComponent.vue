<script setup lang="ts">

import {inject} from "vue";

const allergyList: any = inject("allergyList");
const selectedAnos: any = inject("selectedAnos");


// 항목 선택/해제 함수
const toggleSelection = (ano: number) => {
  if (selectedAnos.value.includes(ano)) {
    selectedAnos.value = selectedAnos.value.filter(id => id !== ano);
  } else {
    selectedAnos.value.push(ano);
  }
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">User Allergy Set Component</h2>

    <ul class="grid grid-cols-2 gap-4">
      <li
          v-for="(item, index) in allergyList"
          :key="index"
          class="flex justify-center"
      >
        <button
            class="px-4 py-2 rounded-full transition-colors duration-200"
            :class="{
            'bg-green-500 text-white': selectedAnos.includes(item.ano),
            'bg-gray-200 text-gray-800': !selectedAnos.includes(item.ano)
          }"
            @click="toggleSelection(item.ano)"
        >
          {{ item.atitle_ko }}
        </button>
      </li>
    </ul>

    <!-- 선택된 항목들 표시 -->
    <div class="mt-4 text-lg">
      <span class="font-bold">선택된 항목 (ano):</span>
      <span>{{ selectedAnos.join(', ') }}</span>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 작성하세요 */
</style>
