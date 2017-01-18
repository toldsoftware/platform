export interface PlatformProvider {
    http(): HttpClient;
}
export declare abstract class Platform {
    static provider: PlatformProvider;
    static http(): HttpClient;
}
export declare type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD";
export declare type HttpHeaders = {
    [key: string]: string;
};
export interface HttpClientResponse {
    data: any;
    headers: HttpHeaders;
}
export interface HttpClient {
    request(url: string, method?: HttpMethod, data?: any, headers?: HttpHeaders): Promise<HttpClientResponse>;
}
