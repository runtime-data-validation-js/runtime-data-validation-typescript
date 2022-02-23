
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    ValidateParams, ValidateAccessor, IsByteLength
} from 'runtime-data-validation';

describe('Contains', function() {

    class ContainsExample {

        #title: string;

        @ValidateAccessor<string>()
        @Contains('world')
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @Contains('world')
            message: string) {
            return message;
        }
    }

    const ce = new ContainsExample();

    it('Should contain string', function() {
        ce.title = 'Maggies world';
        assert.equal(ce.title, 'Maggies world');
    });

    it('Should fail on bad string', function() {
        let failed = false;
        try {
            ce.title = 'Gillagans Wake';
            assert.equal(ce.title, 'Gillagans Wake');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should echo good param', function() {
        const msg = 'Reiki world';
        const result = ce.echo(msg);
        assert.equal(result, msg);
    });

    it('Should fail on bad parameter', function() {
        let failed = false;
        try {
            const msg = 'Reiki World';
            const result = ce.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});

describe('Equals', function() {
    class EqualsExample {

        #title: string;

        @ValidateAccessor<string>()
        @Equals('world')
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @Equals('world')
            message: string) {
            return message;
        }
    }

    const ee2 = new EqualsExample();

    it('Should equal', function() {
        ee2.title = 'world';
        assert.equal(ee2.title, 'world');
    });

    it('Should fail not equal', function() {
        let failed = false;
        try {
            ee2.title = 'World';
            assert.equal(ee2.title, 'World');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should echo good param', function() {
        const msg = 'world';
        const result = ee2.echo(msg);
        assert.equal(result, msg);
    });

    it('Should fail on bad parameter', function() {
        let failed = false;
        try {
            const msg = 'World';
            const result = ee2.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});

describe('IsAlpha - IsAlphanumeric - IsAscii', function() {

    class AlphaExample {

        #title: string;

        @ValidateAccessor<string>()
        @IsAlpha()
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        #license: string;

        @ValidateAccessor<string>()
        @IsAlphanumeric()
        set license(nt: string) { this.#license = nt; }
        get license() { return this.#license; }

        @ValidateParams
        titlense(
            @IsAlpha()        newtitle: string,
            @IsAlphanumeric() newlicense: string
        ) {
            this.title = newtitle;
            this.license = newlicense;
        }

        @ValidateParams
        checkAscii(
            @IsAscii() checkThis: string
        ) {
            return checkThis;
        }
    }

    const ae = new AlphaExample();

    it('Should set values', function() {
        ae.title = 'GilligansWake';
        assert.equal(ae.title, 'GilligansWake');

        ae.license = '4HDR298';
        assert.equal(ae.license, '4HDR298');

        ae.titlense('BoatWake', 'UBUYGAS1');
        assert.equal(ae.title, 'BoatWake');
        assert.equal(ae.license, 'UBUYGAS1');
    });

    it('Should fail for bad values', function() {
        let failed = false;
        try {
            ae.title = 'Words with Spaces';
            assert.equal(ae.title, 'Words with Spaces');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.license = 'Words with Spaces1234';
            assert.equal(ae.license, 'Words with Spaces1234');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.titlense('Boat Wake', 'UBUYGAS1');
            assert.equal(ae.title, 'Boat Wake');
            assert.equal(ae.license, 'UBUYGAS1');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.titlense('BoatWake', 'U-BUY-GAS-1');
            assert.equal(ae.title, 'BoatWake');
            assert.equal(ae.license, 'U-BUY-GAS-1');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('should validate correct ASCII strings', function() {
        const valid = [
            'foobar',
            '0987654321',
            'test@example.com',
            '1234abcDEF',
        ];
        for (const v of valid) {
            const result = ae.checkAscii(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('should reject non-ASCII strings', function() {
        const invalid = [
            'ｆｏｏbar',
            'ｘｙｚ０９８',
            '１２３456',
            'ｶﾀｶﾅ',
        ];
        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ae.checkAscii(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
});

describe('BASE32 - BASE58', function() {

    class BaseEncoded {

        @ValidateParams
        checkBase64urlSafe(
            @IsBase64({ urlSafe: true }) checked: string
        ) {
            return checked;
        }

        @ValidateParams
        checkBase64(
            @IsBase64() checked: string
        ) {
            return checked;
        }

        @ValidateParams
        checkBase58(
            @IsBase58() checked: string
        ) {
            return checked;
        }

        @ValidateParams
        checkBase32(
            @IsBase32() checked: string
        ) {
            return checked;
        }
    }

    const be = new BaseEncoded();

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE32 strings', function() {
        const valid = [
            'ZG======',
            'JBSQ====',
            'JBSWY===',
            'JBSWY3A=',
            'JBSWY3DP',
            'JBSWY3DPEA======',
            'K5SWYY3PNVSSA5DPEBXG6ZA=',
            'K5SWYY3PNVSSA5DPEBXG6===',
        ];


        for (const v of valid) {
            const result = be.checkBase32(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should reject invalid BASE32 strings', function() {
        const invalid = [
            '12345',
            '',
            'JBSWY3DPtesting123',
            'ZG=====',
            'Z======',
            'Zm=8JBSWY3DP',
            '=m9vYg==',
            'Zm9vYm/y====',
        ];

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = be.checkBase32(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE58 strings', function() {
        const valid = [
            'BukQL',
            '3KMUV89zab',
            '91GHkLMNtyo98',
            'YyjKm3H',
            'Mkhss145TRFg',
            '7678765677',
            'abcodpq',
            'AAVHJKLPY',
        ];


        for (const v of valid) {
            const result = be.checkBase58(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should reject invalid BASE58 strings', function() {
        const invalid = [
            '0OPLJH',
            'IMKLP23',
            'KLMOmk986',
            'LL1l1985hG',
            '*MP9K',
            'Zm=8JBSWY3DP',
            ')()(=9292929MKL',
        ];

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = be.checkBase58(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE64 strings', function() {
        const valid = [
            '',
            'Zg==',
            'Zm8=',
            'Zm9v',
            'Zm9vYg==',
            'Zm9vYmE=',
            'Zm9vYmFy',
            'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
            'Vml2YW11cyBmZXJtZW50dW0gc2VtcGVyIHBvcnRhLg==',
            'U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==',
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuMPNS1Ufof9EW/M98FNw' +
            'UAKrwflsqVxaxQjBQnHQmiI7Vac40t8x7pIb8gLGV6wL7sBTJiPovJ0V7y7oc0Ye' +
            'rhKh0Rm4skP2z/jHwwZICgGzBvA0rH8xlhUiTvcwDCJ0kc+fh35hNt8srZQM4619' +
            'FTgB66Xmp4EtVyhpQV+t02g6NzK72oZI0vnAvqhpkxLeLiMCyrI416wHm5Tkukhx' +
            'QmcL2a6hNOyu0ixX/x2kSFXApEnVrJ+/IxGyfyw8kf4N2IZpW5nEP847lpfj0SZZ' +
            'Fwrd1mnfnDbYohX2zRptLy2ZUn06Qo9pkG5ntvFEPo9bfZeULtjYzIl6K8gJ2uGZ' +
            'HQIDAQAB',
        ];


        for (const v of valid) {
            const result = be.checkBase64(v);
            assert.equal(v, result);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should reject invalid BASE64 strings', function() {
        const invalid = [
            '12345',
            'Vml2YW11cyBmZXJtZtesting123',
            'Zg=',
            'Z===',
            'Zm=8',
            '=m9vYg==',
            'Zm9vYmFy====',
        ];

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = be.checkBase64(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    // Test data copied from https://github.com/validatorjs/validator.js
    it('Should handle BASE64 URLSAFE strings', function() {
        const valid = [
            '',
            'bGFkaWVzIGFuZCBnZW50bGVtZW4sIHdlIGFyZSBmbG9hdGluZyBpbiBzcGFjZQ',
            '1234',
            'bXVtLW5ldmVyLXByb3Vk',
            'PDw_Pz8-Pg',
            'VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw'
        ];


        for (const v of valid) {
            const result = be.checkBase64urlSafe(v,);
            assert.equal(v, result);
        }
    });

});

describe('String size', function() {

    class StringSizeExample {
        #byteLength: string;

        @ValidateAccessor<string>()
        @IsByteLength({ min: 2, max: undefined })
        set byteLengthMin2(ns: string) { this.#byteLength = ns; }
        get byteLengthMin2() { return this.#byteLength; }

        @ValidateAccessor<string>()
        @IsByteLength({ min: 2, max: 3 })
        set byteLengthMin2Max3(ns: string) { this.#byteLength = ns; }
        get byteLengthMin2Max3() { return this.#byteLength; }

        @ValidateAccessor<string>()
        @IsByteLength({ min: 0, max: 0 })
        set byteLength00(ns: string) { this.#byteLength = ns; }
        get byteLength00() { return this.#byteLength; }

        @ValidateParams
        checkByteLengthMin2(
            @IsByteLength({ min: 2, max: undefined })
            ns: string
        ) {
            return ns;
        }

        @ValidateParams
        checkByteLengthMin2Max3(
            @IsByteLength({ min: 2, max: 3 })
            ns: string
        ) {
            return ns;
        }

        @ValidateParams
        checkByteLength00(
            @IsByteLength({ min: 0, max: 0 })
            ns: string
        ) {
            return ns;
        }
    }
    
    const sse = new StringSizeExample();

    const validMin2   = ['abc', 'de', 'abcd', 'ｇｍａｉｌ'];
    const invalidMin2 = ['', 'a'];
    const validMin2Max3 = ['abc', 'de', 'ｇ'];
    const invalidMin2Max3 = ['', 'a', 'abcd', 'ｇｍ'];
    const valid00 = [''];
    const invalid00 = ['ｇ', 'a'];

    it('Should validate accessors min 2', function() {
        for (const v of validMin2) {
            sse.byteLengthMin2 = v;
            assert.equal(v, sse.byteLengthMin2);
        }
    });

    it('Should validate parameters min 2', function() {
        for (const v of validMin2) {
            const result = sse.checkByteLengthMin2(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid accessors min2', function() {
        for (const iv of invalidMin2) {
            let failed = false;
            try {
                sse.byteLengthMin2 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should reject invalid parameters min2', function() {
        for (const iv of invalidMin2) {
            let failed = false;
            try {
                sse.checkByteLengthMin2(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });


    it('Should validate accessors min 2 max 3', function() {
        for (const v of validMin2Max3) {
            sse.byteLengthMin2Max3 = v;
            assert.equal(v, sse.byteLengthMin2Max3);
        }
    });

    it('Should validate parameters min 2 max3', function() {
        for (const v of validMin2Max3) {
            const result = sse.checkByteLengthMin2Max3(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid accessors min 2 max 3', function() {
        for (const iv of invalidMin2Max3) {
            let failed = false;
            try {
                sse.byteLengthMin2Max3 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should reject invalid parameters min 2 max 3', function() {
        for (const iv of invalidMin2Max3) {
            let failed = false;
            try {
                sse.checkByteLengthMin2Max3(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });




    it('Should validate accessors min 0 max 0', function() {
        for (const v of valid00) {
            sse.byteLength00 = v;
            assert.equal(v, sse.byteLength00);
        }
    });

    it('Should validate parameters min 0 max 0', function() {
        for (const v of valid00) {
            const result = sse.checkByteLength00(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid accessors min 0 max 0', function() {
        for (const iv of invalid00) {
            let failed = false;
            try {
                sse.byteLength00 = iv;
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

    it('Should reject invalid parameters min 0 max 0', function() {
        for (const iv of invalid00) {
            let failed = false;
            try {
                sse.checkByteLength00(iv);
            } catch (e) { failed = true; }
            assert(failed, true);
        }
    });

});
