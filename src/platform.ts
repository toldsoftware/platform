export interface PlatformProvider {
    http(): HttpClient;
}

export abstract class Platform {
    static provider: PlatformProvider;
    static http() { return Platform.provider.http(); }
    static urlResolver = (url: string) => url;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';
export type HttpHeaders = { [key: string]: string };

export interface HttpClientResponse<T> {
    dataRaw: any;
    data: T;
    headers: HttpHeaders;
}

export interface HttpClient {
    request<T>(url: string, method?: HttpMethod, data?: any, headers?: HttpHeaders, withCredentials?: boolean): Promise<HttpClientResponse<T>>;
    resolveUrl(url: string): string;
}