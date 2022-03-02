
import * as util from 'util';
import { default as validator } from 'validator';

/**
 * Check if the string is a valid BTC address.
 * 
 * @param value The string to validate
 * @returns 
 * @category Validator
 */
export const isBtcAddress = validator.isBtcAddress;

/**
 * 
 * @param value The string to validate
 * @returns 
 * @category Validator
 */
export const isCreditCard = validator.isCreditCard;

/**
 * 
 * @param value The string to validate
 * @returns 
 * @category Validator
 */
export const isDataURI = validator.isDataURI;

/**
 * 
 * @param value 
 * @returns 
 * @category Validation
 */
export const isEAN = validator.isEAN;

/**
 * @category Options
 */
 export type IsEmailOptions = {
    allow_display_name?: boolean,
    require_display_name?: boolean,
    allow_utf8_local_part?: boolean,
    require_tld?: boolean,
    allow_ip_domain?: boolean,
    domain_specific_validation?: boolean,
    blacklisted_chars?: string,
    host_blacklist?: Array<string>
};

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Validator
 */
export const isEmail = (value: string, options?: IsEmailOptions) => {
    return validator.isEmail(value, options);
};

/**
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
export const isEthereumAddress = validator.isEthereumAddress;

/**
 * @category Options
 */
 export type IsFQDNOptions = {
    require_tld?: boolean,
    allow_underscores?: boolean,
    allow_trailing_dot?: boolean,
    allow_numeric_tld?: boolean,
    allow_wildcard?: boolean
};

/**
 * 
 * @param options 
 * @returns 
 * @category Validator
 */
export const isFQDN = (value: string, options?: IsFQDNOptions) => {
    return validator.isFQDN(value, options);
};

const IsHashAlgorithms = ['md4', 'md5', 'sha1', 'sha256', 'sha384',
            'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160',
            'tiger192', 'crc32', 'crc32b'];

/**
 * 
 * @param algorithm 
 * @returns 
 * @category Validator
 */
export const isHash = (value: string, algorithm: string) => {
    if (!IsHashAlgorithms.includes(algorithm)) {
        throw new Error(`IsHash algorithm ${algorithm} not supported`);
    }
    return validator.isHash(value, algorithm);
};

/**
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
export const isIBAN = validator.isIBAN;

const IsIdentityCardLocales = ['LK', 'PL', 'ES', 'FI', 'IN',
        'IT', 'IR', 'MZ', 'NO', 'TH', 'zh-TW', 'he-IL', 'ar-LY',
        'ar-TN', 'zh-CN'];

/**
 * 
 * @param value 
 * @param locale 
 * @returns 
 * @category Validator
 */
export const isIdentityCard = (value: string, locale?: string) => {
    if (typeof locale !== 'undefined'
     && !IsIdentityCardLocales.includes(locale)) {
        throw new Error(`IsIdentityCard incorrect locale ${locale}`);
    }
    return validator.isIdentityCard(value, locale);
};


/**
 * @category Options
 */
 export type IsIMEIOptions = {
    allow_hyphens?: boolean
};

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Validator
 */
export const isIMEI = (value: string, options?: IsIMEIOptions) => {
    return validator.isIMEI(value, options);
};

/**
 * 
 * @param value 
 * @param version 
 * @returns 
 * @category Validator
 */
export const isIP = (value: string, version?: number) => {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for IP ${version}, must be number`);
        }
    }
    return validator.isIP(value, version);
};


/**
 * 
 * @param value 
 * @param version 
 * @returns 
 * @category Validator
 */
 export const isIPRange = (value: string, version?: number) => {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for IP Range ${version}, must be number`);
        }
    }
    return validator.isIPRange(value, version);
};

/**
 * 
 * @param value 
 * @param version 
 * @returns 
 * @category Validator
 */
export const isISBN = (value: string, version?: number) => {
    if (typeof version !== 'undefined') {
        if (typeof version !== 'number') {
            throw new Error(`Incorrect type for ISBN ${version}, must be number`);
        }
    }
    return validator.isISBN(value, version);
};


/**
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
export const isISIN = validator.isISIN;
