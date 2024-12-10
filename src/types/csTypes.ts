export interface IFaq {
    fno: number;
    admno: number;
    ftitle: string;
    fcategory: string;
    fdelete: number;
    fcontent: string;
    ftitle_en: string | null;
    ftitle_ja: string | null;
    ftitle_zh: string | null;
    fcontent_en: string | null;
    fcontent_ja: string | null;
    fcontent_zh: string | null;
}