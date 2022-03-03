
import * as util from 'util';
import { default as validator } from 'validator';


/**
 * 
 * @param value 
 * @returns 
 * @category Internet Validator
 */
export const isHexadecimal = validator.isHexadecimal;

/**
 * 
 * @param value 
 * @returns 
 * @category Internet Validator
 */
export const isHexColor = validator.isHexColor;
 
/**
 * 
 * @param value 
 * @returns 
 * @category Internet Validator
 */
export const isHSL = validator.isHSL;
 
/**
 * Check if the string is valid JWT token.
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isJWT = validator.isJWT;

/**
 * check if the string is a rgb or rgba color.
 * 
 * @param value The string to validate
 * @param includePercentValues
 * @returns 
 * @category Internet Validator
 */
export const isRgbColor = (value: string, includePercentValues?: boolean) => {
    return validator.isRgbColor(value, includePercentValues);
} 


