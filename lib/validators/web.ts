
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

/**
 * Check if the string is of type slug. Options allow a single hyphen between string. e.g. [cn-cn, cn-c-c]
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isSlug = validator.isSlug;

/**
 * check if the string is a UUID (version 1, 2, 3, 4 or 5).
 * 
 * @param value The string to validate
 * @param version
 * @returns 
 * @category Internet Validator
 */
export const isUUID = (value: string, version?: number | string) => {
    if (typeof version === 'string' && version !== 'any') {
        throw new Error(`isUUID invalid version ${version}`);
    }
    return validator.isUUID(value, version ?? 'any');
}

