
export interface IPageResponse<E> {

    list: E[];
    total: number;
    startPage: number;
    endPage: number;
    prev: boolean;
    next: boolean;
    pageRequest: IPageRequest;
}

export interface IPageRequest {

    page: number
    size: number
    type: string
    keyword: string
    arr: []
    skip: number
}