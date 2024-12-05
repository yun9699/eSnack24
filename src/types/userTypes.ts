
export interface IReadUser {

    username: string
    ugender: string
    ucallnumber: string
    ubirth: string
}
export interface IUser {
    uno?: number;
}


export interface IOrderItem {
    uno?: IUser;
    ptitle_ko: string;
    price: number;
    pfilename: string;
    oiqty: number;
}