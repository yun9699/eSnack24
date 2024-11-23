
export interface IProduct {
    pno?: number
    ptitle_ko: string
    ptitle_en: string | null
    ptitle_ja: string | null
    ptitle_zh: string | null
    price: number
    pfilename: string
    ano: number
}

export interface IProductDetail {
    product: IProduct
    allergyInfo: string
}