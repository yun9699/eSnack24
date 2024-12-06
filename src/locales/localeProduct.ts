import { useI18n } from 'vue-i18n'
import {IProduct} from "../types/productTypes.ts";

export const localeProduct = () => {
    const { locale } = useI18n()

    // 제목 번역
    const localePtitle = (product: IProduct) => {
        switch (locale.value) {
            case 'en':
                return product.ptitle_en
            case 'ja':
                return product.ptitle_ja
            case 'zh':
                return product.ptitle_zh
            default:
                return product.ptitle_ko
        }
    }

    //내용 번역
    const localePcontent = (product: IProduct) => {
        switch (locale.value) {
            case 'en':
                return product.pcontent_en
            case 'ja':
                return product.pcontent_ja
            case 'zh':
                return product.pcontent_zh
            default:
                return product.pcontent_ko
        }
    }

    return {
        localePtitle,
        localePcontent
    }
}