import { useI18n } from 'vue-i18n'
import { IFaq } from "../types/csTypes"

export const localeFAQ = () => {
    const { locale } = useI18n()

    // FAQ 제목 번역
    const localeFtitle = (faq: IFaq) => {
        switch (locale.value) {
            case 'en':
                return faq.ftitle_en
            case 'ja':
                return faq.ftitle_ja
            case 'zh':
                return faq.ftitle_zh
            default:
                return faq.ftitle
        }
    }

    // FAQ 내용 번역
    const localeFcontent = (faq: IFaq) => {
        switch (locale.value) {
            case 'en':
                return faq.fcontent_en
            case 'ja':
                return faq.fcontent_ja
            case 'zh':
                return faq.fcontent_zh
            default:
                return faq.fcontent
        }
    }

    return {
        localeFtitle,
        localeFcontent
    }
}