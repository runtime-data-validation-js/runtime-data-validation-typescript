
import { assert } from 'chai';
import {
    IsDate, ToDate, IsHexadecimal, IsHexColor, IsHSL,
    ValidateParams, ValidateAccessor
} from 'runtime-data-validation';

describe('Hexadecimal - Hex Color', function() {

    class HexExample {

        #hex: string;

        @ValidateAccessor<string>()
        @IsHexadecimal()
        set hex(nh: string) { this.#hex = nh; }
        get hex() { return this.#hex; }

        @ValidateParams
        checkHexadecimal(
            @IsHexadecimal() nh: string 
        ) {
            return nh;
        }

        #hexcolor: string;

        @ValidateAccessor<string>()
        @IsHexColor()
        set hexcolor(nh: string) { this.#hexcolor = nh; }
        get hexcolor() { return this.#hexcolor; }

        @ValidateParams
        checkHexColor(
            @IsHexColor() nh: string 
        ) {
            return nh;
        }

        #hsl: string;

        @ValidateAccessor<string>()
        @IsHSL()
        set hsl(nh: string) { this.#hsl = nh; }
        get hsl() { return this.#hsl; }

        @ValidateParams
        checkHSL(
            @IsHSL() nh: string 
        ) {
            return nh;
        }
    }

    const he = new HexExample();

    const validHEX = [
        'deadBEEF',
        'ff0044',
        '0xff0044',
        '0XfF0044',
        '0x0123456789abcDEF',
        '0X0123456789abcDEF',
        '0hfedCBA9876543210',
        '0HfedCBA9876543210',
        '0123456789abcDEF',
    ];
    const invalidHEX = [
        'abcdefg',
        '',
        '..',
        '0xa2h',
        '0xa20x',
        '0x0123456789abcDEFq',
        '0hfedCBA9876543210q',
        '01234q56789abcDEF',
    ];

    it('Should handle valid HEX strings accessors', function() {
        for (let v of validHEX) {
            he.hex = v;
            assert.equal(v, he.hex);
        }
    });

    it('Should handle valid HEX strings parameters', function() {
        for (let v of validHEX) {
            const result = he.checkHexadecimal(v);
            assert.equal(v, result);
        }
    });


    it('Should reject invalid HEX strings accessors', function() {
        for (let iv of invalidHEX) {
            let failed = false;
            try {
                he.hex = iv;
                assert.equal(iv, he.hex);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid HEX strings parameters', function() {
        for (let iv of invalidHEX) {
            let failed = false;
            try {
                const result = he.checkHexadecimal(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validHexColor = [
        '#ff0000ff',
        '#ff0034',
        '#CCCCCC',
        '0f38',
        'fff',
        '#f00',
    ];
    const invalidHexColor = [
        '#ff',
        'fff0a',
        '#ff12FG',
    ];

    it('Should handle valid HEX color strings accessors', function() {
        for (let v of validHexColor) {
            he.hexcolor = v;
            assert.equal(v, he.hexcolor);
        }
    });

    it('Should handle valid HEX color strings parameters', function() {
        for (let v of validHexColor) {
            const result = he.checkHexColor(v);
            assert.equal(v, result);
        }
    });


    it('Should reject invalid HEX color strings accessors', function() {
        for (let iv of invalidHexColor) {
            let failed = false;
            try {
                he.hexcolor = iv;
                assert.equal(iv, he.hexcolor);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid HEX color strings parameters', function() {
        for (let iv of invalidHexColor) {
            let failed = false;
            try {
                const result = he.checkHexColor(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validHSL = [
        'hsl(360,0000000000100%,000000100%)',
        'hsl(000010, 00000000001%, 00000040%)',
        'HSL(00000,0000000000100%,000000100%)',
        'hsL(0, 0%, 0%)',
        'hSl(  360  , 100%  , 100%   )',
        'Hsl(  00150  , 000099%  , 01%   )',
        'hsl(01080, 03%, 4%)',
        'hsl(-540, 03%, 4%)',
        'hsla(+540, 03%, 4%)',
        'hsla(+540, 03%, 4%, 500)',
        'hsl(+540deg, 03%, 4%, 500)',
        'hsl(+540gRaD, 03%, 4%, 500)',
        'hsl(+540.01e-98rad, 03%, 4%, 500)',
        'hsl(-540.5turn, 03%, 4%, 500)',
        'hsl(+540, 03%, 4%, 500e-01)',
        'hsl(+540, 03%, 4%, 500e+80)',
        'hsl(4.71239rad, 60%, 70%)',
        'hsl(270deg, 60%, 70%)',
        'hsl(200, +.1%, 62%, 1)',
        'hsl(270 60% 70%)',
        'hsl(200, +.1e-9%, 62e10%, 1)',
        'hsl(.75turn, 60%, 70%)',
        // 'hsl(200grad+.1%62%/1)', //supposed to pass, but need to handle delimiters
        'hsl(200grad +.1% 62% / 1)',
        'hsl(270, 60%, 50%, .15)',
        'hsl(270, 60%, 50%, 15%)',
        'hsl(270 60% 50% / .15)',
        'hsl(270 60% 50% / 15%)',
    ];
    const invalidHSL = [
        'hsl (360,0000000000100%,000000100%)',
        'hsl(0260, 100 %, 100%)',
        'hsl(0160, 100%, 100%, 100 %)',
        'hsl(-0160, 100%, 100a)',
        'hsl(-0160, 100%, 100)',
        'hsl(-0160 100%, 100%, )',
        'hsl(270 deg, 60%, 70%)',
        'hsl( deg, 60%, 70%)',
        'hsl(, 60%, 70%)',
        'hsl(3000deg, 70%)',
    ];

    it('Should handle valid HSL color strings accessors', function() {
        for (let v of validHSL) {
            he.hsl = v;
            assert.equal(v, he.hsl);
        }
    });

    it('Should handle valid HSL color strings parameters', function() {
        for (let v of validHSL) {
            const result = he.checkHSL(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid HSL color strings accessors', function() {
        for (let iv of invalidHSL) {
            let failed = false;
            try {
                he.hsl = iv;
                assert.equal(iv, he.hsl);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid HSL color strings parameters', function() {
        for (let iv of invalidHSL) {
            let failed = false;
            try {
                const result = he.checkHSL(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});
