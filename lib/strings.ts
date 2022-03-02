

import * as util from 'util';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';


/**
 * @category Options
 */
export type ContainsType = {
    ignoreCase?: boolean;
    minOccurrences?: number;
};

/**
 * 
 * @param seed 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function Contains(seed: string, options?: ContainsType) {
    return generateValidationDecorator(
        (value) => validator.contains(value, seed, options),
        `Value :value: does not contain ${seed}`);
}

/**
 * 
 * @param comparison 
 * @returns 
 * @category Validation Decorator
 */
export function Equals(comparison: string) {
    return generateValidationDecorator(
        (value) => validator.equals(value, comparison),
        `Value :value: does not equal ${comparison}`);
}

/**
 * @category Options
 */
export type IsAlphaOptions = {
    ignore?: string | RegExp;
};

/**
 * 
 * @param locale 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsAlpha(locale?: string,
            options?: IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validator.isAlpha(value, locale, options),
        `Value :value: is not alpha ${locale}`);
}

/**
 * 
 * @param locale 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsAlphanumeric(locale?: string,
            options?: IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validator.isAlphanumeric(value, locale, options),
        `Value :value: is not alpha ${locale}`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsAscii() {
    return generateValidationDecorator(
        (value) => validator.isAscii(value),
        `Value :value: is not ASCII encoded`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsBase32() {
    return generateValidationDecorator(
        (value) => validator.isBase32(value),
        `Value :value: is not BASE32 encoded`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsBase58() {
    return generateValidationDecorator(
        (value) => validator.isBase58(value),
        `Value :value: is not BASE58 encoded`);
}

/**
 * @category Options
 */
export type IsBase64Options = {
    urlSafe?: boolean
};

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsBase64(options?: IsBase64Options) {
    return generateValidationDecorator(
        (value) => validator.isBase64(value, options),
        `Value :value: is not BASE64 encoded`);
}

/**
 * @category Options
 */
export type IsByteLengthOptions = {
    min: number;
    max: number;
};

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsByteLength(options?: IsByteLengthOptions) {
    return generateValidationDecorator(
        (value) => validator.isByteLength(value, options),
        `Value :value: is not within byte length ${util.inspect(options)}`);
}

/**
 * @category Options
 */
export type IsEmptyOptions = {
    ignore_whitespace?: boolean;
};

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsEmpty(options?: IsEmptyOptions) {
    return generateValidationDecorator(
        (value) => validator.isEmpty(value, options),
        `Value :value: is not empty ${util.inspect(options)}`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsFullWidth() {
    return generateValidationDecorator(
        (value) => validator.isFullWidth(value),
        `Value :value: does not have full-width characters`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHalfWidth() {
    return generateValidationDecorator(
        (value) => validator.isHalfWidth(value),
        `Value :value: does not have half-width characters`);
}

/**
 * 
 * @param values 
 * @returns 
 * @category Validation Decorator
 */
export function IsIn(values: Array<string>) {
    return generateValidationDecorator(
        (value) => validator.isIn(value, values),
        `Value :value: is not an allowed value`);
}
