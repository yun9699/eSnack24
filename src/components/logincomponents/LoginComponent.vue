<!--<script setup lang="ts">-->
<!--import LoginButtons from "./LoginButtons.vue";-->
<!--</script>-->

<!--<template>-->
<!--  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">-->
<!--    <img-->
<!--        src="/eSnack24_logo_full.png"-->
<!--        alt="Logo Image"-->
<!--        class="w-48 md:w-64 h-auto mb-8 cursor-pointer"-->
<!--    />-->
<!--    <div>언어변경 버튼</div>-->
<!--    <div>SNS계정으로 간편하게 로그인/회원가입</div>-->
<!--    <div class="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4">-->

<!--      <LoginButtons/>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--</style>-->


<script setup lang="ts">
import LoginButtons from "./LoginButtons.vue"
import { useI18n } from 'vue-i18n'
import { loadLocalMessages } from '../../i18n'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useLocaleStore } from '../../stores/useLocaleStore'
import { storeToRefs } from 'pinia'

const { t, locale } = useI18n()
const localeStore = useLocaleStore()
const { currentLang } = storeToRefs(localeStore)

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
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <img
        src="/eSnack24_logo_full.png"
        alt="Logo Image"
        class="w-48 md:w-64 h-auto mb-8 cursor-pointer"
    />
    <!-- 언어 선택 드롭다운 -->
    <div class="relative mb-4">
      <button
          @click="isLangMenuOpen = !isLangMenuOpen"
          class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm"
      >
        <Icon icon="fluent-mdl2:locale-language" />
        <span>{{ languages[currentLang] }}</span>
      </button>

      <!-- 드롭다운 메뉴 -->
      <div
          v-if="isLangMenuOpen"
          class="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
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

    <!-- SNS 로그인 텍스트 -->
    <div class="text-gray-600 mb-6">{{ t('login.sns_login') }}</div>

    <div class="w-full max-w-xs md:max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4">
      <LoginButtons/>
    </div>
  </div>
</template>