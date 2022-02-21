
/* import * as _params from './ParameterValidators';
export const params = _params;
import * as _accessors from './AccessorValidation';
export const accessors = _accessors; */


import * as numbers from './funcs/numbers';
import { generateValidationDecorator } from './validators';
export { ValidateParams, ValidateAccessor } from './validators';
import { default as validator } from 'validator';

export function Contains(seed: string, options?: object) {
    return generateValidationDecorator(
        (value) => {
            // console.log(`Contains ${value} ${seed}`);
            return validator.contains(value, seed, options)
        },
        `Value :value: does not contain ${seed}`);
}

export function Equals(comparison: string) {
    return generateValidationDecorator(
        (value) => {
            // console.log(`Contains ${value} ${seed}`);
            return validator.equals(value, comparison)
        },
        `Value :value: does not equal ${comparison}`);
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
