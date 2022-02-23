
import * as util from 'util';
import * as numbers from './funcs/numbers';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';


type IsBooleanOptions = {
    loose?: boolean
};

export function IsBoolean(options?: IsBooleanOptions) {
    return generateValidationDecorator(
        (value) => validator.isBoolean(value, options),
        `Value :value: is not Boolean`);
}

export function ToBoolean(bool: boolean | string): boolean {

    if (typeof bool === 'boolean') return bool;
    if (typeof bool === 'string') {
        if (bool.toLocaleLowerCase() === 'true') return true;
        if (bool === '1') return true;
        if (bool.toLocaleLowerCase() === 'yes') return true;
        if (bool === '0') return false;
        if (bool.toLocaleLowerCase() === 'false') return false;
        if (bool.toLocaleLowerCase() === 'no') return false;
        throw new Error(`ToBoolean got invalid string ${bool}`);
    }
    throw new Error(`ToBoolean received unknown value ${util.inspect(bool)}`);
}

export function ToInt(value: number | string): number {
    return typeof value === 'string'
                    ? validator.toInt(value)
                    : value;
}

export function IsIntRange(min: number, max: number) {
    // console.log(`params.IsIntRange ${min} ${max}`);
    return generateValidationDecorator(
        (value) => numbers.IsIntRange(value, min, max),
        `Value :value: not an integer between ${min} and ${max}`);
}

export function IsInt() {
    // console.log(`params.IsInt`);
    return generateValidationDecorator(
        (value) => numbers.IsInt(value),
        `Value :value: not an integer`);
}

export function ToFloat(value: number | string): number {
    return typeof value === 'string'
                    ? validator.toFloat(value)
                    : value;
}

export function IsFloatRange(min: number, max: number) {
    return generateValidationDecorator(
        (value) => numbers.IsFloatRange(value, min, max),
        `Value :value: not a float between ${min} and ${max}`);
}

export function IsFloat() {
    return generateValidationDecorator(
        (value) => numbers.IsFloat(value),
        `Value :value: not a float`);
}
