
import { default as validator } from 'validator';

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

export function IsInt(value: number | string) {
    // console.log(`IsInt ${value}`);
    if (typeof value === 'number') {
        if (Number.isInteger(value)) return true;
        else return false;
    }
    else if (validator.isInt(value)) return true;
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

export function IsFloat(value: number | string) {
    // console.log(`IsFloat ${value}`);
    if (typeof value === 'number') return true;
    else if (validator.isFloat(value)) return true;
    return false;
}
