import { defineStore } from 'pinia'
import { ref } from 'vue'
import {loadLocalMessages} from "../i18n.ts";

export const useLocaleStore = defineStore('locale', () => {
    // 현재 선택된 언어 상태 (localStorage에서 가져오거나 기본값 'ko' 사용)
    const currentLang = ref(localStorage.getItem('locale') || 'ko')

    // 언어 변경 함수
    const setLanguage = async (lang: string) => {

        // 선택한 언어로 상태 업데이트
        currentLang.value = lang

        // localStorage에 언어 설정 저장
        localStorage.setItem('locale', lang)

        // 해당 언어의 메시지 파일 로드
        await loadLocalMessages(lang)

        // 언어 변경 로그 출력
        console.log(`The language has been changed to "${languages[lang]}".`);
    }

    // 언어 표시용 객체
    const languages = {
        ko: 'Korean',
        en: 'English',
        ja: 'Japanese',
        zh: 'Chinese'

    }

    return { currentLang, setLanguage }
}, {
    // 새로고침해도 상태 유지
    persist: true
})