export interface XHR {
    setRequestHeader(header: string, value: string): void;
    getResponseHeader(header: string): string;
    getAllResponseHeaders(): string;
}
export interface AjaxSettings {
    url: string;
    type: "GET" | "POST" | "PUT" | "DELETE" | "HEAD";
    data?: string;
    dataType?: string;
    contentType?: string;
    beforeSend?(xhr: XHR): void;
    success?(data: string, textStatus: string, xhr: XHR): void;
    error?(xhr: XHR, textStatus: string, errorThrown: string): void;
    complete?(): void;
    withCredentials?: boolean;
}
export declare class Ajax {
    constructor();
    private createXhr();
    get(url: string, onSuccess: (response: string) => void, onFail: (error: string) => void): void;
    post(url: string, data: {
        [key: string]: string;
    }, onSuccess: (response: string) => void, onFail: (error: string) => void): void;
    jsonp(url: string, data: {
        [key: string]: string;
    }, onSuccess: () => void, onFail: () => void): void;
    ajax(settings: AjaxSettings): void;
}
