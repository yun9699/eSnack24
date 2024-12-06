
export interface IProduct {
    pno?: number
    ptitle_ko: string
    ptitle_en: string | null
    ptitle_ja: string | null
    ptitle_zh: string | null
    pcontent_ko: string | null
    pcontent_en: string | null
    pcontent_ja: string | null
    pcontent_zh: string | null
    price: number
    pfilename: string
    ano?: number[]
}

export interface IProductDetail {
    product: IProduct
    atitle_ko: string[]
    atitle_en: string[]
    atitle_ja: string[]
    atitle_zh: string[]
    ano?: number[]
}