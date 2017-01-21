import * as P from "./platform";
import { Ajax, AjaxSettings } from "./browser-ajax";

declare var require: any;

export function setupBrowser() {
    P.Platform.provider = new BrowserPlatformProvider();
    Promise = require("es6-promise").Promise;
}

class BrowserPlatformProvider implements P.PlatformProvider {
    http() {
        return new BrowserHttpClient();
    }
}

class BrowserHttpClient implements P.HttpClient {
    async request(url: string, method?: P.HttpMethod, data?: string, headers?: P.HttpHeaders, withCredentials = false): Promise<P.HttpClientResponse> {
        return new Promise<P.HttpClientResponse>((resolve, reject) => {
            method = method || "GET";

            new Ajax().ajax({
                url: url,
                type: method,
                data: data,
                withCredentials: withCredentials,
                beforeSend: xhr => {
                    if (headers != null) {
                        for (let k in headers) {
                            let v = headers[k];
                            xhr.setRequestHeader(k, v);
                        }
                    }
                },
                success: (data, textStatus, response) => {
                    let headersList = response.getAllResponseHeaders().split("\n").map(x => x.trim().split("="));
                    let headers: P.HttpHeaders = {};
                    headersList.forEach(x => headers[x[0]] = x[1]);
                    resolve({ data: data, headers: headers });
                },
                error: err => reject(err)
            });
        });
    }
}