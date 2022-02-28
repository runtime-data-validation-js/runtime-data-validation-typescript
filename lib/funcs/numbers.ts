
import { default as validator } from 'validator';
import { IsFloatOptions, IsIntOptions } from '../numerical';

export function IsIntRange(value: number | string,
                min: number, max: number) {
    // console.log(`IsIntRange ${value} ${min} ${max}`);
    if (typeof value === 'number') {
        if (Number.isInteger(value)
         && value >= min && value <= max) {
            return true;
        } else return false;
    }
    else if (validator.isInt(value, {
            min: min, max: max
    })) return true;
    return false;
}

export function IsInt(value: number | string, options?: IsIntOptions) {
    // console.log(`IsInt ${value}`);
    if (typeof value === 'number') {
        if (!Number.isInteger(value)) return false;
        if (options) {
            if (typeof options.max !== 'undefined'
             && typeof options.min !== 'undefined') {
                return (value >= options.min && value <= options.max);
            } else if (typeof options.max !== 'undefined') {
                return value <= options.max;
            } else if (typeof options.min !== 'undefined') {
                return value >= options.min;
            } else return true;
        } else return true;
    }
    else if (validator.isInt(value, options)) return true;
    return false;
}

export function IsFloatRange(value: number | string,
                    min: number, max: number) {
    // console.log(`IsFloatRange ${value} ${min} ${max}`);
    if (typeof value === 'number') {
        if (value >= min && value <= max) return true;
        else return false;
    }
    else if (validator.isFloat(value, {
            min: min, max: max
    })) return true;
    return false;
}

export function IsFloat(value: number | string, options?: IsFloatOptions) {
    // console.log(`IsFloat ${value}`);
    if (typeof value === 'number') {
        // console.log(`IsFloat number ${value}`);
        if (options) {
            if (typeof options.max !== 'undefined'
             && typeof options.min !== 'undefined') {
                return (value >= options.min && value <= options.max);
            } else if (typeof options.max !== 'undefined') {
                return value <= options.max;
            } else if (typeof options.min !== 'undefined') {
                return value >= options.min;
            } else return true;
        } else return true;
    } else {
        // console.log(`IsFloat string ${value}`);
        if (validator.isFloat(value, options)) return true;
    }
    return false;
}
