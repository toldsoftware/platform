import { Platform, PlatformProvider } from "./platform";

declare var require: any;

export function setupBrowser() {
    Platform.provider = new BrowserPlatformProvider();
    Promise = require("es6-promise").Promise;
}

class BrowserPlatformProvider implements PlatformProvider {

}