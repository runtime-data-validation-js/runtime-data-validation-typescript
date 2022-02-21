
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains,
    ValidateParams, ValidateAccessor
} from 'runtime-data-validation';

import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

describe('Integers', function() {
    class IntegerExample {
        #value: number;

        @ValidateAccessor()
        @IsInt()
        set value(nv: number) { this.#value = nv; }
        get value() { return this.#value; }

        #range: number;

        @ValidateAccessor()
        @IsIntRange(10, 100)
        set range(nr: number) { this.#range = nr; }
        get range() { return this.#range; }
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
    })
});

describe('Floats', function() {
    class FloatExample {
        #value: number;

        @ValidateAccessor()
        @IsFloat()
        set value(nv: number) { this.#value = nv; }
        get value() { return this.#value; }

        #range: number;

        @ValidateAccessor()
        @IsFloatRange(10, 100)
        set range(nr: number) { this.#range = nr; }
        get range() { return this.#range; }
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
    })
});