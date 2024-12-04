
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