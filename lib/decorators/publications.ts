
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../index';


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
 * Check if the string is an International Standard Serial Number (ISSN). {@link https://en.wikipedia.org/wiki/International_Standard_Serial_Number}
 *
 * @param version 
 * @returns 
 * @category Validation Decorator
 */
export function IsISSN(options?: validators.isISSNOptions) {
    return generateValidationDecorator(
        (value) => validators.isISSN(value, options),
        `Value :value: is not an International Standard Serial Number (ISSN)`);
}
