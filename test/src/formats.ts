
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    IsFQDN, IsHash,
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

describe('URL - URI - EAN - FQDN - Hash', function() {

    class URLURIExamples {
        #datauri: string;

        @ValidateAccessor<string>()
        @IsDataURI()
        set datauri(nd: string) { this.#datauri = nd; }
        get datauri() { return this.#datauri; }

        @ValidateParams
        checkDataURI(
            @IsDataURI() nd: string
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
            @IsEAN() nd: string
        ) {
            return nd;
        }

        #fqdn: string;

        @ValidateAccessor<string>()
        @IsFQDN()
        set fqdn(nd: string) { this.#fqdn = nd; }
        get fqdn() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ allow_trailing_dot: true })
        set fqdnDOT(nd: string) { this.#fqdn = nd; }
        get fqdnDOT() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ require_tld: false })
        set fqdnTLD(nd: string) { this.#fqdn = nd; }
        get fqdnTLD() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ allow_numeric_tld: true, require_tld: false })
        set fqdnNUMTLD(nd: string) { this.#fqdn = nd; }
        get fqdnNUMTLD() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ allow_wildcard: true })
        set fqdnWILD(nd: string) { this.#fqdn = nd; }
        get fqdnWILD() { return this.#fqdn; }

        @ValidateParams
        checkFQDN(
            @IsFQDN() nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNDOT(
            @IsFQDN({ allow_trailing_dot: true }) nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNTLD(
            @IsFQDN({ require_tld: false }) nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNNUMTLD(
            @IsFQDN({ allow_numeric_tld: true, require_tld: false }) nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNWILD(
            @IsFQDN({ allow_wildcard: true }) nd: string
        ) {
            return nd;
        }

        #hash: string;

        @ValidateAccessor<string>()
        @IsHash('md5')
        set hashMD5(nd: string) { this.#fqdn = nd; }
        get hashMD5() { return this.#fqdn; }

        @ValidateParams
        checkHashMD5(
            @IsHash('md5') nd: string
        ) {
            return nd;
        }

        @ValidateAccessor<string>()
        @IsHash('md4')
        set hashMD4(nd: string) { this.#fqdn = nd; }
        get hashMD4() { return this.#fqdn; }

        @ValidateParams
        checkHashMD4(
            @IsHash('md4') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('ripemd128')
        set hashRIPEMD128(nd: string) { this.#fqdn = nd; }
        get hashRIPEMD128() { return this.#fqdn; }

        @ValidateParams
        checkHashRIPEMD128(
            @IsHash('ripemd128') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('ripemd160')
        set hashRIPEMD160(nd: string) { this.#fqdn = nd; }
        get hashRIPEMD160() { return this.#fqdn; }

        @ValidateParams
        checkHashRIPEMD160(
            @IsHash('ripemd160') nd: string
        ) {
            return nd;
        }



        @ValidateAccessor<string>()
        @IsHash('tiger160')
        set hashTIGER160(nd: string) { this.#fqdn = nd; }
        get hashTIGER160() { return this.#fqdn; }

        @ValidateParams
        checkHashTIGER160(
            @IsHash('tiger160') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('tiger192')
        set hashTIGER192(nd: string) { this.#fqdn = nd; }
        get hashTIGER192() { return this.#fqdn; }

        @ValidateParams
        checkHashTIGER192(
            @IsHash('tiger192') nd: string
        ) {
            return nd;
        }



        @ValidateAccessor<string>()
        @IsHash('sha1')
        set hashSHA1(nd: string) { this.#fqdn = nd; }
        get hashSHA1() { return this.#fqdn; }

        @ValidateParams
        checkHashSHA1(
            @IsHash('sha1') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('sha256')
        set hashSHA256(nd: string) { this.#fqdn = nd; }
        get hashSHA256() { return this.#fqdn; }

        @ValidateParams
        checkHashSHA256(
            @IsHash('sha256') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('sha384')
        set hashSHA384(nd: string) { this.#fqdn = nd; }
        get hashSHA384() { return this.#fqdn; }

        @ValidateParams
        checkHashSHA384(
            @IsHash('sha384') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('sha512')
        set hashSHA512(nd: string) { this.#fqdn = nd; }
        get hashSHA512() { return this.#fqdn; }

        @ValidateParams
        checkHashSHA512(
            @IsHash('sha512') nd: string
        ) {
            return nd;
        }






        @ValidateAccessor<string>()
        @IsHash('crc32')
        set hashCRC32(nd: string) { this.#fqdn = nd; }
        get hashCRC32() { return this.#fqdn; }

        @ValidateParams
        checkHashCRC32(
            @IsHash('crc32') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('crc32b')
        set hashCRC32B(nd: string) { this.#fqdn = nd; }
        get hashCRC32B() { return this.#fqdn; }

        @ValidateParams
        checkHashCRC32B(
            @IsHash('crc32b') nd: string
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

    const validFQDN = [
        'domain.com',
        'dom.plato',
        'a.domain.co',
        'foo--bar.com',
        'xn--froschgrn-x9a.com',
        'rebecca.blackfriday',
        '1337.com',
    ];
    const invalidFQDN = [
        'abc',
        '256.0.0.0',
        '_.com',
        '*.some.com',
        's!ome.com',
        'domain.com/',
        '/more.com',
        'domain.com�',
        'domain.co\u00A0m',
        'domain.co\u1680m',
        'domain.co\u2006m',
        'domain.co\u2028m',
        'domain.co\u2029m',
        'domain.co\u202Fm',
        'domain.co\u205Fm',
        'domain.co\u3000m',
        'domain.com\uDC00',
        'domain.co\uEFFFm',
        'domain.co\uFDDAm',
        'domain.co\uFFF4m',
        'domain.com©',
        'example.0',
        '192.168.0.9999',
        '192.168.0',
    ];

    it('should validate correct FQDN accessors', function() {
        for (const v of validFQDN) {
            uue.fqdn = v;
            assert.equal(v, uue.fqdn);
        }
    });

    it('should validate correct FQDN parameters', function() {
        for (const v of validFQDN) {
            const result = uue.checkFQDN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid FQDN accessors', function() {

        for (const iv of invalidFQDN) {
            let failed = false;
            try {
                uue.fqdn = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid FQDN parameters', function() {

        for (const iv of invalidFQDN) {
            let failed = false;
            try {
                const result = uue.checkFQDN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('should validate correct FQDN trailing dot', function() {
        for (const v of [ 'example.com.' ]) {
            uue.fqdnDOT = v;
            assert.equal(v, uue.fqdnDOT);
            const result = uue.checkFQDNDOT(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid FQDN TLD accessors', function() {

        for (const iv of [ 'example.0',
                            '192.168.0',
                            '192.168.0.9999' ]) {
            let failed = false;
            try {
                uue.fqdnTLD = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);

            failed = false;
            try {
                const result = uue.checkFQDNTLD(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('should validate correct FQDN numeric TLD', function() {
        for (const v of [ 'example.0',
                        '192.168.0',
                        '192.168.0.9999' ]) {
            // console.log(`accessor ${v}`);
            uue.fqdnNUMTLD = v;
            assert.equal(v, uue.fqdnNUMTLD);
            // console.log(`parameter ${v}`);
            const result = uue.checkFQDNNUMTLD(v);
            assert.equal(v, result);
        }
    });

    it('should validate correct FQDN wildcards', function() {
        for (const v of [ '*.example.com',
                            '*.shop.example.com' ]) {
            // console.log(`accessor ${v}`);
            uue.fqdnWILD = v;
            assert.equal(v, uue.fqdnWILD);
            // console.log(`parameter ${v}`);
            const result = uue.checkFQDNWILD(v);
            assert.equal(v, result);
        }
    });


    for (const hash of ['md5', 'md4', 'ripemd128', 'tiger128']) {
        const valid = [
            'd94f3f016ae679c3008de268209132f2',
            '751adbc511ccbe8edf23d486fa4581cd',
            '88dae00e614d8f24cfd5a8b3f8002e93',
            '0bf1c35032a71a14c2f719e5a14c1e96',
            'd94f3F016Ae679C3008de268209132F2',
            '88DAE00e614d8f24cfd5a8b3f8002E93',
        ];
        const invalid = [
            'q94375dj93458w34',
            '39485729348',
            '%&FHKJFvk',
            'KYT0bf1c35032a71a14c2f719e5a1',
        ];
  
        it(`should validate correct ${hash} algorithm`, function() {
            for (const v of valid) {
                // console.log(`accessor ${v}`);
                if (hash === 'md5') {
                    uue.hashMD5 = v;
                    assert.equal(v, uue.hashMD5);
                    const result = uue.checkHashMD5(v);
                    assert.equal(v, result);
                } else if (hash === 'md4') {
                    uue.hashMD4 = v;
                    assert.equal(v, uue.hashMD4);
                    const result = uue.checkHashMD4(v);
                    assert.equal(v, result);
                } else if (hash === 'ripemd128') {
                    uue.hashRIPEMD128 = v;
                    assert.equal(v, uue.hashRIPEMD128);
                    const result = uue.checkHashRIPEMD128(v);
                    assert.equal(v, result);
                }
            }
        });

        it(`should reject invalid ${hash} algorithm`, function() {
            for (const iv of invalid) {
                let failed = false;
                if (hash === 'md5') {
                    failed = false;
                    try {
                        uue.hashMD5 = iv;
                        assert.equal(iv, uue.hashMD5);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashMD5(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'md4') {
                    failed = false;
                    try {
                        uue.hashMD4 = iv;
                        assert.equal(iv, uue.hashMD4);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashMD4(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'ripemd128') {
                    failed = false;
                    try {
                        uue.hashRIPEMD128 = iv;
                        assert.equal(iv, uue.hashRIPEMD128);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    
                    failed = false;
                    try {
                        const result = uue.checkHashRIPEMD128(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                }
            }
        });
    }

    for (const hash of ['crc32', 'crc32b']) {
        const valid = [
            'd94f3f01',
            '751adbc5',
            '88dae00e',
            '0bf1c350',
            '88DAE00e',
            '751aDBc5',
        ];
        const invalid = [
            'KYT0bf1c35032a71a14c2f719e5a14c1',
            'q94375dj93458w34',
            'q943',
            '39485729348',
            '%&FHKJFvk',
        ];
  
        it(`should validate correct ${hash} algorithm`, function() {
            for (const v of valid) {
                // console.log(`accessor ${v}`);
                if (hash === 'crc32') {
                    uue.hashCRC32 = v;
                    assert.equal(v, uue.hashCRC32);
                    const result = uue.checkHashCRC32(v);
                    assert.equal(v, result);
                } else if (hash === 'crc32b') {
                    uue.hashCRC32B = v;
                    assert.equal(v, uue.hashCRC32B);
                    const result = uue.checkHashCRC32B(v);
                    assert.equal(v, result);
                }
            }
        });


        it(`should reject invalid ${hash} algorithm`, function() {
            for (const iv of invalid) {
                let failed = false;
                if (hash === 'crc32') {
                    failed = false;
                    try {
                        uue.hashCRC32 = iv;
                        assert.equal(iv, uue.hashCRC32);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashCRC32(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'crc32b') {
                    failed = false;
                    try {
                        uue.hashCRC32B = iv;
                        assert.equal(iv, uue.hashCRC32B);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashCRC32B(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                }
            }
        });
    }

    for (const hash of ['sha1', 'tiger160', 'ripemd160']) {
        const valid = [
            '3ca25ae354e192b26879f651a51d92aa8a34d8d3',
            'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
            'beb8c3f30da46be179b8df5f5ecb5e4b10508230',
            'efd5d3b190e893ed317f38da2420d63b7ae0d5ed',
            'AAF4c61ddCC5e8a2dabede0f3b482cd9AEA9434D',
            '3ca25AE354e192b26879f651A51d92aa8a34d8D3',
        ];
        const invalid = [
            'KYT0bf1c35032a71a14c2f719e5a14c1',
            'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
            'q94375dj93458w34',
            '39485729348',
            '%&FHKJFvk',
        ];
  
        it(`should validate correct ${hash} algorithm`, function() {
            for (const v of valid) {
                // console.log(`accessor ${v}`);
                if (hash === 'sha1') {
                    uue.hashSHA1 = v;
                    assert.equal(v, uue.hashSHA1);
                    const result = uue.checkHashSHA1(v);
                    assert.equal(v, result);
                } else if (hash === 'tiger160') {
                    uue.hashTIGER160 = v;
                    assert.equal(v, uue.hashTIGER160);
                    const result = uue.checkHashTIGER160(v);
                    assert.equal(v, result);
                } else if (hash === 'ripemd160') {
                    uue.hashRIPEMD160 = v;
                    assert.equal(v, uue.hashRIPEMD160);
                    const result = uue.checkHashRIPEMD160(v);
                    assert.equal(v, result);
                }
            }
        });

        it(`should reject invalid ${hash} algorithm`, function() {
            for (const iv of invalid) {
                let failed = false;
                if (hash === 'sha1') {
                    failed = false;
                    try {
                        uue.hashSHA1 = iv;
                        assert.equal(iv, uue.hashSHA1);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashSHA1(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'tiger160') {
                    failed = false;
                    try {
                        uue.hashTIGER160 = iv;
                        assert.equal(iv, uue.hashTIGER160);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashTIGER160(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'ripemd160') {
                    failed = false;
                    try {
                        uue.hashRIPEMD160 = iv;
                        assert.equal(iv, uue.hashRIPEMD160);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashRIPEMD160(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                }
            }
        });
    }

    const validSHA256 = [
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        '1d996e033d612d9af2b44b70061ee0e868bfd14c2dd90b129e1edeb7953e7985',
        '80f70bfeaed5886e33536bcfa8c05c60afef5a0e48f699a7912d5e399cdcc441',
        '579282cfb65ca1f109b78536effaf621b853c9f7079664a3fbe2b519f435898c',
        '2CF24dba5FB0a30e26E83b2AC5b9E29E1b161e5C1fa7425E73043362938b9824',
        '80F70bFEAed5886e33536bcfa8c05c60aFEF5a0e48f699a7912d5e399cdCC441',
    ];
    const invalidSHA256 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct SHA256 algorithm`, function() {
        for (const v of validSHA256) {
            // console.log(`accessor ${v}`);
            uue.hashSHA256 = v;
            assert.equal(v, uue.hashSHA256);
            const result = uue.checkHashSHA256(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid SHA256 algorithm`, function() {
        for (const iv of invalidSHA256) {
            let failed = false;
            try {
                uue.hashSHA256 = iv;
                assert.equal(iv, uue.hashSHA256);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashSHA256(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validSHA348 = [
        '3fed1f814d28dc5d63e313f8a601ecc4836d1662a19365cbdcf6870f6b56388850b58043f7ebf2418abb8f39c3a42e31',
        'b330f4e575db6e73500bd3b805db1a84b5a034e5d21f0041d91eec85af1dfcb13e40bb1c4d36a72487e048ac6af74b58',
        'bf547c3fc5841a377eb1519c2890344dbab15c40ae4150b4b34443d2212e5b04aa9d58865bf03d8ae27840fef430b891',
        'fc09a3d11368386530f985dacddd026ae1e44e0e297c805c3429d50744e6237eb4417c20ffca8807b071823af13a3f65',
        '3fed1f814d28dc5d63e313f8A601ecc4836d1662a19365CBDCf6870f6b56388850b58043f7ebf2418abb8f39c3a42e31',
        'b330f4E575db6e73500bd3b805db1a84b5a034e5d21f0041d91EEC85af1dfcb13e40bb1c4d36a72487e048ac6af74b58',
    ];
    const invalidSHA348 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct SHA348 algorithm`, function() {
        for (const v of validSHA348) {
            // console.log(`accessor ${v}`);
            uue.hashSHA384 = v;
            assert.equal(v, uue.hashSHA384);
            const result = uue.checkHashSHA384(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid SHA348 algorithm`, function() {
        for (const iv of invalidSHA348) {
            let failed = false;
            try {
                uue.hashSHA384 = iv;
                assert.equal(iv, uue.hashSHA384);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashSHA384(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validSHA512 = [
        '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043',
        '83c586381bf5ba94c8d9ba8b6b92beb0997d76c257708742a6c26d1b7cbb9269af92d527419d5b8475f2bb6686d2f92a6649b7f174c1d8306eb335e585ab5049',
        '45bc5fa8cb45ee408c04b6269e9f1e1c17090c5ce26ffeeda2af097735b29953ce547e40ff3ad0d120e5361cc5f9cee35ea91ecd4077f3f589b4d439168f91b9',
        '432ac3d29e4f18c7f604f7c3c96369a6c5c61fc09bf77880548239baffd61636d42ed374f41c261e424d20d98e320e812a6d52865be059745fdb2cb20acff0ab',
        '9B71D224bd62f3785D96d46ad3ea3d73319bFBC2890CAAdae2dff72519673CA72323C3d99ba5c11d7c7ACC6e14b8c5DA0c4663475c2E5c3adef46f73bcDEC043',
        '432AC3d29E4f18c7F604f7c3c96369A6C5c61fC09Bf77880548239baffd61636d42ed374f41c261e424d20d98e320e812a6d52865be059745fdb2cb20acff0ab',
    ];
    const invalidSHA512 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];
    
    it(`should validate correct SHA512 algorithm`, function() {
        for (const v of validSHA512) {
            // console.log(`accessor ${v}`);
            uue.hashSHA512 = v;
            assert.equal(v, uue.hashSHA512);
            const result = uue.checkHashSHA512(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid SHA512 algorithm`, function() {
        for (const iv of invalidSHA512) {
            let failed = false;
            try {
                uue.hashSHA512 = iv;
                assert.equal(iv, uue.hashSHA512);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashSHA512(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validTIGER192 = [
        '6281a1f098c5e7290927ed09150d43ff3990a0fe1a48267c',
        '56268f7bc269cf1bc83d3ce42e07a85632394737918f4760',
        '46fc0125a148788a3ac1d649566fc04eb84a746f1a6e4fa7',
        '7731ea1621ae99ea3197b94583d034fdbaa4dce31a67404a',
        '6281A1f098c5e7290927ed09150d43ff3990a0fe1a48267C',
        '46FC0125a148788a3AC1d649566fc04eb84A746f1a6E4fa7',
    ];
    const invalidTIGER192 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct TIGER192 algorithm`, function() {
        for (const v of validTIGER192) {
            // console.log(`accessor ${v}`);
            uue.hashTIGER192 = v;
            assert.equal(v, uue.hashTIGER192);
            const result = uue.checkHashTIGER192(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid TIGER192 algorithm`, function() {
        for (const iv of invalidTIGER192) {
            let failed = false;
            try {
                uue.hashTIGER192 = iv;
                assert.equal(iv, uue.hashTIGER192);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashTIGER192(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
});
