"use strict";
var Platform = (function () {
    function Platform() {
    }
    Platform.http = function () { return Platform.provider.http(); };
    return Platform;
}());
Platform.urlResolver = function (url) { return url; };
exports.Platform = Platform;
//# sourceMappingURL=platform.js.map