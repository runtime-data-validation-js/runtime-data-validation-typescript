
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../index';

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
 * Check if the string is an Ethereum address using basic regex.
 * Does not validate address checksums.
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
 * Check if the string is a valid ISO 4217 officially assigned currency code.
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsISO4217() {
    return generateValidationDecorator(
        (value) => validators.isISO4217(value),
        `Value :value: is not an ISO4217 country code`);
}

/**
 * Check if the given value is a valid Tax Identification Number.
 * Default locale is en-US.
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsTaxID(locale?: string) {
    return generateValidationDecorator(
        (value) => validators.isTaxID(value, locale ?? 'en-US'),
        `Value :value: is not a Tax Identification Number`);
}

/**
 * checks that the string is a valid VAT number if validation
 * is available for the given country code matching ISO 3166-1 alpha-2.
 * 
 * {@link https://en.wikipedia.org/wiki/VAT_identification_number}
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2}
 * 
 * @param countryCode 
 * @returns 
 * @category Validation Decorator
 */
export function IsVAT(countryCode: string) {
    return generateValidationDecorator(
        (value) => validators.isVAT(value, countryCode),
        `Value :value: is not a VAT Number`);
}
