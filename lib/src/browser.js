"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var P = require("./platform");
var browser_ajax_1 = require("./browser-ajax");
function setupBrowser() {
    P.Platform.provider = new BrowserPlatformProvider();
    Promise = require('es6-promise').Promise;
}
exports.setupBrowser = setupBrowser;
var BrowserPlatformProvider = (function () {
    function BrowserPlatformProvider() {
    }
    BrowserPlatformProvider.prototype.http = function () {
        return new BrowserHttpClient();
    };
    return BrowserPlatformProvider;
}());
var BrowserHttpClient = (function () {
    function BrowserHttpClient() {
    }
    BrowserHttpClient.prototype.request = function (url, method, data, headers, withCredentials) {
        if (withCredentials === void 0) { withCredentials = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        method = method || 'GET';
                        if (typeof data === 'object' && data.constructor === Object) {
                            data = JSON.stringify(data);
                        }
                        new browser_ajax_1.Ajax().ajax({
                            url: _this.resolveUrl(url),
                            type: method,
                            data: data,
                            withCredentials: withCredentials,
                            beforeSend: function (xhr) {
                                if (headers != null) {
                                    for (var k in headers) {
                                        var v = headers[k];
                                        xhr.setRequestHeader(k, v);
                                    }
                                }
                            },
                            success: function (data, textStatus, response) {
                                var headersList = response.getAllResponseHeaders().split('\n').map(function (x) { return x.trim().split('='); });
                                var headers = {};
                                headersList.forEach(function (x) { return headers[x[0]] = x[1]; });
                                var dataObj = null;
                                try {
                                    dataObj = JSON.parse(data);
                                }
                                catch (err) {
                                }
                                resolve({ dataRaw: data, data: dataObj, headers: headers });
                            },
                            error: function (err) { return reject(err); }
                        });
                    })];
            });
        });
    };
    BrowserHttpClient.prototype.resolveUrl = function (url) { return P.Platform.urlResolver(url); };
    return BrowserHttpClient;
}());
//# sourceMappingURL=browser.js.map