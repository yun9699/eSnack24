import { useI18n } from 'vue-i18n'
import { IUserAllergy } from "../types/userRegisterTypes"

export const localeAllergy = () => {
    const { locale } = useI18n()

    // 알레르기명 번역
    const localeAtitle = (allergy: IUserAllergy) => {
        switch (locale.value) {
            case 'en':
                return allergy.atitle_en
            case 'ja':
                return allergy.atitle_ja
            case 'zh':
                return allergy.atitle_zh
            default:
                return allergy.atitle_ko
        }
    }

    return { localeAtitle }
}