
import { assert } from 'chai';
import {
    IsIntRange, IsInt, /* ToInt, */
    IsFloatRange, IsFloat, /* ToFloat, */
    IsBoolean, /* ToBoolean, */ IsDecimal, 
    ValidateParams, ValidateAccessor, conversions
} from 'runtime-data-validation';
import { default as validator } from 'validator';

const ToInt = conversions.ToInt;
const ToFloat = conversions.ToFloat;
const ToBoolean = conversions.ToBoolean;

describe('Integers - IsInt - IsIntRange', function() {
    class IntegerExample {
        #value: number;

        @ValidateAccessor<number>()
        @IsInt()
        set value(nv: number | string) {
            this.#value = ToInt(nv);
        }
        get value() { return this.#value; }

        @ValidateAccessor<number>()
        @IsInt({ allow_leading_zeros: true })
        set valueZEROS(nv: number | string) {
            this.#value = ToInt(nv);
        }
        get valueZEROS() { return this.#value; }

        @ValidateAccessor<number>()
        @IsInt({ min: 10 })
        set valueMIN(nv: number | string) {
            this.#value = ToInt(nv);
        }
        get valueMIN() { return this.#value; }

        @ValidateAccessor<number>()
        @IsInt({ max: 100 })
        set valueMAX(nv: number | string) {
            this.#value = ToInt(nv);
        }
        get valueMAX() { return this.#value; }

        @ValidateAccessor<number>()
        @IsInt({ min: 10, max: 100 })
        set valueMINMAX(nv: number | string) {
            this.#value = ToInt(nv);
        }
        get valueMINMAX() { return this.#value; }

        #range: number;

        @ValidateAccessor<number>()
        @IsIntRange(10, 100)
        set range(nr: number) { this.#range = nr; }
        get range() { return this.#range; }

        @ValidateParams
        scale(
            @IsInt()   value: number | string,
            @IsFloat() factor: number | string
        ) {
            return ToInt(value) * ToFloat(factor);
        }

        @ValidateParams
        checkZEROS(
            @IsInt({ allow_leading_zeros: true }) value: number | string,
        ) {
            return ToInt(value);
        }

        @ValidateParams
        checkMIN(
            @IsInt({ min: 10 }) value: number | string,
        ) {
            return ToInt(value);
        }

        @ValidateParams
        checkMAX(
            @IsInt({ max: 100 }) value: number | string,
        ) {
            return ToInt(value);
        }

        @ValidateParams
        checkMINMAX(
            @IsInt({ min: 10, max: 100 }) value: number | string,
        ) {
            return ToInt(value);
        }
    }

    const ie = new IntegerExample();

    it('Should set integer value', function() {
        ie.value = 33;
        assert.equal(ie.value, 33);
        ie.value = '33';
        assert.equal(ie.value, 33);
        ie.value = '-33';
        assert.equal(ie.value, -33);
    });

    it('Should set integer leading zeros', function() {
        ie.valueZEROS = '0003';
        assert.equal(ie.valueZEROS, 3);
        ie.valueZEROS = '-0003';
        assert.equal(ie.valueZEROS, -3);
    })

    it('Should fail to set floating value', function() {
        let failed = false;
        try {
            ie.value = 33.33;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should set within range', function() {
        ie.range = 10;
        assert.equal(ie.range, 10);
        ie.range = 33;
        assert.equal(ie.range, 33);
        ie.range = 66;
        assert.equal(ie.range, 66);
        ie.range = 100;
        assert.equal(ie.range, 100);

        ie.valueMIN = 11;
        assert.equal(ie.valueMIN, 11);
        ie.valueMAX = 99;
        assert.equal(ie.valueMAX, 99);

        ie.valueMINMAX = 11;
        assert.equal(ie.valueMINMAX, 11);
        ie.valueMINMAX = 99;
        assert.equal(ie.valueMINMAX, 99);
    });

    it('Should fail with out-of-range', function() {
        let failed = false;
        try {
            ie.range = 5;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            ie.range = -5;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            ie.range = 105;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            ie.valueMAX = 105;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            ie.valueMIN = 5;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            ie.valueMINMAX = 5;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            ie.valueMINMAX = 115;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should work with string number', function() {
        ie.value = '3';
        assert.equal(ie.value, 3);
    });

    it('Should fail on invalid data type', function() {
        let failed = false;
        try {
            ie.value = 'Most definitely not a number';
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should handle method params', function() {
        let result = ie.checkMIN(11);
        assert.equal(result, 11);
        result = ie.checkMIN('11');
        assert.equal(result, 11);

        result = ie.checkMAX(91);
        assert.equal(result, 91);
        result = ie.checkMAX('91');
        assert.equal(result, 91);
        result = ie.checkMAX('-91');
        assert.equal(result, -91);

        result = ie.checkMINMAX(11);
        assert.equal(result, 11);
        result = ie.checkMINMAX('11');
        assert.equal(result, 11);
        result = ie.checkMINMAX(91);
        assert.equal(result, 91);
        result = ie.checkMINMAX('91');
        assert.equal(result, 91);

        result = ie.scale(5, 0.5);
        assert.equal(result, 2.5);

        result = ie.scale(5, 2);
        assert.equal(result, 10);
    });

    it('Should handle string method params', function() {
        let result = ie.scale('5', 0.5);
        assert.equal(result, 2.5);

        result = ie.scale(5, '2');
        assert.equal(result, 10);
    });

    it('Should fail bad method parameters', function() {
        let failed = false;

        try {
            assert.equal(ie.checkMIN(-11), -11);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        try {
            assert.equal(ie.checkMAX(111), 111);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);


        try {
            assert.equal(ie.checkMINMAX(-11), -11);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        try {
            assert.equal(ie.checkMINMAX('-11'), '-11');
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        try {
            assert.equal(ie.checkMINMAX(111), 111);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        try {
            assert.equal(ie.checkMINMAX('111'), '111');
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            let result = ie.scale(5.5, 2);
            assert.equal(result, 11);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should fail with bad parameters', function() {
        let failed = false;
        try {
            let result = ie.scale('five point five', 2);
            assert.equal(result, 11);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            let result = ie.scale(5, 'two');
            assert.equal(result, 10);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

});

describe('Floats - IsFloat - IsFloatRange', function() {
    class FloatExample {
        #value: number;

        @ValidateAccessor<number>()
        @IsFloat()
        set value(nv: number | string) {
            this.#value = ToFloat(nv);
        }
        get value() { return this.#value; }

        @ValidateAccessor<number>()
        @IsFloat({ locale: 'en-AU' })
        set valueENAU(nv: number | string) {
            this.#value = ToFloat(nv);
        }
        get valueENAU() { return this.#value; }

        @ValidateAccessor<number>()
        @IsFloat({ locale: 'de-DE' })
        set valueDEDE(nv: number | string) {
            this.#value = ToFloat(nv);
        }
        get valueDEDE() { return this.#value; }

        #range: number;

        @ValidateAccessor<number>()
        @IsFloatRange(10, 100)
        set range(nr: number | string) {
            this.#range = ToFloat(nr);
        }
        get range() { return this.#range; }

        @ValidateAccessor<number>()
        @IsFloat({ min: 10.5 })
        set rangeMIN(nr: number | string) {
            this.#range = ToFloat(nr);
        }
        get rangeMIN() { return this.#range; }

        @ValidateAccessor<number>()
        @IsFloat({ max: 100.5 })
        set rangeMAX(nr: number | string) {
            this.#range = ToFloat(nr);
        }
        get rangeMAX() { return this.#range; }

        @ValidateAccessor<number>()
        @IsFloat({ min: 10.5, max: 100.5 })
        set rangeMINMAX(nr: number | string) {
            this.#range = ToFloat(nr);
        }
        get rangeMINMAX() { return this.#range; }


        @ValidateParams
        scale(
            @IsFloat() value: number | string,
            @IsFloat() factor: number | string
        ) {
            return ToFloat(value) * ToFloat(factor);
        }

        @ValidateParams
        checkFloat(
            @IsFloat() num: number | string
        ) {
            return num;
        }

        @ValidateParams
        checkFloatENAU(
            @IsFloat({ locale: 'en-AU' }) num: number | string
        ) {
            return num;
        }

        @ValidateParams
        checkFloatDEDE(
            @IsFloat({ locale: 'de-DE' }) num: number | string
        ) {
            return num;
        }

        @ValidateParams
        checkFloatMIN(
            @IsFloat({ min: 10.5 }) num: number | string
        ) {
            return num;
        }

        @ValidateParams
        checkFloatMAX(
            @IsFloat({ max: 100.5 }) num: number | string
        ) {
            return num;
        }

        @ValidateParams
        checkFloatMINMAX(
            @IsFloat({ min: 10.5, max: 100.5 }) num: number | string
        ) {
            return num;
        }
    }

    const fe = new FloatExample();

    it('Should set float value', function() {
        fe.value = 33;
        assert.equal(fe.value, 33);
        fe.value = 33.33;
        assert.equal(fe.value, 33.33);
    });

    it('Should not fail to set floating value', function() {
        let failed = false;
        try {
            fe.value = 33.33;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, false);
    });

    it('Should set within range', function() {
        fe.range = 10;
        assert.equal(fe.range, 10);
        fe.range = 33;
        assert.equal(fe.range, 33);
        fe.range = 66;
        assert.equal(fe.range, 66);
        fe.range = 100;
        assert.equal(fe.range, 100);

        fe.rangeMIN = 11;
        assert.equal(fe.rangeMIN, 11);
        fe.rangeMIN = 10.51;
        assert.equal(fe.rangeMIN, 10.51);

        fe.rangeMAX = 100;
        assert.equal(fe.rangeMAX, 100);

        fe.rangeMINMAX = 10.51;
        assert.equal(fe.rangeMINMAX, 10.51);
        fe.rangeMINMAX = 100;
        assert.equal(fe.rangeMINMAX, 100);
    });

    it('Should fail with out-of-range', function() {
        let failed = false;
        try {
            fe.range = 5;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            fe.range = -5;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            fe.range = 105;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            fe.rangeMIN = 10;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            fe.rangeMAX = 120;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            fe.rangeMINMAX = 10;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            fe.rangeMINMAX = 120;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should work with string number', function() {
        fe.value = '3';
        assert.equal(fe.value, 3);
    });

    it('Should fail on invalid data type', function() {
        let failed = false;
        try {
            fe.value = 'Most definitely not a number';
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should handle method params', function() {
        let result = fe.scale(5, 0.5);
        assert.equal(result, 2.5);

        result = fe.scale(5, 2);
        assert.equal(result, 10);
    });

    it('Should handle string method params', function() {
        let result = fe.scale('5', 0.5);
        assert.equal(result, 2.5);

        result = fe.scale(5, '2');
        assert.equal(result, 10);
    });

    it('Should accept float scale', function() {
        let failed = false;
        try {
            let result = fe.scale(5.5, 2);
            assert.equal(result, 11);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, false);
    });

    it('Should fail with bad parameters', function() {
        let failed = false;
        try {
            let result = fe.scale('five point five', 2);
            assert.equal(result, 11);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);

        failed = false;
        try {
            let result = fe.scale(5, 'two');
            assert.equal(result, 10);
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    const validENAU = [
        '123',
        '123.',
        123, 123.123, -123.123,
        '123.123',
        '-123.123',
        0.123, -0.123,
        '-0.123',
        '+0.123',
        '0.123',
        '.0',
        '-.123',
        '+.123',
        '01.123',
        '-0.22250738585072011e-307',
    ];
    const invalidENAU = [
        '123٫123',
        '123,123',
        '  ',
        '',
        '.',
        'foo',
    ];

    it('should validate correct float ENAU accessors', function() {
        for (const v of validENAU) {
            fe.valueENAU = v;
            assert.equal(v, fe.valueENAU);
        }
    });

    it('should validate correct float ENAU parameters', function() {
        for (const v of validENAU) {
            const result = fe.checkFloatENAU(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid float ENAU accessors', function() {

        for (const iv of invalidENAU) {
            let failed = false;
            try {
                fe.valueENAU = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid float ENAU parameters', function() {

        for (const iv of invalidENAU) {
            let failed = false;
            try {
                const result = fe.checkFloatENAU(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDEDE = [
        '123',
        // The following values fail.
        // The issue is that Number.parseFloat() does not
        // support parsing these numbers that have commas 
        // instead of decimal points.
        //
        // https://stackoverflow.com/questions/13412204/localization-of-input-type-number
        //
        // According to that query, the JavaScript spec only
        // allows decimal points and not commas in number strings.
        //
        // I don't know why validator.js supports number strings
        // with commas in them when JavaScript doesn't support this.
        //
        // '123,',
        // '123,123',
        // '-123,123',
        // '-0,123',
        // '+0,123',
        // '0,123',
        // ',0',
        // '-,123',
        // '+,123',
        // '01,123',
        // '-0,22250738585072011e-307',
    ];
    const invalidDEDE = [
        '123.123',
        '123٫123',
        '  ',
        '',
        '.',
        'foo',
    ];


    it('should validate correct float DEDE accessors', function() {
        for (const v of validDEDE) {
            fe.valueDEDE = v;
            console.log(`float DEDE ${v} => ${fe.valueDEDE}`);
            assert.equal(v, fe.valueDEDE);
        }
    });

    it('should validate correct float DEDE parameters', function() {
        for (const v of validDEDE) {
            const result = fe.checkFloatDEDE(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid float DEDE accessors', function() {

        for (const iv of invalidDEDE) {
            let failed = false;
            try {
                fe.valueDEDE = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid float DEDE parameters', function() {

        for (const iv of invalidDEDE) {
            let failed = false;
            try {
                const result = fe.checkFloatDEDE(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    /*
     * THis will have the same issue as de-DE in that the decimal
     * separator is not a '.'
     * 
    args: [{ locale: 'ar-JO' }],
      valid: [
        '123',
        '123٫',
        '123٫123',
        '-123٫123',
        '-0٫123',
        '+0٫123',
        '0٫123',
        '٫0',
        '-٫123',
        '+٫123',
        '01٫123',
        '-0٫22250738585072011e-307',
      ],
      invalid: [
        '123,123',
        '123.123',
        '  ',
        '',
        '.',
        'foo',
      ],
    */

});

describe('Decimals', function() {

    class DecimalExamples {

        #decimal: string;

        @ValidateAccessor<string>()
        @IsDecimal()
        set decimal(nd: string) { this.#decimal = nd; }
        get decimal() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ force_decimal: true })
        set decimalDecimal(nd: string) { this.#decimal = nd; }
        get decimalDecimal() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'en-AU' })
        set decimalENAU(nd: string) { this.#decimal = nd; }
        get decimalENAU() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'bg-BG' })
        set decimalBGBG(nd: string) { this.#decimal = nd; }
        get decimalBGBG() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'cs-CZ' })
        set decimalCSCZ(nd: string) { this.#decimal = nd; }
        get decimalCSCZ() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'ar-JO' })
        set decimalARJO(nd: string) { this.#decimal = nd; }
        get decimalARJO() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'ar-EG' })
        set decimalAREG(nd: string) { this.#decimal = nd; }
        get decimalAREG() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'en-ZM' })
        set decimalENZM(nd: string) { this.#decimal = nd; }
        get decimalENZM() { return this.#decimal; }

        @ValidateAccessor<string>()
        @IsDecimal({ decimal_digits: '2,3' })
        set decimal23(nd: string) { this.#decimal = nd; }
        get decimal23() { return this.#decimal; }

        // purposely invalid locale
        @ValidateAccessor<string>()
        @IsDecimal({ locale: 'is-NOT' })
        set decimalISNOT(nd: string) { this.#decimal = nd; }
        get decimalISNOT() { return this.#decimal; }

        @ValidateParams
        checkDecimal(
            @IsDecimal()
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalDecimal(
            @IsDecimal({ force_decimal: true })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalENAU(
            @IsDecimal({ locale: 'en-AU' })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalBGBG(
            @IsDecimal({ locale: 'bg-BG' })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalCSCZ(
            @IsDecimal({ locale: 'cs-CZ' })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalARJO(
            @IsDecimal({ locale: 'ar-JO' })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalAREG(
            @IsDecimal({ locale: 'ar-EG' })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimalENZM(
            @IsDecimal({ locale: 'en-ZM' })
            nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkDecimal23(
            @IsDecimal({ decimal_digits: '2,3' })
            nd: string
        ) {
            return nd;
        }

        // Purposely invalid locale
        @ValidateParams
        checkDecimalISNOT(
            @IsDecimal({ locale: 'is-NOT' })
            nd: string
        ) {
            return nd;
        }


    }

    const de = new DecimalExamples();

    const valid = [
        '123',
        '00123',
        '-00123',
        '0',
        '-0',
        '+123',
        '0.01',
        '.1',
        '1.0',
        '-.25',
        '-0',
        '0.0000000000001',
    ];
    const invalid = [
        '0,01',
        ',1',
        '1,0',
        '-,25',
        '0,0000000000001',
        '0٫01',
        '٫1',
        '1٫0',
        '-٫25',
        '0٫0000000000001',
        '....',
        ' ',
        '',
        '-',
        '+',
        '.',
        '0.1a',
        'a',
        '\n',
    ];

    it('should validate correct decimals accessors', function() {
        for (const v of valid) {
            de.decimal = v;
            assert.equal(v, de.decimal);
        }
    });

    it('should validate correct decimals parameters', function() {
        for (const v of valid) {
            const result = de.checkDecimal(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                de.decimal = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = de.checkDecimal(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validENAU = [
      '123',
      '00123',
      '-00123',
      '0',
      '-0',
      '+123',
      '0.01',
      '.1',
      '1.0',
      '-.25',
      '-0',
      '0.0000000000001',
    ];
    const invalidENAU = [
      '0,01',
      ',1',
      '1,0',
      '-,25',
      '0,0000000000001',
      '0٫01',
      '٫1',
      '1٫0',
      '-٫25',
      '0٫0000000000001',
      '....',
      ' ',
      '',
      '-',
      '+',
      '.',
      '0.1a',
      'a',
      '\n',
    ];


    it('should validate correct decimals en-AU accessors', function() {
        for (const v of validENAU) {
            de.decimalENAU = v;
            assert.equal(v, de.decimalENAU);
        }
    });

    it('should validate correct decimals en-AU parameters', function() {
        for (const v of validENAU) {
            const result = de.checkDecimalENAU(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals en-AU accessors', function() {

        for (const iv of invalidENAU) {
            let failed = false;
            try {
                de.decimalENAU = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals en-AU parameters', function() {

        for (const iv of invalidENAU) {
            let failed = false;
            try {
                const result = de.checkDecimalENAU(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validBGBG = [
      '123',
      '00123',
      '-00123',
      '0',
      '-0',
      '+123',
      '0,01',
      ',1',
      '1,0',
      '-,25',
      '-0',
      '0,0000000000001',
    ];
    const invalidBGBG = [
      '0.0000000000001',
      '0.01',
      '.1',
      '1.0',
      '-.25',
      '0٫01',
      '٫1',
      '1٫0',
      '-٫25',
      '0٫0000000000001',
      '....',
      ' ',
      '',
      '-',
      '+',
      '.',
      '0.1a',
      'a',
      '\n',
    ];


    it('should validate correct decimals bg-BG accessors', function() {
        for (const v of validBGBG) {
            de.decimalBGBG = v;
            assert.equal(v, de.decimalBGBG);
        }
    });

    it('should validate correct decimals bg-BG parameters', function() {
        for (const v of validBGBG) {
            const result = de.checkDecimalBGBG(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals bg-BG accessors', function() {

        for (const iv of invalidBGBG) {
            let failed = false;
            try {
                de.decimalBGBG = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals bg-BG parameters', function() {

        for (const iv of invalidBGBG) {
            let failed = false;
            try {
                const result = de.checkDecimalBGBG(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validCSCZ = [
      '123',
      '00123',
      '-00123',
      '0',
      '-0',
      '+123',
      '0,01',
      ',1',
      '1,0',
      '-,25',
      '-0',
      '0,0000000000001',
    ];
    const invalidCSCZ = [
      '0.0000000000001',
      '0.01',
      '.1',
      '1.0',
      '-.25',
      '0٫01',
      '٫1',
      '1٫0',
      '-٫25',
      '0٫0000000000001',
      '....',
      ' ',
      '',
      '-',
      '+',
      '.',
      '0.1a',
      'a',
      '\n',
    ];

    it('should validate correct decimals cs-CZ accessors', function() {
        for (const v of validCSCZ) {
            de.decimalCSCZ = v;
            assert.equal(v, de.decimalCSCZ);
        }
    });

    it('should validate correct decimals cs-CZ parameters', function() {
        for (const v of validCSCZ) {
            const result = de.checkDecimalCSCZ(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals cs-CZ accessors', function() {

        for (const iv of invalidCSCZ) {
            let failed = false;
            try {
                de.decimalCSCZ = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals cs-CZ parameters', function() {

        for (const iv of invalidCSCZ) {
            let failed = false;
            try {
                const result = de.checkDecimalCSCZ(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validARJO = [
      '123',
      '00123',
      '-00123',
      '0',
      '-0',
      '+123',
      '0٫01',
      '٫1',
      '1٫0',
      '-٫25',
      '-0',
      '0٫0000000000001',
    ];
    const invalidARJO = [
      '0,0000000000001',
      '0,01',
      ',1',
      '1,0',
      '-,25',
      '0.0000000000001',
      '0.01',
      '.1',
      '1.0',
      '-.25',
      '....',
      ' ',
      '',
      '-',
      '+',
      '.',
      '0.1a',
      'a',
      '\n',
    ];

    it('should validate correct decimals ar-JO accessors', function() {
        for (const v of validARJO) {
            de.decimalARJO = v;
            assert.equal(v, de.decimalARJO);
        }
    });

    it('should validate correct decimals ar-JO parameters', function() {
        for (const v of validARJO) {
            const result = de.checkDecimalARJO(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals ar-JO accessors', function() {

        for (const iv of invalidARJO) {
            let failed = false;
            try {
                de.decimalARJO = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals ar-JO parameters', function() {

        for (const iv of invalidARJO) {
            let failed = false;
            try {
                const result = de.checkDecimalARJO(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validAREG = [
      '0.01',
    ];
    const invalidAREG = [
      '0,01',
    ];

    it('should validate correct decimals ar-EG accessors', function() {
        for (const v of validAREG) {
            de.decimalAREG = v;
            assert.equal(v, de.decimalAREG);
        }
    });

    it('should validate correct decimals ar-EG parameters', function() {
        for (const v of validAREG) {
            const result = de.checkDecimalAREG(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals ar-EG accessors', function() {

        for (const iv of invalidAREG) {
            let failed = false;
            try {
                de.decimalAREG = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals ar-EG parameters', function() {

        for (const iv of invalidAREG) {
            let failed = false;
            try {
                const result = de.checkDecimalAREG(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validENZM = [
      '0,01',
    ];
    const invalidENZM = [
      '0.01',
    ];


    it('should validate correct decimals en-ZM accessors', function() {
        for (const v of validENZM) {
            de.decimalENZM = v;
            assert.equal(v, de.decimalENZM);
        }
    });

    it('should validate correct decimals en-ZM parameters', function() {
        for (const v of validENZM) {
            const result = de.checkDecimalENZM(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals en-ZM accessors', function() {

        for (const iv of invalidENZM) {
            let failed = false;
            try {
                de.decimalENZM = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals en-ZM parameters', function() {

        for (const iv of invalidENZM) {
            let failed = false;
            try {
                const result = de.checkDecimalENZM(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDecimal = [
        '0.01',
        '.1',
        '1.0',
        '-.25',
        '0.0000000000001',
    ];
    const invalidDecimal = [
        '-0',
        '123',
        '00123',
        '-00123',
        '0',
        '-0',
        '+123',
        '0,0000000000001',
        '0,01',
        ',1',
        '1,0',
        '-,25',
        '....',
        ' ',
        '',
        '-',
        '+',
        '.',
        '0.1a',
        'a',
        '\n',
    ];


    it('should validate correct decimals decimal accessors', function() {
        for (const v of validDecimal) {
            de.decimalDecimal = v;
            assert.equal(v, de.decimalDecimal);
        }
    });

    it('should validate correct decimals decimal parameters', function() {
        for (const v of validDecimal) {
            const result = de.checkDecimalDecimal(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals decimal accessors', function() {

        for (const iv of invalidDecimal) {
            let failed = false;
            try {
                de.decimalDecimal = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals decimal parameters', function() {

        for (const iv of invalidDecimal) {
            let failed = false;
            try {
                const result = de.checkDecimalDecimal(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const valid23 = [
        '123',
        '00123',
        '-00123',
        '0',
        '-0',
        '+123',
        '0.01',
        '1.043',
        '.15',
        '-.255',
        '-0',
    ];
    const invalid23 = [
        '0.0000000000001',
        '0.0',
        '.1',
        '1.0',
        '-.2564',
        '0.0',
        '٫1',
        '1٫0',
        '-٫25',
        '0٫0000000000001',
        '....',
        ' ',
        '',
        '-',
        '+',
        '.',
        '0.1a',
        'a',
        '\n',
    ];

    it('should validate correct decimals decimal_digits: 2,3 accessors', function() {
        for (const v of valid23) {
            de.decimal23 = v;
            assert.equal(v, de.decimal23);
        }
    });

    it('should validate correct decimals  decimal_digits: 2,3 parameters', function() {
        for (const v of valid23) {
            const result = de.checkDecimal23(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid decimals  decimal_digits: 2,3 accessors', function() {

        for (const iv of invalid23) {
            let failed = false;
            try {
                de.decimal23 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid decimals  decimal_digits: 2,3 parameters', function() {

        for (const iv of invalid23) {
            let failed = false;
            try {
                const result = de.checkDecimal23(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const invalidISNOT = [
      '123',
      '0.01',
      '0,01',
    ];

    it('Should reject invalid locale accessors', function() {

        for (const iv of invalidISNOT) {
            let failed = false;
            try {
                de.decimalISNOT = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid  invalid locale parameters', function() {

        for (const iv of invalidISNOT) {
            let failed = false;
            try {
                const result = de.checkDecimalISNOT(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });


});

describe('Logic', function() {

    class LogicExample {

        #flag: boolean;

        @ValidateAccessor<boolean>()
        @IsBoolean()
        set flag(nb: boolean | string) {
            this.#flag = ToBoolean(nb);
        }
        get flag() { return this.#flag; }

        #flagloose: boolean;

        @ValidateAccessor<boolean>()
        @IsBoolean({ loose: true })
        set flagloose(nb: boolean | string) {
            this.#flagloose = ToBoolean(nb);
        }
        get flagloose() { return this.#flagloose; }

        @ValidateParams
        checkBooleanLoose(
            @IsBoolean({ loose: true })
            nb: boolean | string
        ): boolean {
            return ToBoolean(nb);
        }

        @ValidateParams
        checkBoolean(
            @IsBoolean()
            nb: boolean | string
        ): boolean {
            return ToBoolean(nb);
        }
    }

    const le = new LogicExample();

    // Test data copied from https://github.com/validatorjs/validator.js
    const valid = [
        [ 'true',   true  ],
        [ 'false',  false ],
        [ '0',      false ],
        [ '1',      true  ]
    ];
    const invalid = [
        '1.0',
        '0.0',
        'true ',
        'False',
        'True',
        'yes',
    ];

    const validLoose = [
        [ 'true',    true  ],
        [ 'True',    true  ],
        [ 'TRUE',    true  ],
        [ 'false',   false ],
        [ 'False',   false ],
        [ 'FALSE',   false ],
        [ '0',       false ],
        [ '1',       true  ],
        [ 'yes',     true  ],
        [ 'Yes',     true  ],
        [ 'YES',     true  ],
        [ 'no',      false ],
        [ 'No',      false ],
        [ 'NO',      false ],
    ];
    const invalidLoose = [
        '1.0',
        '0.0',
        'true ',
        ' false',
    ];


    it('Should accept valid boolean accessors', function() {

        for (const v of valid) {
            le.flag = v[0];
            // console.log(`valid boolean ${v[0]} => ${le.flag} CHECK ${v[1]}`);
            assert.equal(le.flag, v[1]);
        }
    });

    it('Should accept valid boolean loose accessors', function() {

        for (const v of validLoose) {
            le.flagloose = v[0];
            // console.log(`valid loose boolean ${v[0]} => ${le.flagloose} CHECK ${v[1]}`);
            assert.equal(le.flagloose, v[1]);
        }
    });

    it('Should accept valid boolean parameters', function() {

        for (const v of valid) {
            const result = le.checkBoolean(v[0]);
            assert.equal(result, v[1]);
        }
    });

    it('Should accept valid boolean loose parameters', function() {

        for (const v of validLoose) {
            const result = le.checkBooleanLoose(v[0]);
            assert.equal(result, v[1]);
        }
    });


    it('Should reject invalid boolean accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                le.flag = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid boolean parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = le.checkBoolean(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
});
