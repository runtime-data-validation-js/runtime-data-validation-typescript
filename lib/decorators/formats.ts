
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
 * @param locale 
 * @returns 
 * @category Validation Decorator
 */
 export function IsLicensePlate(locale?: string) {
    return generateValidationDecorator(
        (value) => validators.isLicensePlate(value, locale),
        `Value :value: is not a car license plate for ${locale}`);
}

/**
 * check if the string is a locale
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsLocale() {
    return generateValidationDecorator(
        (value) => validators.isLocale(value),
        `Value :value: is not a locale`);
}

/**
 * check if the string is a mobile phone number,
 * 
 * @param locale 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
export function IsMobilePhone(locale?: string, options?: validators.isMobilePhoneOptions) {
    return generateValidationDecorator(
        (value) => validators.isMobilePhone(value, locale, options),
        `Value :value: is not a mobile phone number`);
}


/**
 * check if the string is a valid hex-encoded representation of a MongoDB ObjectId. {@link http://docs.mongodb.org/manual/reference/object-id/}
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsMongoId() {
    return generateValidationDecorator(
        (value) => validators.isMongoId(value),
        `Value :value: is not a MongoDB ID`);
}

/**
 * check if the string is a valid passport number.
 * 
 * @param countryCode 
 * @returns 
 * @category Validation Decorator
 */
export function IsPassportNumber(countryCode?: string) {
    return generateValidationDecorator(
        (value) => validators.isPassportNumber(value, countryCode),
        `Value :value: is not a passport number`);
}

