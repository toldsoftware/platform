// Vanilla Ajax Requests
// From: http://stackoverflow.com/a/18078705/567524

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

declare var ActiveXObject: any;

export class Ajax {

    constructor() {

    }

    private createXhr(): XMLHttpRequest {
        if (typeof XMLHttpRequest !== "undefined") {
            return new XMLHttpRequest();
        }
        let versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        for (let i = 0; i < versions.length; i++) {
            try {
                return new ActiveXObject(versions[i]);
            } catch (e) {
            }
        }
    }

    // private send(url, callback, method, data, async = true) {
    //     var xhr = this.xhr;
    //     xhr.open(method, url, async);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4) {
    //             callback(xhr.responseText);
    //         }
    //     };
    //     if (method == 'POST') {
    //         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     }
    //     xhr.send(data);
    // };

    get(url: string, onSuccess: (response: string) => void, onFail: (error: string) => void) {
        // var query = [];
        // for (var key in data) {
        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        // }

        // this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null);
        this.ajax({
            url: url, // + (query.length ? '?' + query.join('&') : ''),
            type: "GET",
            success: onSuccess,
            error: (xhr, errorStatus, information) => onFail(errorStatus + ':' + information)
        });
    };

    post(url: string, data: { [key: string]: string }, onSuccess: (response: string) => void, onFail: (error: string) => void) {
        let query: string[] = [];
        for (let key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        let dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        this.ajax({
            url: url,
            data: dataString,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: onSuccess,
            error: (xhr, errorStatus, information) => onFail(errorStatus + ':' + information)
        });
    };

    jsonp(url: string, data: { [key: string]: string }, onSuccess: () => void, onFail: () => void) {
        let query: string[] = [];
        for (let key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        let dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        let src = url
            + (url.indexOf('?') > 0 ? '&' : '?')
            + dataString;

        let script = document.createElement('script');
        script.src = src;
        script.onload = () => onSuccess();
        script.onerror = () => onFail();
        document.head.appendChild(script);
    };

    ajax(settings: AjaxSettings) {
        // settings.beforeSend
        // settings.complete
        // settings.contentType
        // settings.data
        // settings.dataType - No Processing Done Null or Text only
        // settings.error
        // settings.processData - Always false
        // settings.success
        // settings.type
        // settings.url

        if (settings.dataType != null && settings.dataType !== 'text') {
            throw 'Ajax Library does not process data - set to null or text';
        }

        settings.success = settings.success || (() => { });
        settings.error = settings.error || (() => { });
        settings.complete = settings.complete || (() => { });
        settings.beforeSend = settings.beforeSend || (() => { });

        let xhr = this.createXhr();

        let hasCompleted = false;
        setTimeout(() => {
            if (!hasCompleted) {
                settings.error(xhr, 'Timed Out', '');
            }
        }, 30 * 1000);

        let url = settings.url;
        let method = settings.type || 'GET';

        xhr.open(method, url, true);
        xhr.withCredentials = settings.withCredentials || false;

        xhr.onerror = function (ev) {
            settings.error(xhr, '' + xhr.status, '' + ev);
        };

        xhr.onreadystatechange = function () {
            // console.log("xhr.onreadystatechange",
            //     "settings.url", settings.url,
            //     "xhr.readyState", xhr.readyState,
            //     "xhr.status", xhr.status,
            //     "xhr.responseText", xhr.responseText.substr(0, 20),
            // );

            if (xhr.readyState === 4) {
                hasCompleted = true;

                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        settings.success(xhr.responseText, '' + xhr.status, xhr);
                    } catch (err) { console.log('ERROR in success handler', err); }
                } else {
                    try {
                        settings.error(xhr, '' + xhr.status, '');
                    } catch (err) { console.log('ERROR in error handler', err); }
                }
                try {
                    settings.complete();
                } catch (err) { console.log('ERROR in complete handler', err); }
            }
        };

        // if (method == 'POST') {
        //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // }

        if (settings.contentType != null) {
            xhr.setRequestHeader('Content-type', settings.contentType);
        }

        settings.beforeSend(xhr);
        xhr.send(settings.data);
    }

}