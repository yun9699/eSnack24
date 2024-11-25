<script setup lang="ts">
import {inject, Ref} from "vue"
import { useLocaleStore } from '../../stores/useLocaleStore'
import { storeToRefs } from 'pinia'
import { IUserAllergy } from "../../types/userRegisterTypes.ts"

// 알레르기 목록과 선택된 알레르기 번호 배열 주입
const allergyList = inject<Ref<IUserAllergy[]>>("allergyList")
const selectedAnos = inject<Ref<number[]>>("selectedAnos")

// 현재 선택된 언어 가져오기
const localeStore = useLocaleStore()
const { currentLang } = storeToRefs(localeStore)

// 알레르기 항목 선택/해제 토글 함수
const toggleSelection = (ano: number) => {
  const index = selectedAnos.value.indexOf(ano)
  if (index > -1) {
    // 이미 선택된 항목이면 제거
    selectedAnos.value.splice(index, 1)
    console.log(`알레르기 항목 ${ano} 선택 해제됨`)
  } else {
    // 선택되지 않은 항목이면 추가
    selectedAnos.value.push(ano)
    console.log(`알레르기 항목 ${ano} 선택됨`)
  }
  // 현재 선택된 전체 알레르기 목록 출력
  console.log('현재 선택된 알레르기:', selectedAnos.value)
}


</script>

<template>
  <div class="p-4">
    <!-- 컴포넌트 제목 -->
    <h2 class="text-2xl font-semibold mb-4">알레르기 선택</h2>

    <!-- 알레르기 목록 그리드 -->
    <ul class="grid grid-cols-2 gap-4">
      <li
          v-for="item in allergyList"
          :key="item.ano"
          class="flex justify-center"
      >
        <!-- 알레르기 선택 버튼 -->
        <button
            class="px-4 py-2 rounded-full transition-colors duration-200"
            :class="{
              'bg-green-500 text-white': selectedAnos.includes(item.ano),
              'bg-gray-200 text-gray-800': !selectedAnos.includes(item.ano)
            }"
            @click="toggleSelection(item.ano)"
        >
          <!-- 현재 언어에 따라 알레르기 이름 표시 -->
          {{ currentLang === 'ko' ? item.atitle_ko :
            currentLang === 'en' ? item.atitle_en :
                currentLang === 'ja' ? item.atitle_ja :
                    currentLang === 'zh' ? item.atitle_zh :
                        item.atitle_ko }}
        </button>
      </li>
    </ul>
  </div>
</template>