<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import router from "../router/MainRouter.ts"
import { useI18n } from 'vue-i18n'
import { loadLocalMessages } from '../i18n'
import { useLocaleStore } from '../stores/useLocaleStore'
import { storeToRefs } from 'pinia'

const { locale } = useI18n()
const localeStore = useLocaleStore()
const { currentLang } = storeToRefs(localeStore)

// 메뉴가 열려 있는지 여부를 나타내는 상태
const isMenuOpen = ref(false)
// 언어 선택 드롭다운 상태
const isLangMenuOpen = ref(false)

// 사용 가능한 언어 목록
const languages = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '简体中文'
}

// 언어 변경 함수
const changeLang = async (lang: string) => {
  if (lang !== locale.value) {
    await loadLocalMessages(lang)
    locale.value = lang
    localeStore.setLanguage(lang)
  }
  isLangMenuOpen.value = false
}

// 뒤로가기 함수
const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <header class="py-4">
    <div class="flex justify-between items-center bg-orange-300">
      <!-- 뒤로가기 버튼 -->
      <button
          @click="goBack"
          class="p-2 text-gray-600 hover:text-black flex items-center"
      >
        <Icon icon="ion:chevron-back" class="text-2xl" />
      </button>

      <!-- 로고 -->
      <div class="flex-1 text-center">
        <RouterLink to="/">
          <img src="/eSnack24_logo_plain.png" class="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 mx-auto" />
        </RouterLink>
      </div>

      <!-- 언어 선택 드롭다운 -->
      <div class="relative">
        <button
            @click="isLangMenuOpen = !isLangMenuOpen"
            class="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-black"
        >
          <Icon icon="fluent-mdl2:locale-language" />
          <span class="hidden sm:inline">{{ languages[currentLang] }}</span>
        </button>

        <div
            v-if="isLangMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
        >
          <div class="py-1">
            <button
                v-for="(name, code) in languages"
                :key="code"
                @click="changeLang(code)"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
              <Icon
                  v-if="currentLang === code"
                  icon="mdi:check"
                  class="text-green-500"
              />
              <span v-else class="w-6"></span>
              {{ name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>