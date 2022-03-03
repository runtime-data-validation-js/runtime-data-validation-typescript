
import * as util from 'util';
import { default as validator } from 'validator';

/**
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
export const isIBAN = validator.isIBAN;

/**
 * Check if the string is a valid BTC address.
 * 
 * @param value The string to validate
 * @returns 
 * @category Finance Validator
 */
 export const isBtcAddress = validator.isBtcAddress;

 /**
  * 
  * @param value The string to validate
  * @returns 
  * @category Finance Validator
  */
 export const isCreditCard = validator.isCreditCard;
 
/**
 * Check if the string is an Ethereum address using basic regex.
 * Does not validate address checksums.
 * 
 * @param value 
 * @returns 
 * @category Finance Validator
 */
export const isEthereumAddress = validator.isEthereumAddress;

/**
 * Check if the string is a valid ISO 4217 officially assigned currency code.
 * 
 * @param value 
 * @returns 
 * @category Finance Validator
 */
export const isISO4217 = validator.isISO4217;

/**
 * Check if the given value is a valid Tax Identification Number. 
 * For precise info about exact TIN support, consult the parent
 * `validator.js` package source code.
 * 
 * @param value 
 * @returns 
 * @category Finance Validator
 */
export const isTaxID =  (value, locale?: string) => {
    return validator.isTaxID(value, locale ?? 'en-US');
}


/**
 * checks that the string is a valid VAT number if validation
 * is available for the given country code matching ISO 3166-1 alpha-2.
 * 
 * {@link https://en.wikipedia.org/wiki/VAT_identification_number}
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2}
 * 
 * @param value 
 * @param countryCode 
 * @returns 
 * @category Validator
 */
export const isVAT = (value, countryCode: string) => {
    return validator.isVAT(value, countryCode);
};


