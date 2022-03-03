
import * as util from 'util';
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';

/**
 * 
 * @param seed 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function Contains(seed: string, options?: validators.ContainsOptions) {
    return generateValidationDecorator(
        (value) => validators.contains(value, seed, options),
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
        (value) => validators.equals(value, comparison),
        `Value :value: does not equal ${comparison}`);
}

/**
 * 
 * @param locale 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsAlpha(locale?: string, options?: validators.IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validators.isAlpha(value, locale, options),
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
                    options?: validators.IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validators.isAlphanumeric(value, locale, options),
        `Value :value: is not alpha-numeric ${locale}`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
 export function IsAscii() {
    return generateValidationDecorator(
        (value) => validators.isAscii(value),
        `Value :value: is not ASCII encoded`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsBase32() {
    return generateValidationDecorator(
        (value) => validators.isBase32(value),
        `Value :value: is not BASE32 encoded`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsBase58() {
    return generateValidationDecorator(
        (value) => validators.isBase58(value),
        `Value :value: is not BASE58 encoded`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsBase64(options?: validators.IsBase64Options) {
    return generateValidationDecorator(
        (value) => validators.isBase64(value, options),
        `Value :value: is not BASE64 encoded`);
}


/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsByteLength(options?: validators.IsByteLengthOptions) {
    return generateValidationDecorator(
        (value) => validators.isByteLength(value, options),
        `Value :value: is not within byte length ${util.inspect(options)}`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsEmpty(options?: validators.IsEmptyOptions) {
    return generateValidationDecorator(
        (value) => validators.isEmpty(value, options),
        `Value :value: is not empty ${util.inspect(options)}`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
 export function IsFullWidth() {
    return generateValidationDecorator(
        (value) => validators.isFullWidth(value),
        `Value :value: does not have full-width characters`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHalfWidth() {
    return generateValidationDecorator(
        (value) => validators.isHalfWidth(value),
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
        (value) => validators.isIn(value, values),
        `Value :value: is not an allowed value`);
}


/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsJSON(options?: validators.isJSONOptions) {
    return generateValidationDecorator(
        (value) => validators.isJSON(value, options),
        `Value :value: is not JSON`);
}

/**
 * check if the string's length falls in a range.
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsLength(options?: validators.isLengthOptions) {
    return generateValidationDecorator(
        (value) => validators.isLength(value, options),
        `Value :value: string length is not in correct range ${util.inspect(options)}`);
}
