
export interface IProduct {
    pno?: number
    ptitle_ko: string
    ptitle_en: string | null
    ptitle_ja: string | null
    ptitle_zh: string | null
    price: number
    pfilename: string
}

export interface IProductDetail {
    product: IProduct
    allergyInfo: string
}