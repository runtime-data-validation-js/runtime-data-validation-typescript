
import { assert } from 'chai';
import {
    IsInt, ValidateAccessor, conversions, setEnabled as ValidateEnabled
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
            // console.log(`IntegerExample value received ${nv} ==> ${this.#value}`);
        }
        get value() { return this.#value; }
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

    it('Should fail to set floating value', function() {
        let failed = false;
        try {
            ie.value = 33.33;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

    it('Should not fail on floating value if validation disabled', function() {
        ValidateEnabled(false);
        ie.value = 33.33;
        assert.equal(ie.value, 33.33);
        // For string conversion, ToInt is called, which will
        // make this into an integer.
        ie.value = '33.33';
        assert.equal(ie.value, 33);
    });

    it('Should restore validation', function() {
        ValidateEnabled(true);
        let failed = false;
        try {
            ie.value = 33.33;
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });

});
