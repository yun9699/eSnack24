import {IPageRequest, IPageResponse} from "../types/commonTypes.ts";

export const InitPageRequest: IPageRequest = {

    page: 0,
    size: 0,
    type: '',
    keyword: '',
    arr: [],
    skip: 0
}

export const InitPageResponse = <E>(): IPageResponse<E> => ({
    list: [] as E[],
    total: 0,
    startPage: 0,
    endPage: 0,
    prev: false,
    next: false,
    pageRequest: InitPageRequest,
});