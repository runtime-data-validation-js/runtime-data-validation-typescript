
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    IsFQDN, IsHash, IsIBAN, IsIMEI, IsISBN,
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

        #iban: string;

        @ValidateAccessor<string>()
        @IsIBAN()
        set iban(ncc: string) { this.#iban = ncc; }
        get iban() { return this.#iban; }

        @ValidateParams
        checkIBAN(
            @IsIBAN()
            iban: string
        ) {
            return iban;
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

    const validIBAN = [
        'SC52BAHL01031234567890123456USD',
        'LC14BOSL123456789012345678901234',
        'MT31MALT01100000000000000000123',
        'SV43ACAT00000000000000123123',
        'EG800002000156789012345180002',
        'BE71 0961 2345 6769',
        'FR76 3000 6000 0112 3456 7890 189',
        'DE91 1000 0000 0123 4567 89',
        'GR96 0810 0010 0000 0123 4567 890',
        'RO09 BCYP 0000 0012 3456 7890',
        'SA44 2000 0001 2345 6789 1234',
        'ES79 2100 0813 6101 2345 6789',
        'CH56 0483 5012 3456 7800 9',
        'GB98 MIDL 0700 9312 3456 78',
        'IL170108000000012612345',
        'IT60X0542811101000000123456',
        'JO71CBJO0000000000001234567890',
        'TR320010009999901234567890',
        'BR1500000000000010932840814P2',
        'LB92000700000000123123456123',
        'IR200170000000339545727003',
        'MZ97123412341234123412341',
    ];
    const invalidIBAN = [
        'XX22YYY1234567890123',
        'FR14 2004 1010 0505 0001 3',
        'FR7630006000011234567890189@',
        'FR7630006000011234567890189😅',
        'FR763000600001123456!!🤨7890189@',
    ];

    it('should validate correct IBAN numbers accessors', function() {
        for (const v of validIBAN) {
            be.iban = v;
            assert.equal(v, be.iban);
        }
    });

    it('should validate correct IBAN numbers parameters', function() {
        for (const v of validIBAN) {
            const result = be.checkIBAN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IBAN numbers accessors', function() {

        for (const iv of invalidIBAN) {
            let failed = false;
            try {
                be.iban = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IBAN numbers parameters', function() {

        for (const iv of invalidIBAN) {
            let failed = false;
            try {
                const result = be.checkIBAN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

