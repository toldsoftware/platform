"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
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
var browser_1 = require("./browser");
var platform_1 = require("./platform");
describe("setupBrowser", function () {
    beforeEach(function () {
        platform_1.Platform.provider = null;
        Promise = undefined;
    });
    it("should set platform provider", function () {
        expect(platform_1.Platform.provider).toBeFalsy();
        browser_1.setupBrowser();
        expect(platform_1.Platform.provider).not.toBeFalsy();
    });
    it("should set global Promise", function () {
        expect(Promise).toBeFalsy();
        browser_1.setupBrowser();
        expect(Promise).not.toBeFalsy();
    });
    it("should fail async without setup", function (done) {
        try {
            testAsync();
            fail();
        }
        catch (err) {
            done();
        }
    }, 50);
    it("should allow async", function (done) {
        browser_1.setupBrowser();
        var result = testAsync();
        result.then(function (x) {
            expect(x).toBe("The End");
            done();
        });
    }, 50);
    it("should catch async exception", function (done) {
        browser_1.setupBrowser();
        var result = testAsyncThrow();
        result.then(function (x) {
            fail();
        }).catch(function (err) {
            expect(err).toBe("Async Test Error");
            done();
        });
    }, 50);
});
var text = "";
function testAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    text = "The";
                    return [4 /*yield*/, delay(1)];
                case 1:
                    _a.sent();
                    text += " End";
                    return [2 /*return*/, text];
            }
        });
    });
}
function delay(milliseconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, milliseconds);
                })];
        });
    });
}
function testAsyncThrow() {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    text = "The";
                    return [4 /*yield*/, delay(1)];
                case 1:
                    _a.sent();
                    throw "Async Test Error";
            }
        });
    });
}
describe("browserPlatformProvider", function () {
    browser_1.setupBrowser();
    describe("httpClient", function () {
        var httpClient = platform_1.Platform.http();
        it("should fail if bad url", function (done) {
            httpClient.request("bad url").then(fail).catch(done);
        }, 50);
        it("should get from own domain", function (done) {
            httpClient.request("/").then(done).catch(fail);
        }, 50);
        it("should fail without CORS", function (done) {
            httpClient.request("http://www.timeapi.org/utc/now").then(fail).catch(done);
        }, 3000);
        it("should get response with CORS", function (done) {
            httpClient.request("https://po-cdn-app.azureedge.net/Links/BlobImageProxy/profileoverlayblob?url=%2Fportal-images%2FcXFK2ejVck6hrYyEq4jCXg.png").then(done).catch(fail);
        }, 3000);
    });
});
//# sourceMappingURL=browser.spec.js.map