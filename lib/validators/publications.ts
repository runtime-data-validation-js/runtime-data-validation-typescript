
import * as util from 'util';
import { default as validator } from 'validator';

/**
 * 
 * @param value 
 * @returns 
 * @category Publications Validator
 */
export const isEAN = validator.isEAN;

/**
 * 
 * @param value 
 * @param version 
 * @returns 
 * @category Publications Validator
 */
 export const isISBN = (value: string, version?: number) => {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for ISBN ${version}, must be number`);
        }
    }
    return validator.isISBN(value, version);
};

export type isISSNOptions = {
    case_sensitive?: boolean,
    require_hyphen?: boolean
};


/**
 * Check if the string is an International Standard Serial Number (ISSN). {@link https://en.wikipedia.org/wiki/International_Standard_Serial_Number}
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Publications Validator
 */
export const isISSN = (value: string, options?: isISSNOptions) => {
    return validator.isISSN(value, options);
};
