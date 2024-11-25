export interface Review {
    rno: number
    pno: number
    uno: number
    rcontent: string
    rdelete: boolean
    rstar: number
    rimage: string | null
    rregDate: string
    rmodDate: string
}

export interface ReviewRegister {
    uno: number
    pno: number
    rstar: number
    rcontent: string
    rimage?: string
}