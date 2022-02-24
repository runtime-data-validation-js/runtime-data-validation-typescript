
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN,
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';

describe('Crypto', function() {

    class CryptoExamples {

        #btcaddress: string;

        @ValidateAccessor<string>()
        @IsBtcAddress()
        set btcaddress(nbtc: string) { this.#btcaddress = nbtc; }
        get btcaddress() { return this.#btcaddress; }

        @ValidateParams
        checkBTCAddress(
            @IsBtcAddress()
            nbtc: string
        ) {
            return nbtc;
        }
    }

    const ce = new CryptoExamples();

    // Test data copied from https://github.com/validatorjs/validator.js
    const validBTC = [
        '1MUz4VMYui5qY1mxUiG8BQ1Luv6tqkvaiL',
        '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
        'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        '14qViLJfdGaP4EeHnDyJbEGQysnCpwk3gd',
        '35bSzXvRKLpHsHMrzb82f617cV4Srnt7hS',
        '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhemt',
        'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
    ];
    const invalidBTC = [
        '4J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
        '0x56F0B8A998425c53c75C4A303D4eF987533c5597',
        'pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g',
        '17VZNX1SN5NlKa8UQFxwQbFeFc3iqRYhem',
        'BC1QW508D6QEJXTDG4Y5R3ZARVAYR0C5XW7KV8F3T4',
    ];


    it('should validate correct BTC addresses accessors', function() {
        for (const v of validBTC) {
            ce.btcaddress = v;
            assert.equal(v, ce.btcaddress);
        }
    });

    it('should validate correct BTC addresses parameters', function() {
        for (const v of validBTC) {
            const result = ce.checkBTCAddress(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid BTC addresses accessors', function() {

        for (const iv of invalidBTC) {
            let failed = false;
            try {
                ce.btcaddress = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid BTC addresses parameters', function() {

        for (const iv of invalidBTC) {
            let failed = false;
            try {
                const result = ce.checkBTCAddress(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
});

describe('Banking', function() {

    class BankingExample {

        #creditCard: string;

        @ValidateAccessor<string>()
        @IsCreditCard()
        set creditCard(ncc: string) { this.#creditCard = ncc; }
        get creditCard() { return this.#creditCard; }

        @ValidateParams
        checkCreditCard(
            @IsCreditCard()
            ncc: string
        ) {
            return ncc;
        }
    }

    const be = new BankingExample();

    const validCC = [
        '375556917985515',
        '36050234196908',
        '4716461583322103',
        '4716-2210-5188-5662',
        '4929 7226 5379 7141',
        '5398228707871527',
        '6283875070985593',
        '6263892624162870',
        '6234917882863855',
        '6234698580215388',
        '6226050967750613',
        '6246281879460688',
        '2222155765072228',
        '2225855203075256',
        '2720428011723762',
        '2718760626256570',
        '6765780016990268',
        '4716989580001715211',
        '8171999927660000',
        '8171999900000000021',
    ];
    
    const invalidCC = [
        'foo',
        'foo',
        '5398228707871528',
        '2718760626256571',
        '2721465526338453',
        '2220175103860763',
        '375556917985515999999993',
        '899999996234917882863855',
        'prefix6234917882863855',
        '623491788middle2863855',
        '6234917882863855suffix',
        '4716989580001715213',
    ];

    it('should validate correct CC numbers accessors', function() {
        for (const v of validCC) {
            be.creditCard = v;
            assert.equal(v, be.creditCard);
        }
    });

    it('should validate correct CC numbers parameters', function() {
        for (const v of validCC) {
            const result = be.checkCreditCard(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid CC numbers accessors', function() {

        for (const iv of invalidCC) {
            let failed = false;
            try {
                be.creditCard = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid CC numbers parameters', function() {

        for (const iv of invalidCC) {
            let failed = false;
            try {
                const result = be.checkCreditCard(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
});

describe('URL - URI - EAN', function() {

    class URLURIExamples {
        #datauri: string;

        @ValidateAccessor<string>()
        @IsDataURI()
        set datauri(nd: string) { this.#datauri = nd; }
        get datauri() { return this.#datauri; }

        @ValidateParams
        checkDataURI(
            @IsDataURI()
            nd: string
        ) {
            return nd;
        }

        #ean: string;

        @ValidateAccessor<string>()
        @IsEAN()
        set ean(nd: string) { this.#ean = nd; }
        get ean() { return this.#ean; }

        @ValidateParams
        checkEAN(
            @IsEAN()
            nd: string
        ) {
            return nd;
        }

    }

    const uue = new URLURIExamples();
    
    const validDataURI = [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
        '   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   ',
        'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2300B1FF%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3C%2Fsvg%3E',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCBmaWxsPSIjMDBCMUZGIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjwvc3ZnPg==',
        ' data:,Hello%2C%20World!',
        ' data:,Hello World!',
        ' data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
        ' data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
        'data:,A%20brief%20note',
        'data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E',
    ];

    const invalidDataURI = [
        'dataxbase64',
        'data:HelloWorld',
        'data:,A%20brief%20invalid%20[note',
        'file:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
        'data:text/html;charset=,%3Ch1%3EHello!%3C%2Fh1%3E',
        'data:text/html;charset,%3Ch1%3EHello!%3C%2Fh1%3E', 'data:base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        '',
        'http://wikipedia.org',
        'base64',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
    ];

    it('should validate correct Data URI accessors', function() {
        for (const v of validDataURI) {
            uue.datauri = v;
            assert.equal(v, uue.datauri);
        }
    });

    it('should validate correct Data URI parameters', function() {
        for (const v of validDataURI) {
            const result = uue.checkDataURI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Data URI accessors', function() {

        for (const iv of invalidDataURI) {
            let failed = false;
            try {
                uue.datauri = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Data URI parameters', function() {

        for (const iv of invalidDataURI) {
            let failed = false;
            try {
                const result = uue.checkDataURI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validEAN = [
        '9421023610112',
        '1234567890128',
        '4012345678901',
        '9771234567003',
        '9783161484100',
        '73513537',
        '00012345600012',
        '10012345678902',
        '20012345678909',
    ];
    const invalidEAN = [
        '5901234123451',
        '079777681629',
        '0705632085948',
    ];

    it('should validate correct EAN accessors', function() {
        for (const v of validEAN) {
            uue.ean = v;
            assert.equal(v, uue.ean);
        }
    });

    it('should validate correct EAN parameters', function() {
        for (const v of validEAN) {
            const result = uue.checkEAN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid EAN accessors', function() {

        for (const iv of invalidEAN) {
            let failed = false;
            try {
                uue.ean = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid EAN parameters', function() {

        for (const iv of invalidEAN) {
            let failed = false;
            try {
                const result = uue.checkEAN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});
