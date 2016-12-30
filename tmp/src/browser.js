"use strict";
var platform_1 = require("./platform");
function setupBrowser() {
    platform_1.Platform.provider = new BrowserPlatformProvider();
    Promise = require("es6-promise").Promise;
}
exports.setupBrowser = setupBrowser;
var BrowserPlatformProvider = (function () {
    function BrowserPlatformProvider() {
    }
    return BrowserPlatformProvider;
}());
//# sourceMappingURL=browser.js.map