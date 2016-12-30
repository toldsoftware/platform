import { setupBrowser } from "./browser";
import { Platform } from "./platform";

describe("setupBrowser", () => {

    beforeEach(() => {
        Platform.provider = null;
        Promise = undefined;
    });

    it("should set platform provider", () => {
        expect(Platform.provider).toBeFalsy();
        setupBrowser();
        expect(Platform.provider).not.toBeFalsy();
    });

    it("should set global Promise", () => {
        expect(Promise).toBeFalsy();
        setupBrowser();
        expect(Promise).not.toBeFalsy();
    });

    it("should fail async without it setup", (done) => {
        try {
            testAsync();
            fail();
        }
        catch (err) {
            done();
        }
    }, 50);

    it("should allow async", (done) => {
        setupBrowser();

        let result = testAsync();
        result.then(x => {
            expect(x).toBe("The End");
            done();
        });
    }, 50);
});

let text = "";

async function testAsync() {
    let text = "The";
    await delay(1);
    text += " End";
    return text;
}

async function delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

describe("browserPlatformProvider", () => {

    setupBrowser();

    it("should be done", () => {

    });
});