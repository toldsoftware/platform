// Vanilla Ajax Requests
// From: http://stackoverflow.com/a/18078705/567524
"use strict";
var Ajax = (function () {
    function Ajax() {
    }
    Ajax.prototype.createXhr = function () {
        if (typeof XMLHttpRequest !== "undefined") {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];
        for (var i = 0; i < versions.length; i++) {
            try {
                return new ActiveXObject(versions[i]);
            }
            catch (e) {
            }
        }
    };
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
    Ajax.prototype.get = function (url, onSuccess, onFail) {
        // var query = [];
        // for (var key in data) {
        //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        // }
        // this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null);
        this.ajax({
            url: url,
            type: "GET",
            success: onSuccess,
            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ':' + information); }
        });
    };
    ;
    Ajax.prototype.post = function (url, data, onSuccess, onFail) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        var dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        this.ajax({
            url: url,
            data: dataString,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: onSuccess,
            error: function (xhr, errorStatus, information) { return onFail(errorStatus + ':' + information); }
        });
    };
    ;
    Ajax.prototype.jsonp = function (url, data, onSuccess, onFail) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        var dataString = query.join('&');
        // this.send(url, callback, 'POST', query.join('&'));
        var src = url
            + (url.indexOf('?') > 0 ? '&' : '?')
            + dataString;
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () { return onSuccess(); };
        script.onerror = function () { return onFail(); };
        document.head.appendChild(script);
    };
    ;
    Ajax.prototype.ajax = function (settings) {
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
        settings.success = settings.success || (function () { });
        settings.error = settings.error || (function () { });
        settings.complete = settings.complete || (function () { });
        settings.beforeSend = settings.beforeSend || (function () { });
        var xhr = this.createXhr();
        var hasCompleted = false;
        setTimeout(function () {
            if (!hasCompleted) {
                settings.error(xhr, 'Timed Out', '');
            }
        }, 30 * 1000);
        var url = settings.url;
        var method = settings.type || 'GET';
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
                    }
                    catch (err) {
                        console.log('ERROR in success handler', err);
                    }
                }
                else {
                    try {
                        settings.error(xhr, '' + xhr.status, '');
                    }
                    catch (err) {
                        console.log('ERROR in error handler', err);
                    }
                }
                try {
                    settings.complete();
                }
                catch (err) {
                    console.log('ERROR in complete handler', err);
                }
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
    };
    return Ajax;
}());
exports.Ajax = Ajax;
//# sourceMappingURL=browser-ajax.js.map