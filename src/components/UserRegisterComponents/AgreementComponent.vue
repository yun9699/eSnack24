<script setup lang="ts">
import { ref, onMounted } from 'vue';

const terms = ref<any>([]);  // terms 초기값을 빈 배열로 설정

onMounted(async () => {
  const response = await fetch('/Agreement_Doc.JSON');
  terms.value = await response.json();  // JSON 데이터를 terms.value에 저장

  console.log(terms.value);  // 콘솔로 확인
});
</script>

<template>
  <!-- terms.value가 빈 배열일 때는 0, 아니라면 terms.length를 출력 -->
  <div v-if="terms.value && terms.value.length > 0" class="p-4"> <!-- terms가 비어있지 않은 경우에만 렌더링 -->
    <div v-for="(term, index) in terms.value" :key="index" class="mb-6">
      <div class="text-xl font-bold mb-2">{{ term.description_Section1 }}</div>
      <div class="ml-4">
        <!-- details가 배열일 경우, <ul>과 <li>로 처리 -->
        <div v-if="Array.isArray(term.details)">
          <ul class="list-inside list-disc text-gray-700">
            <li v-for="(detail, idx) in term.details" :key="idx" class="mb-2">
              {{ detail }}
            </li>
          </ul>
        </div>
        <!-- details가 문자열일 경우 그대로 출력 -->
        <div v-else>
          <p class="text-gray-700">{{ term.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
