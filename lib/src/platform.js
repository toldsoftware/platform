"use strict";
var Platform = (function () {
    function Platform() {
    }
    Platform.http = function () { return Platform.provider.http(); };
    return Platform;
}());
exports.Platform = Platform;
//# sourceMappingURL=platform.js.map