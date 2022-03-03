
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
