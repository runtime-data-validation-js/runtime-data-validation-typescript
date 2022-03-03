
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    IsFQDN, IsHash, IsIBAN, IsIMEI, IsISBN, IsISIN,
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';


describe('IMEI', function() {

    class IMEIExample {
        #imei: string;

        @ValidateAccessor<string>()
        @IsIMEI()
        set imei(ni: string) { this.#imei = ni; }
        get imei() { return this.#imei; }

        @ValidateAccessor<string>()
        @IsIMEI({ allow_hyphens: true })
        set imeiHyphens(ni: string) { this.#imei = ni; }
        get imeiHyphens() { return this.#imei; }

        @ValidateParams
        checkIMEI(
            @IsIMEI() ni: string
        ) {
            return ni;
        }

        @ValidateParams
        checkIMEIHyphens(
            @IsIMEI({ allow_hyphens: true }) ni: string
        ) {
            return ni;
        }
    }

    const ie = new IMEIExample();

    const valid = [
        '352099001761481',
        '868932036356090',
        '490154203237518',
        '546918475942169',
        '998227667144730',
        '532729766805999',
    ];
    const invalid = [
        '490154203237517',
        '3568680000414120',
        '3520990017614823',
    ];


    it('should validate correct IMEI numbers accessors', function() {
        for (const v of valid) {
            ie.imei = v;
            assert.equal(v, ie.imei);
        }
    });

    it('should validate correct IMEI numbers parameters', function() {
        for (const v of valid) {
            const result = ie.checkIMEI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IMEI numbers accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ie.imei = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IMEI numbers parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ie.checkIMEI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validHY = [
        '35-209900-176148-1',
        '86-893203-635609-0',
        '49-015420-323751-8',
        '54-691847-594216-9',
        '99-822766-714473-0',
        '53-272976-680599-9',
    ];
    const invalidHY = [
        '49-015420-323751-7',
        '35-686800-0041412-0',
        '35-209900-1761482-3',
    ];

    it('should validate correct IMEI-Hyphens numbers accessors', function() {
        for (const v of validHY) {
            ie.imeiHyphens = v;
            assert.equal(v, ie.imeiHyphens);
        }
    });

    it('should validate correct IMEI-Hyphens numbers parameters', function() {
        for (const v of validHY) {
            const result = ie.checkIMEIHyphens(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IMEI-Hyphens numbers accessors', function() {

        for (const iv of invalidHY) {
            let failed = false;
            try {
                ie.imeiHyphens = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IMEI-Hyphens numbers parameters', function() {

        for (const iv of invalidHY) {
            let failed = false;
            try {
                const result = ie.checkIMEIHyphens(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });


});
