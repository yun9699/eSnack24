import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'

// 지원하는 언어 목록 정의
const supportedLocales = ['ko', 'en', 'ja', 'zh']

// 이전에 사용자가 설정한 언어값을 서비스에 사용
const usingLocale = localStorage.getItem('locale')

// 사용자가 서비스의 사용언어를 설정하지 않았다면 기본값으로 한국어 사용
const defaultLocale = usingLocale && supportedLocales.includes(usingLocale) ? usingLocale : 'ko'

const i18n = createI18n({
    locale: defaultLocale, // 기본 언어 설정
    fallbackLocale: 'ko', // 해당하는 언어의 json 내용이 없을시 한국어 출력
    messages: {}, // 레이지 로딩을 위해 초기값 공백
    legacy: false, // Composition API 사용을 위해 false로 설정
    globalInjection: true // 전역에서 사용되게 설정
})

// lazLoading 적용 : https://vue-i18n.intlify.dev/guide/advanced/lazy
export const loadLocalMessages = async (locale: string) => {
    if (typeof locale !== 'string') {
        console.error('Invalid locale type:', locale)
        return
    }

    // 지원하지 않는 언어인 경우 처리
    if (!supportedLocales.includes(locale)) {
        console.error(`Unsupported locale: ${locale}`)
        return
    }

    try {
        const messages = await import(`./locales/json/${locale}.json`)
        i18n.global.setLocaleMessage(locale, messages.default)
        localStorage.setItem('locale', locale)
    } catch (e) {
        console.error(`Failed to load locale ${locale}:`, e)
        return
    }

    i18n.global.locale.value = locale
    return nextTick()
}

// 초기화 함수
const initI18n = async () => {
    try {
        await loadLocalMessages('ko')
        if (usingLocale && usingLocale !== 'ko') {
            await loadLocalMessages(usingLocale)
        }
    } catch (e) {
        console.error('Failed to initialize i18n:', e)
    }
}

initI18n()

export default i18n