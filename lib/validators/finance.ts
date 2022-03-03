
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


