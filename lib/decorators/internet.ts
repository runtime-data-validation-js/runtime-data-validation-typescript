
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';


/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsDataURI() {
    return generateValidationDecorator(
        (value) => validators.isDataURI(value),
        `Value :value: is not a Data URI`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsEmail(options?: validators.IsEmailOptions) {
    return generateValidationDecorator(
        (value) => validators.isEmail(value, options),
        `Value :value: is not an E-Mail address`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsFQDN(options?: validators.IsFQDNOptions) {
    return generateValidationDecorator(
        (value) => validators.isFQDN(value, options),
        `Value :value: is not a fully qualified domain name`);
}

/**
 * 
 * @param algorithm 
 * @returns 
 * @category Validation Decorator
 */
export function IsHash(algorithm: string) {
    return generateValidationDecorator(
        (value) => validators.isHash(value, algorithm),
        `Value :value: is not a string of hash algorithm`);
}

/**
 * 
 * @param version 
 * @returns 
 * @category Validation Decorator
 */
export function IsIP(version?: number) {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for IP ${version}, must be number`);
        }
    }
    return generateValidationDecorator(
        (value) => validators.isIP(value, version),
        `Value :value: is not an IP ${version} address`);
}

/**
 * 
 * @param version 
 * @returns 
 * @category Validation Decorator
 */
export function IsIPRange(version?: number) {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for IP Range ${version}, must be number`);
        }
    }
    return generateValidationDecorator(
        (value) => validators.isIPRange(value, version),
        `Value :value: is not an IP Range ${version} address`);
}

