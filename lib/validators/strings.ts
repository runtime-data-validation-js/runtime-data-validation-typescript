
import * as util from 'util';
import { default as validator } from 'validator';

/**
 * @category Options
 */
 export type ContainsOptions = {
    ignoreCase?: boolean;
    minOccurrences?: number;
};

/**
 * 
 * @param value
 * @param seed 
 * @param options 
 * @returns 
 * @category String Validator
 */
export const contains = (value: string, seed: string, options?: ContainsOptions): boolean => {
    return validator.contains(value, seed, options);
};

/**
 * 
 * @param value
 * @param comparison 
 * @returns 
 * @category String Validator
 */
export const equals = (value: string, comparison: string): boolean => {
    return validator.equals(value, comparison);
};


/**
 * @category Options
 */
 export type IsAlphaOptions = {
    ignore?: string | RegExp;
};

/**
 * 
 * @param value
 * @param locale 
 * @param options 
 * @returns 
 * @category String Validator
 */
export const isAlpha = (value: string, locale?: string,
            options?: IsAlphaOptions): boolean => {
    return validator.isAlpha(value, locale, options);
};

/**
 * 
 * @param value
 * @param locale 
 * @param options 
 * @returns 
 * @category String Validator
 */
 export const isAlphanumeric = (value: string, locale?: string,
                     options?: IsAlphaOptions): boolean => {
    return validator.isAlphanumeric(value, locale, options);
};


/**
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isAscii = validator.isAscii;

/**
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isBase32 = validator.isBase32;

/**
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isBase58 = validator.isBase58;


/**
 * @category Options
 */
 export type IsBase64Options = {
    urlSafe?: boolean
};

/**
 * 
 * @param value
 * @param options 
 * @returns 
 * @category String Validator
 */
export const isBase64 = (value: string, options?: IsBase64Options): boolean => {
    return validator.isBase64(value, options);
};


/**
 * @category Options
 */
 export type IsByteLengthOptions = {
    min: number;
    max: number;
};

/**
 * 
 * @param value
 * @param options 
 * @returns 
 * @category String Validator
 */
export const isByteLength = (value: string, options?: IsByteLengthOptions): boolean => {
    return validator.isByteLength(value, options);
};


/**
 * @category Options
 */
 export type IsEmptyOptions = {
    ignore_whitespace?: boolean;
};

/**
 * 
 * @param value
 * @param options 
 * @returns 
 * @category String Validator
 */
export const isEmpty = (value: string, options?: IsEmptyOptions): boolean => {
    return validator.isEmpty(value, options);
};


/**
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isFullWidth = validator.isFullWidth;

/**
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isHalfWidth = validator.isHalfWidth;

/**
 * 
 * @param value
 * @param values 
 * @returns 
 * @category String Validator
 */
export const isIn = (value: string, values: Array<string>): boolean => {
    return validator.isIn(value, values);
};

/**
 * @category Options
 */
export type isJSONOptions = { allow_primitives: boolean };

/**
 * Check if the string is valid JSON (note: uses JSON.parse).
 * 
 * @param value
 * @param options
 * @returns 
 * @category String Validator
 */
export const isJSON = (value: string, options?: isJSONOptions): boolean => {
    return validator.isJSON(value, options);
};

/**
 * @category Options
 */
export type isLengthOptions = {min?: number, max?: number};

/**
 * check if the string's length falls in a range.
 * 
 * @param value
 * @param options
 * @returns 
 * @category String Validator
 */
export const isLength = (value: string, options?: isLengthOptions): boolean => {
    return validator.isLength(value, options);
};

/**
 * check if the string is lowercase.
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isLowercase = validator.isLowercase;

/**
 * check if the string contains one or more multibyte chars.
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isMultibyte = validator.isMultibyte;

/**
 * check if the string contains any surrogate pairs chars.
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isSurrogatePair = validator.isSurrogatePair;

/**
 * check if the string is uppercase.
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isUppercase = validator.isUppercase;

/**
 * check if the string contains a mixture of full and half-width chars.
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isVariableWidth = validator.isVariableWidth;

/**
 * checks characters if they appear in the whitelist.
 * 
 * @param value
 * @returns 
 * @category String Validator
 */
export const isWhitelisted = (value: string, chars: string) => {
    return validator.isWhitelisted(value, chars);
}

/**
 * check if string matches the pattern.
 * 
 * Either `matches('foo', /foo/i)` or `matches('foo', 'foo', 'i')`.
 * 
 * @param value
 * @param pattern
 * @param modifiers
 * @returns 
 * @category String Validator
 */
export const matches = (value: string,
                pattern: string | RegExp, modifiers?: string) => {
    return validator.matches(value, pattern, modifiers);
}
