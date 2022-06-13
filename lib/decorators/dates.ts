
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../index';

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsDate(options?: validators.IsDateOptions) {
    return generateValidationDecorator(
        (value) => validators.isDate(value, options),
        `Value :value: is not a Date`);
}

/**
 * Check if the string is a valid ISO 8601 date. 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsISO8601(options?: validators.IsISO8601Options) {
    return generateValidationDecorator(
        (value) => validators.isISO8601(value, options),
        `Value :value: is not an ISO 8601 Date`);
}

/**
 * Check if the string is a valid ISO 8601 Duration string.
 * @returns 
 */
 export function IsISO8601Duration() {
    return generateValidationDecorator(
        (value) => validators.isISO8601Duration(value),
        `Value :value: is not an ISO8601 Duration string`);

}

/**
 * check if the string is a valid RFC 3339 date.
 * {@link https://tools.ietf.org/html/rfc3339}
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsRFC3339() {
    return generateValidationDecorator(
        (value) => validators.isRFC3339(value),
        `Value :value: is not an RFC 3339 Date`);
}
