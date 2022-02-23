
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    ToInt, ToFloat,
    IsBoolean, ToBoolean,
    Contains,
    ValidateParams, ValidateAccessor, 
} from 'runtime-data-validation';
import { default as validator } from 'validator';

import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

describe('Integers - IsInt - IsIntRange', function() {
    class IntegerExample {
        #value: number;

        @ValidateAccessor<number>()
        @IsInt()
        set value(nv: number | string) {
            this.#value = ToInt(nv);
        }
        get value() { return this.#value; }

        #range: number;

        @ValidateAccessor<number>()
        @IsIntRange(10, 100)
        set range(nr: number) { this.#range = nr; }
        get range() { return this.#range; }

        @ValidateParams
        scale(
            @IsInt()
            value: number | string,
            @IsFloat()
            factor: number | string
        ) {
            return ToInt(value) * ToFloat(factor);
        }
    }

    const ie = new IntegerExample();

    it('Should set integer value', function() {
        ie.value = 33;
        assert.equal(ie.value, 33);
    });

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
        let result = ie.scale(5, 0.5);
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

    it('Should fail bad scale', function() {
        let failed = false;
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

        #range: number;

        @ValidateAccessor<number>()
        @IsFloatRange(10, 100)
        set range(nr: number | string) {
            this.#range = ToFloat(nr);
        }
        get range() { return this.#range; }

        @ValidateParams
        scale(
            @IsFloat()
            value: number | string,
            @IsFloat()
            factor: number | string
        ) {
            return ToFloat(value) * ToFloat(factor);
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
