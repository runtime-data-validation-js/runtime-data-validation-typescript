
/* import * as _params from './ParameterValidators';
export const params = _params;
import * as _accessors from './AccessorValidation';
export const accessors = _accessors; */


import * as numbers from './funcs/numbers';
import { generateValidationDecorator } from './validators';
export { ValidateParams, ValidateAccessor } from './validators';
import { default as validator } from 'validator';

export type ContainsType = {
    ignoreCase?: boolean;
    minOccurrences?: number;
};

export function Contains(seed: string, options?: ContainsType) {
    return generateValidationDecorator(
        (value) => validator.contains(value, seed, options),
        `Value :value: does not contain ${seed}`);
}

export function Equals(comparison: string) {
    return generateValidationDecorator(
        (value) => validator.equals(value, comparison),
        `Value :value: does not equal ${comparison}`);
}

// TBD: isAfter 
// isAfter(str [, date]) 	check if the string is a date that's after the specified date (defaults to now).

export type IsAlphaOptions = {
    ignore?: string | RegExp;
};

export function IsAlpha(locale?: string,
            options?: IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validator.isAlpha(value, locale, options),
        `Value :value: is not alpha ${locale}`);
}

export function IsAlphanumeric(locale?: string,
            options?: IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validator.isAlphanumeric(value, locale, options),
        `Value :value: is not alpha ${locale}`);
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
