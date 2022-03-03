
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';


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
