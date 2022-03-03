
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


/**
 * check if the string is a valid latitude-longitude coordinate 
 * in the format `lat,long` or `lat, long`.
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsLatLong(options?: validators.isLatLongOptions) {
    return generateValidationDecorator(
        (value) => validators.isLatLong(value),
        `Value :value: is not an latitude/longitude`);
}

/**
 * check if string matches the format of a country's license plate.
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsLicensePlate(locale?: string) {
    return generateValidationDecorator(
        (value) => validators.isLicensePlate(value, locale),
        `Value :value: is not a car license plate for ${locale}`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
 export function IsLocale() {
    return generateValidationDecorator(
        (value) => validators.isLocale(value),
        `Value :value: is not a locale`);
}

