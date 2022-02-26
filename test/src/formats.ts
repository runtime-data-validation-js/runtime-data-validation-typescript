
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';

function repeat(str, count) {
    let result = '';
    for (; count; count--) {
      result += str;
    }
    return result;
}  

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

        #etheraddress: string;

        @ValidateAccessor<string>()
        @IsEthereumAddress()
        set etheraddress(nbtc: string) { this.#btcaddress = nbtc; }
        get etheraddress() { return this.#btcaddress; }

        @ValidateParams
        checkEtherAddress(
            @IsEthereumAddress()
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

    const validEther = [
        '0x0000000000000000000000000000000000000001',
        '0x683E07492fBDfDA84457C16546ac3f433BFaa128',
        '0x88dA6B6a8D3590e88E0FcadD5CEC56A7C9478319',
        '0x8a718a84ee7B1621E63E680371e0C03C417cCaF6',
        '0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b42',
    ];
    const invalidEther = [
        '0xGHIJK05pwm37asdf5555QWERZCXV2345AoEuIdHt',
        '0xFCb5AFB808b5679b4911230Aa41FfCD0cd335b422222',
        '0xFCb5AFB808b5679b4911230Aa41FfCD0cd33',
        '0b0110100001100101011011000110110001101111',
        '683E07492fBDfDA84457C16546ac3f433BFaa128',
        '1C6o5CDkLxjsVpnLSuqRs1UBFozXLEwYvU',
    ];

    it('should validate correct Ethereum addresses accessors', function() {
        for (const v of validEther) {
            ce.etheraddress = v;
            assert.equal(v, ce.etheraddress);
        }
    });

    it('should validate correct Ethereum addresses parameters', function() {
        for (const v of validEther) {
            const result = ce.checkEtherAddress(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Ethereum addresses accessors', function() {

        for (const iv of invalidEther) {
            let failed = false;
            try {
                ce.etheraddress = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Ethereum addresses parameters', function() {

        for (const iv of invalidEther) {
            let failed = false;
            try {
                const result = ce.checkEtherAddress(iv);
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

describe('E-Mail', function() {

    class EMAILExample {

        #email: string;

        @ValidateAccessor<string>()
        @IsEmail()
        set email(email: string) { this.#email = email; }
        get email() { return this.#email; }

        @ValidateAccessor<string>()
        @IsEmail({ allow_utf8_local_part: false })
        set emailUTF8(email: string) { this.#email = email; }
        get emailUTF8() { return this.#email; }

        @ValidateAccessor<string>()
        @IsEmail({ allow_display_name: true })
        set emailDN(email: string) { this.#email = email; }
        get emailDN() { return this.#email; }

        @ValidateAccessor<string>()
        @IsEmail({ require_display_name: true })
        set emailDNReq(email: string) { this.#email = email; }
        get emailDNReq() { return this.#email; }

        @ValidateParams
        checkEmail(
            @IsEmail()
            email: string
        ) {
            return email;
        }

        @ValidateParams
        checkEmailUTF8(
            @IsEmail({ allow_utf8_local_part: false })
            email: string
        ) {
            return email;
        }

        @ValidateParams
        checkEmailDN(
            @IsEmail({ allow_display_name: true })
            email: string
        ) {
            return email;
        }

        @ValidateParams
        checkEmailDNReq(
            @IsEmail({ require_display_name: true })
            email: string
        ) {
            return email;
        }

    }

    const ee = new EMAILExample();

    const valid = [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
        '"foobar"@example.com',
        '"  foo  m端ller "@example.com',
        '"foo\\@bar"@example.com',
        `${repeat('a', 64)}@${repeat('a', 63)}.com`,
        `${repeat('a', 64)}@${repeat('a', 63)}.com`,
        `${repeat('a', 31)}@gmail.com`,
        'test@gmail.com',
        'test.1@gmail.com',
        'test@1337.com',
    ];
    const invalid = [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'somename@ｇｍａｉｌ.com',
        'foo@bar.co.uk.',
        'z@co.c',
        'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
        `${repeat('a', 64)}@${repeat('a', 251)}.com`,
        `${repeat('a', 65)}@${repeat('a', 250)}.com`,
        `${repeat('a', 64)}@${repeat('a', 64)}.com`,
        `${repeat('a', 64)}@${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 58)}.com`,
        'test1@invalid.co m',
        'test2@invalid.co m',
        'test3@invalid.co m',
        'test4@invalid.co m',
        'test5@invalid.co m',
        'test6@invalid.co m',
        'test7@invalid.co m',
        'test8@invalid.co m',
        'test9@invalid.co m',
        'test10@invalid.co m',
        'test11@invalid.co m',
        'test12@invalid.co　m',
        'test13@invalid.co　m',
        'multiple..dots@stillinvalid.com',
        'test123+invalid! sub_address@gmail.com',
        'gmail...ignores...dots...@gmail.com',
        'ends.with.dot.@gmail.com',
        'multiple..dots@gmail.com',
        'wrong()[]",:;<>@@gmail.com',
        '"wrong()[]",:;<>@@gmail.com',
        'username@domain.com�',
        'username@domain.com©',
    ];

    it('should validate correct E-Mail accessors', function() {
        for (const v of valid) {
            ee.email = v;
            assert.equal(v, ee.email);
        }
    });

    it('should validate correct E-Mail parameters', function() {
        for (const v of valid) {
            const result = ee.checkEmail(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ee.email = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ee.checkEmail(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validUTF8 = [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        '"foobar"@example.com',
        '"foo\\@bar"@example.com',
        '"  foo  bar  "@example.com',
    ];
    const invalidUTF8 = [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'somename@ｇｍａｉｌ.com',
        'hans.m端ller@test.com',
        'z@co.c',
        'tüst@invalid.com',
    ];

    it('should validate correct E-Mail UTF8 accessors', function() {
        for (const v of validUTF8) {
            ee.emailUTF8 = v;
            assert.equal(v, ee.emailUTF8);
        }
    });

    it('should validate correct E-Mail UTF8 parameters', function() {
        for (const v of validUTF8) {
            const result = ee.checkEmailUTF8(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail UTF8 accessors', function() {

        for (const iv of invalidUTF8) {
            let failed = false;
            try {
                ee.emailUTF8 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail UTF8 parameters', function() {

        for (const iv of invalidUTF8) {
            let failed = false;
            try {
                const result = ee.checkEmailUTF8(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDN = [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        'Some Name <foo@bar.com>',
        'Some Name <x@x.au>',
        'Some Name <foo@bar.com.au>',
        'Some Name <foo+bar@bar.com>',
        'Some Name <hans.m端ller@test.com>',
        'Some Name <hans@m端ller.com>',
        'Some Name <test|123@m端ller.com>',
        'Some Name <test123+ext@gmail.com>',
        '\'Foo Bar, Esq\'<foo@bar.com>',
        'Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name<some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Name <foo@gmail.com>',
        'Name🍓With🍑Emoji🚴‍♀️🏆<test@aftership.com>',
        '🍇🍗🍑<only_emoji@aftership.com>',
        '"<displayNameInBrackets>"<jh@gmail.com>',
        '"\\"quotes\\""<jh@gmail.com>',
        '"name;"<jh@gmail.com>',
        '"name;" <jh@gmail.com>',
    ];
    const invalidDN = [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'Some Name <invalidemail@>',
        'Some Name <invalid.com>',
        'Some Name <@invalid.com>',
        'Some Name <foo@bar.com.>',
        'Some Name <foo@bar.co.uk.>',
        'Some Name foo@bar.co.uk.>',
        'Some Name <foo@bar.co.uk.',
        'Some Name < foo@bar.co.uk >',
        'Name foo@bar.co.uk',
        'Some Name <some..name@gmail.com>',
        'Some Name<emoji_in_address🍈@aftership.com>',
        'invisibleCharacter\u001F<jh@gmail.com>',
        '<displayNameInBrackets><jh@gmail.com>',
        '\\"quotes\\"<jh@gmail.com>',
        '""quotes""<jh@gmail.com>',
        'name;<jh@gmail.com>',
        '    <jh@gmail.com>',
        '"    "<jh@gmail.com>',
    ];

    it('should validate correct E-Mail display name accessors', function() {
        for (const v of validDN) {
            ee.emailDN = v;
            assert.equal(v, ee.emailDN);
        }
    });

    it('should validate correct E-Mail display name parameters', function() {
        for (const v of validDN) {
            const result = ee.checkEmailDN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail display name accessors', function() {

        for (const iv of invalidDN) {
            let failed = false;
            try {
                ee.emailDN = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail display name parameters', function() {

        for (const iv of invalidDN) {
            let failed = false;
            try {
                const result = ee.checkEmailDN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validDNReq = [
      'Some Name <foo@bar.com>',
      'Some Name <x@x.au>',
      'Some Name <foo@bar.com.au>',
      'Some Name <foo+bar@bar.com>',
      'Some Name <hans.m端ller@test.com>',
      'Some Name <hans@m端ller.com>',
      'Some Name <test|123@m端ller.com>',
      'Some Name <test123+ext@gmail.com>',
      'Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
      'Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
      'Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
      'Name<some.name.midd.leNa.me+extension@GoogleMail.com>',
    ];
    const invalidDNReq = [
      'some.name.midd.leNa.me+extension@GoogleMail.com',
      'foo@bar.com',
      'x@x.au',
      'foo@bar.com.au',
      'foo+bar@bar.com',
      'hans.m端ller@test.com',
      'hans@m端ller.com',
      'test|123@m端ller.com',
      'test123+ext@gmail.com',
      'invalidemail@',
      'invalid.com',
      '@invalid.com',
      'foo@bar.com.',
      'foo@bar.co.uk.',
      'Some Name <invalidemail@>',
      'Some Name <invalid.com>',
      'Some Name <@invalid.com>',
      'Some Name <foo@bar.com.>',
      'Some Name <foo@bar.co.uk.>',
      'Some Name foo@bar.co.uk.>',
      'Some Name <foo@bar.co.uk.',
      'Some Name < foo@bar.co.uk >',
      'Name foo@bar.co.uk',
    ];

    it('should validate correct E-Mail display name required accessors', function() {
        for (const v of validDNReq) {
            ee.emailDNReq = v;
            assert.equal(v, ee.emailDNReq);
        }
    });

    it('should validate correct E-Mail display name rquired parameters', function() {
        for (const v of validDNReq) {
            const result = ee.checkEmailDNReq(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail display name required accessors', function() {

        for (const iv of invalidDNReq) {
            let failed = false;
            try {
                ee.emailDNReq = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail display name required parameters', function() {

        for (const iv of invalidDNReq) {
            let failed = false;
            try {
                const result = ee.checkEmailDNReq(iv);
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
