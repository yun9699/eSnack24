
export interface IProduct {

    pno?: number;
    ptitle_ko: string;
    price: number;
    pfilename: string;
}

export interface IProductDetail {

    product: IProduct;
    atitle_ko: string[]
}