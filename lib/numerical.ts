
import * as util from 'util';
import * as numbers from './funcs/numbers';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';

/**
 * @category Options
 */
export type IsBooleanOptions = {
    loose?: boolean
};

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsBoolean(options?: IsBooleanOptions) {
    return generateValidationDecorator(
        (value) => validator.isBoolean(value, options),
        `Value :value: is not Boolean`);
}

/**
 * 
 * @param bool 
 * @returns 
 * @category Validation Decorator
 */
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

/**
 * @category Options
 */
export type IsDecimalOptions = {
    force_decimal?: boolean; 
    decimal_digits?: string;
    locale?: string;
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsDecimal(options?: IsDecimalOptions) {
    return generateValidationDecorator(
        (value) => validator.isDecimal(value, options),
        `Value :value: not a decimal number`);
}

/**
 * 
 * @param value 
 * @returns 
 * @category Conversion
 */
export function ToInt(value: number | string): number {
    return typeof value === 'string'
                    ? validator.toInt(value)
                    : value;
}

/**
 * 
 * @param min 
 * @param max 
 * @returns 
 * @category Validation Decorator
 */
export function IsIntRange(min: number, max: number) {
    // console.log(`params.IsIntRange ${min} ${max}`);
    return generateValidationDecorator(
        (value) => numbers.IsIntRange(value, min, max),
        `Value :value: not an integer between ${min} and ${max}`);
}

/**
 * @category Options
 */
export type IsIntOptions = {
    min?: number, max?: number,
    allow_leading_zeros?: boolean
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsInt(options?: IsIntOptions) {
    // console.log(`params.IsInt`);
    return generateValidationDecorator(
        (value) => numbers.IsInt(value, options),
        `Value :value: not an integer`);
}

/**
 * 
 * @param value 
 * @returns 
 * @category Conversion
 */
export function ToFloat(value: number | string): number {
    return typeof value === 'string'
                    ? validator.toFloat(value)
                    : value;
}

/**
 * 
 * @param min 
 * @param max 
 * @returns 
 * @category Validation Decorator
 */
export function IsFloatRange(min: number, max: number) {
    return generateValidationDecorator(
        (value) => numbers.IsFloatRange(value, min, max),
        `Value :value: not a float between ${min} and ${max}`);
}

/**
 * @category Options
 */
export type IsFloatOptions = {
    min?: number,
    max?: number,
    locale?: string
};

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsFloat(options?: IsFloatOptions) {
    return generateValidationDecorator(
        (value) => numbers.IsFloat(value, options),
        `Value :value: not a float`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHexadecimal() {
    return generateValidationDecorator(
        (value) => validator.isHexadecimal(value),
        `Value :value: not hexadecimal`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHexColor() {
    return generateValidationDecorator(
        (value) => validator.isHexColor(value),
        `Value :value: not hex color`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHSL() {
    return generateValidationDecorator(
        (value) => validator.isHSL(value),
        `Value :value: not HSL color`);
}
