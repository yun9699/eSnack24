import { createI18n } from 'vue-i18n';
import { nextTick } from 'vue';

// 지원하는 언어 목록 정의
const supportedLocales = ['ko', 'en', 'ja', 'zh'];

// 이전에 사용자가 설정한 언어값을 서비스에 사용
const usingLocale = localStorage.getItem('locale');

// 사용자가 서비스의 사용언어를 설정하지 않았다면 브라우저의 언어설정 값 사용
const userLocale = usingLocale || navigator.language;

// 사용자가 서비스에서 지원하는 언어 사용자가 아닐시, 서비스는 한국어를 출력
const defaultLocale = supportedLocales.includes(userLocale) ? userLocale : 'ko';

const i18n = createI18n({
    locale: defaultLocale, // 기본 언어 설정
    fallbackLocale: 'ko', // 해당하는 언어의 json 내용이 없을시 한국어 출력
    messages: {}, // 레이지 로딩을 위해 초기값 공백
    legacy: false, // Composition API 사용을 위해 false로 설정
    globalInjection: true, // 전역에서 사용되게 설정
});

// lazLoading 적용 : https://vue-i18n.intlify.dev/guide/advanced/lazy
export const loadLocalMessages = async (locale: string) => {
    if (!i18n.global.availableLocales.includes(locale)) {
        try {
            const messages = await import(`./locales/json/${locale}.json`);
            i18n.global.setLocaleMessage(locale, messages.default);

            // 사용자가 선택한 언어 localStorage에 저장
            localStorage.setItem('locale', locale);
        } catch (e) {
            console.error(`Failed to load locale ${locale}:`, e);
            return;
        }
    }
    i18n.global.locale.value = locale;

    // nextTick: 컴포넌트가 안정적으로 업데이트되도록 보장
    return nextTick();
};

// 초기 언어 로드
loadLocalMessages(defaultLocale);

export default i18n;