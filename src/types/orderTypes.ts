
export interface IOrderItem {

    pno: number
    pfilename: string
    ptitle_ko: string
    price: number
    oiqty: number
    total_amount: string
    oregdate: string
}

export interface IOrder {
    currency: string
    total_amount: number
    total_amount_krw: number
    total_amount_usd: number
}