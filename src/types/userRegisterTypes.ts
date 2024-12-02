
export interface IAddress {

    country: string
    address_line1: string
    address_line2: string
    zipcode: string
    is_primary: string
    uno: string
    state: string
    city: string
    phonenumber: string
}

export interface IUserInfo {

    username: string
    ucallnumber: string
    gender: string
    birth: string
}

export interface IUserAllergy {
    ano: number
    atitle_ko: string
    atitle_en: string
    atitle_ja: string
    atitle_zh: string
}