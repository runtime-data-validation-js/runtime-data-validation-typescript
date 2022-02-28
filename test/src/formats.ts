
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

describe('ISBN', function() {

    class ISBNExample {
        #isbn: string;
        #isbn10: string;
        #isbn13: string;

        @ValidateAccessor<string>()
        @IsISBN()
        set isbn(ni: string) { this.#isbn = ni; }
        get isbn() { return this.#isbn; }

        @ValidateAccessor<string>()
        @IsISBN(10)
        set isbn10(ni: string) { this.#isbn10 = ni; }
        get isbn10() { return this.#isbn10; }

        @ValidateAccessor<string>()
        @IsISBN(13)
        set isbn13(ni: string) { this.#isbn13 = ni; }
        get isbn13() { return this.#isbn13; }


        @ValidateParams
        checkISBN(
            @IsISBN() ni: string
        ) {
            return ni;
        }

        @ValidateParams
        checkISBN10(
            @IsISBN(10) ni: string
        ) {
            return ni;
        }


        @ValidateParams
        checkISBN13(
            @IsISBN(13) ni: string
        ) {
            return ni;
        }
    }

    const ise = new ISBNExample();

    const valid = [
        '340101319X',
        '9784873113685',
    ];
    const invalid = [
        '3423214121',
        '9783836221190',
    ];

    it('should validate correct ISBN numbers accessors', function() {
        for (const v of valid) {
            ise.isbn = v;
            assert.equal(v, ise.isbn);
        }
    });

    it('should validate correct ISBN numbers parameters', function() {
        for (const v of valid) {
            const result = ise.checkISBN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISBN numbers accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ise.isbn = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISBN numbers parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ise.checkISBN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const valid10 = [
        '3836221195', '3-8362-2119-5', '3 8362 2119 5',
        '1617290858', '1-61729-085-8', '1 61729 085-8',
        '0007269706', '0-00-726970-6', '0 00 726970 6',
        '3423214120', '3-423-21412-0', '3 423 21412 0',
        '340101319X', '3-401-01319-X', '3 401 01319 X',
    ];
    const invalid10 = [
        '3423214121', '3-423-21412-1', '3 423 21412 1',
        '978-3836221191', '9783836221191',
        '123456789a', 'foo', '',
    ];

    it('should validate correct ISBN 10 numbers accessors', function() {
        for (const v of valid10) {
            ise.isbn10 = v;
            assert.equal(v, ise.isbn10);
        }
    });

    it('should validate correct ISBN 10 numbers parameters', function() {
        for (const v of valid10) {
            const result = ise.checkISBN10(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISBN 10 numbers accessors', function() {

        for (const iv of invalid10) {
            let failed = false;
            try {
                ise.isbn10 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISBN 10 numbers parameters', function() {

        for (const iv of invalid10) {
            let failed = false;
            try {
                const result = ise.checkISBN10(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const valid13 = [
        '9783836221191', '978-3-8362-2119-1', '978 3 8362 2119 1',
        '9783401013190', '978-3401013190', '978 3401013190',
        '9784873113685', '978-4-87311-368-5', '978 4 87311 368 5',
    ];
    const invalid13 = [
        '9783836221190', '978-3-8362-2119-0', '978 3 8362 2119 0',
        '3836221195', '3-8362-2119-5', '3 8362 2119 5',
        '01234567890ab', 'foo', '',
    ];

    it('should validate correct ISBN 13 numbers accessors', function() {
        for (const v of valid13) {
            ise.isbn13 = v;
            assert.equal(v, ise.isbn13);
        }
    });

    it('should validate correct ISBN 13 numbers parameters', function() {
        for (const v of valid13) {
            const result = ise.checkISBN13(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISBN 13 numbers accessors', function() {

        for (const iv of invalid13) {
            let failed = false;
            try {
                ise.isbn13 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISBN 13 numbers parameters', function() {

        for (const iv of invalid13) {
            let failed = false;
            try {
                const result = ise.checkISBN13(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('ISIN', function() {

    class ISINExample {
        #isin: string;

        @ValidateAccessor<string>()
        @IsISIN()
        set isin(ni: string) { this.#isin = ni; }
        get isin() { return this.#isin; }

        @ValidateParams
        checkISIN(
            @IsISIN() ni: string
        ) {
            return ni;
        }

    }

    const ise = new ISINExample();
    
    const valid = [
        'AU0000XVGZA3',
        'DE000BAY0017',
        'BE0003796134',
        'SG1G55870362',
        'GB0001411924',
        'DE000WCH8881',
        'PLLWBGD00016',
        'US0378331005',
    ];
    const invalid = [
        'DE000BAY0018',
        'PLLWBGD00019',
        'foo',
        '5398228707871528',
    ];

    it('should validate correct ISIN numbers accessors', function() {
        for (const v of valid) {
            ise.isin = v;
            assert.equal(v, ise.isin);
        }
    });

    it('should validate correct ISIN numbers parameters', function() {
        for (const v of valid) {
            const result = ise.checkISIN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISIN numbers accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ise.isin = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISIN numbers parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ise.checkISIN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});


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
