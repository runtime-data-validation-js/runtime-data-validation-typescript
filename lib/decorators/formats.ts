
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';


/**
 * Check if the string is a valid BTC address.
 * 
 * @returns 
 * @category Validation Decorator
 */
 export function IsBtcAddress() {
    return generateValidationDecorator(
        (value) => validators.isBtcAddress(value),
        `Value :value: is not a BTC address`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
 export function IsCreditCard() {
    return generateValidationDecorator(
        (value) => validators.isCreditCard(value),
        `Value :value: is not a Credit Card Number`);
}

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
 * @returns 
 * @category Validation Decorator
 */
 export function IsEAN() {
    return generateValidationDecorator(
        (value) => validators.isEAN(value),
        `Value :value: is not an EAN`);
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
 * @returns 
 * @category Validation Decorator
 */
 export function IsEthereumAddress() {
    return generateValidationDecorator(
        (value) => validators.isEthereumAddress(value),
        `Value :value: is not an Ethereum address`);
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
 * @returns 
 * @category Validation Decorator
 */
 export function IsIBAN() {
    return generateValidationDecorator(
        (value) => validators.isIBAN(value),
        `Value :value: is not an IBAN number`);
}

/**
 * 
 * @param locale 
 * @returns 
 * @category Validation Decorator
 */
 export function IsIdentityCard(locale?: string) {
    return generateValidationDecorator(
        (value) => validators.isIdentityCard(value, locale),
        `Value :value: is not an identity card number`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsIMEI(options?: validators.IsIMEIOptions) {
    return generateValidationDecorator(
        (value) => validators.isIMEI(value, options),
        `Value :value: is not an IMEI number`);
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

/**
 * 
 * @param version 
 * @returns 
 * @category Validation Decorator
 */
 export function IsISBN(version?: number) {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for ISBN ${version}, must be number`);
        }
    }
    return generateValidationDecorator(
        (value) => validators.isISBN(value, version),
        `Value :value: is not an ISBN ${version} number`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
 export function IsISIN() {
    return generateValidationDecorator(
        (value) => validators.isISIN(value),
        `Value :value: is not an ISIN number`);
}
