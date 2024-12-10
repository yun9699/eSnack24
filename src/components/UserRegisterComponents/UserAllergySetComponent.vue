<script setup lang="ts">
import { inject, Ref } from "vue"
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '../../stores/useLocaleStore'
import { storeToRefs } from 'pinia'
import { IUserAllergy } from "../../types/userRegisterTypes.ts"
import { localeAllergy } from '../../locales/localeAllergy' // 추가

const { t } = useI18n()

// // 현재 선택된 언어 가져오기
// const localeStore = useLocaleStore()
// const { currentLang } = storeToRefs(localeStore)

// 알레르기 다국어 처리 함수 가져오기
const { localeAtitle } = localeAllergy()

// 알레르기 목록과 선택된 알레르기 번호 배열 주입
const allergyList = inject<Ref<IUserAllergy[]>>("allergyList")
const selectedAnos = inject<Ref<number[]>>("selectedAnos")

// 알레르기 항목 선택/해제 토글 함수
const toggleSelection = (ano: number) => {
  const index = selectedAnos.value.indexOf(ano)
  if (index > -1) {
    selectedAnos.value.splice(index, 1)
  } else {
    selectedAnos.value.push(ano)
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-left mb-2">{{ t('userAllergy.selectTitle') }}</h2>
    <h3 class="text-s text-gray-600 text-left mb-8">{{ t('userAllergy.selectInfo') }}</h3>

    <ul class="grid grid-cols-2 gap-4">
      <li
          v-for="item in allergyList"
          :key="item.ano"
          class="flex justify-center"
      >
        <button
            class="w-32 px-4 py-2 rounded-full transition-colors duration-200"
            :class="{
              'bg-gradient-to-r from-red-400 to-pink-500 text-white': selectedAnos.includes(item.ano),
              'bg-gray-100 text-gray-700': !selectedAnos.includes(item.ano)
            }"
            @click="toggleSelection(item.ano)"
        >
          {{ localeAtitle(item) }}
        </button>
      </li>
    </ul>
  </div>
</template>