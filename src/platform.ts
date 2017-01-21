export interface PlatformProvider {
    http(): HttpClient;
}

export abstract class Platform {
    static provider: PlatformProvider;
    static http() { return Platform.provider.http(); }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD";
export type HttpHeaders = { [key: string]: string };

export interface HttpClientResponse {
    data: any;
    headers: HttpHeaders;
}

export interface HttpClient {
    request(url: string, method?: HttpMethod, data?: any, headers?: HttpHeaders, withCredentials?: boolean): Promise<HttpClientResponse>;
}