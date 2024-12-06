
export interface IReadUser {

    username: string
    ugender: string
    ucallnumber: string
    ubirth: string
}

export interface IOrderDetail {
    uno: number;
    ono: number;
    oregdate: string;
    orderItems: Array<{
        ptitle_ko: string;
        price: number;
        pfilename: string;
        oiqty: number;
    }>;
}