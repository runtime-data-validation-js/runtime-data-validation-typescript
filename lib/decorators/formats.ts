
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';

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
 * @returns 
 * @category Validation Decorator
 */
 export function IsISIN() {
    return generateValidationDecorator(
        (value) => validators.isISIN(value),
        `Value :value: is not an ISIN number`);
}
