import { setupBrowser } from './browser';
import { Platform } from './platform';

describe('setupBrowser', () => {

    beforeEach(() => {
        Platform.provider = null;
        Promise = undefined;
    });

    it('should set platform provider', () => {
        expect(Platform.provider).toBeFalsy();
        setupBrowser();
        expect(Platform.provider).not.toBeFalsy();
    });

    it('should set global Promise', () => {
        expect(Promise).toBeFalsy();
        setupBrowser();
        expect(Promise).not.toBeFalsy();
    });

    it('should fail async without setup', (done) => {
        try {
            testAsync();
            fail();
        }
        catch (err) {
            done();
        }
    }, 50);

    it('should allow async', (done) => {
        setupBrowser();

        let result = testAsync();
        result.then(x => {
            expect(x).toBe('The End');
            done();
        });
    }, 50);

    it('should catch async exception', (done) => {
        setupBrowser();

        let result = testAsyncThrow();
        result.then(x => {
            fail();
        }).catch(err => {
            expect(err).toBe('Async Test Error');
            done();
        });
    }, 50);
});

let text = '';

async function testAsync() {
    let text = 'The';
    await delay(1);
    text += ' End';
    return text;
}

async function delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function testAsyncThrow() {
    let text = 'The';
    await delay(1);
    throw 'Async Test Error';
}

describe('browserPlatformProvider', () => {

    setupBrowser();

    describe('httpClient', () => {

        let httpClient = Platform.http();

        it('should fail if bad url', (done) => {
            httpClient.request('bad url').then(fail).catch(done);
        }, 50);

        it('should get from own domain', (done) => {
            httpClient.request('/').then(done).catch(fail);
        }, 50);

        it('should fail without CORS', (done) => {
            httpClient.request('http://www.timeapi.org/utc/now').then(fail).catch(done);
        }, 3000);

        it('should get response with CORS', (done) => {
            httpClient.request('https://po-cdn-app.azureedge.net/Links/BlobImageProxy/profileoverlayblob?url=%2Fportal-images%2FcXFK2ejVck6hrYyEq4jCXg.png').then(done).catch(fail);
        }, 3000);
    });
});