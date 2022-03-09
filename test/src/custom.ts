
import { assert } from 'chai';
import {
    IsDate, conversions, IsISO8601, 
    ValidateParams, ValidateAccessor, generateValidationDecorator,
    validators
} from 'runtime-data-validation';

type CustomType = {
    flag1: boolean;
    speed: number;
    title?: string;
};

const isCustomType = (value: any): boolean => {
    if (typeof value !== 'object') {
        return false;
    }
    // Both of these fields are required in
    // the type definition
    if (typeof value?.flag1 !== 'boolean'
     || typeof value?.speed !== 'number') {
        return false;
    }
    // Speed must be a positive number
    if (value.speed < 0) {
        return false;
    }
    // This field is optional, and therefore can
    // be undefined.
    if (typeof value?.title !== 'undefined'
     && typeof value?.title !== 'string') {
        return false;
    }
    // Be certain that `title` is correct
    if (typeof value?.title !== 'undefined'
     && typeof value?.title === 'string') {
        if (!validators.isAscii(value.title)
         || !validators.matches(value.title, /^[a-zA-Z0-9 ]+$/)) {
            return false;
        }
    }
    return true;
};

// The previous function, isCustomType, has all the features
// of a Type Guard, but its return value is a `boolean`.  The
// TypeScript documentation describes type guard functions 
// that have a `VARIABLE is TYPE` return type, like this.
// See: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isCustomTypeGuard = (value: any): value is CustomType => {
    if (typeof value !== 'object') {
        return false;
    }
    // Both of these fields are required in
    // the type definition
    if (typeof value?.flag1 !== 'boolean'
     || typeof value?.speed !== 'number') {
        return false;
    }
    // Speed must be a positive number
    if (value.speed < 0) {
        return false;
    }
    // This field is optional, and therefore can
    // be undefined.
    if (typeof value?.title !== 'undefined'
     && typeof value?.title !== 'string') {
        return false;
    }
    // Be certain that `title` is correct
    if (typeof value?.title !== 'undefined'
     && typeof value?.title === 'string') {
        if (!validators.isAscii(value.title)
         || !validators.matches(value.title, /^[a-zA-Z0-9 ]+$/)) {
            return false;
        }
    }
    return true;
};

function IsCustom() {
    return generateValidationDecorator(
        isCustomType,
        `Value :value: is not a CustomType`);
}

function IsCustomRange(min: number, max: number) {
    return generateValidationDecorator(
        (value) => {
            if (!isCustomType(value)) return false;
            const ct = <CustomType>value;
            if (ct.speed < min || ct.speed > max) return false;
            return true;
        },
        `Value :value: is not a CustomType`);
}

function IsCustomGuard() {
    return generateValidationDecorator(
        isCustomTypeGuard,
        `Value :value: is not a CustomType`);
}

describe('Custom Validator', function() {

    class CustomValidationExample {

        #custom: CustomType;

        @ValidateAccessor<CustomType>()
        @IsCustom()
        set custom(nc: CustomType) { this.#custom = nc; }
        get custom() { return this.#custom; }

        #customRange: CustomType;

        @ValidateAccessor<CustomType>()
        @IsCustomRange(0, 100)
        set customRange(nc: CustomType) { this.#customRange = nc; }
        get customRange() { return this.#customRange; }


        #customGuard: CustomType;

        @ValidateAccessor<CustomType>()
        @IsCustomGuard()
        set customGuard(nc: CustomType) { this.#customGuard = nc; }
        get customGuard() { return this.#customGuard; }

    }

    const cve = new CustomValidationExample();

    it('Should accept valid CustomType objects', function() {
        cve.custom = {
            flag1: true,
            speed: 1000
        };
        assert.equal(typeof cve.custom.flag1, 'boolean');
        assert.equal(cve.custom.flag1, true);
        assert.equal(typeof cve.custom.speed, 'number');
        assert.equal(cve.custom.speed, 1000);
        assert.equal(typeof cve.custom.title, 'undefined');
        cve.custom = {
            flag1: false,
            speed: 2000,
            title: 'Hello World'
        };
        assert.equal(typeof cve.custom.flag1, 'boolean');
        assert.equal(cve.custom.flag1, false);
        assert.equal(typeof cve.custom.speed, 'number');
        assert.equal(cve.custom.speed, 2000);
        assert.equal(typeof cve.custom.title, 'string');
        assert.equal(cve.custom.title, 'Hello World');
    });

    it('Should reject invalid field values in CustomType', function() {
        let failed = false;
        try {
            cve.custom = {
                flag1: false,
                speed: -2000,
                title: 'Hello World'
            };
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            cve.custom = {
                flag1: false,
                speed: 2000,
                title: 'Hello, World!'
            };
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    /*
     * To run these tests uncomment this block.  As they are,
     * the compilation errors prevent the test from running
     * and prevents further action in the project.
     *  *--/
    it('Should reject invalid CustomType object', function() {
        let failed = false;
        try {
            cve.custom = 'Fooo';
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            cve.custom = {
                
            };
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            cve.custom = {
                flag1: 'true',
                speed: '1000'
            };
        } catch (e) { 
            // console.log(e);
            failed = true; 
        }
        assert.equal(failed, true);
    });
    /* */

    it('Should accept valid custom speed range', function() {
        cve.customRange = {
            flag1: true,
            speed: 1
        };
        assert.equal(cve.customRange.flag1, true);
        assert.equal(cve.customRange.speed, 1);
        cve.customRange = {
            flag1: true,
            speed: 98.999
        };
        assert.equal(cve.customRange.flag1, true);
        assert.equal(cve.customRange.speed, 98.999);
    });

    it('Should reject invalid speed range', function() {

        let failed = false;
        try {
            cve.customRange = {
                flag1: true,
                speed: 999
            }
        } catch (e) { failed = true; }
        assert.equal(failed, true);

    });


    it('Should accept valid CustomType objects using type guard', function() {
        cve.customGuard = {
            flag1: true,
            speed: 1000
        };
        assert.equal(typeof cve.customGuard.flag1, 'boolean');
        assert.equal(cve.customGuard.flag1, true);
        assert.equal(typeof cve.customGuard.speed, 'number');
        assert.equal(cve.customGuard.speed, 1000);
        assert.equal(typeof cve.customGuard.title, 'undefined');
        cve.customGuard = {
            flag1: false,
            speed: 2000,
            title: 'Hello World'
        };
        assert.equal(typeof cve.customGuard.flag1, 'boolean');
        assert.equal(cve.customGuard.flag1, false);
        assert.equal(typeof cve.customGuard.speed, 'number');
        assert.equal(cve.customGuard.speed, 2000);
        assert.equal(typeof cve.customGuard.title, 'string');
        assert.equal(cve.customGuard.title, 'Hello World');
    });

    it('Should reject invalid field values in CustomType using type guards', function() {
        let failed = false;
        try {
            cve.customGuard = {
                flag1: false,
                speed: -2000,
                title: 'Hello World'
            };
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            cve.customGuard = {
                flag1: false,
                speed: 2000,
                title: 'Hello, World!'
            };
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

});
