
import * as util from 'util';
import { default as validator } from 'validator';

/**
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isDataURI = validator.isDataURI;

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
 * @category Internet Validator
 */
export const isEmail = (value: string, options?: IsEmailOptions) => {
    return validator.isEmail(value, options);
};

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
 * @category Internet Validator
 */
export const isFQDN = (value: string, options?: IsFQDNOptions) => {
    return validator.isFQDN(value, options);
};

const IsHashAlgorithms = ['md4', 'md5', 'sha1', 'sha256', 'sha384',
            'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160',
            'tiger192', 'crc32', 'crc32b'];

/**
 * check if the string is a hash of type algorithm.
 * 
 * @param algorithm 
 * @returns 
 * @category Internet Validator
 */
export const isHash = (value: string, algorithm: string) => {
    if (!IsHashAlgorithms.includes(algorithm)) {
        throw new Error(`IsHash algorithm ${algorithm} not supported`);
    }
    return validator.isHash(value, algorithm);
};

/**
 * check if the string is a MD5 hash.  Equivalent to `isHash(value, 'md5')`.
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
 export const isMD5 = validator.isMD5;

/**
 * 
 * @param value 
 * @param version 
 * @returns 
 * @category Internet Validator
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
 * @category Internet Validator
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
 * Check if the string is a valid ISO 3166-1 alpha-2 officially
 * assigned country code.
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isISO31661Alpha2 = validator.isISO31661Alpha2;

/**
 * Check if the string is a valid ISO 3166-1 alpha-3 officially
 * assigned country code.
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isISO31661Alpha3 = validator.isISO31661Alpha3;

/**
 * Check if the string is an International Standard Recording Code (ISRC).  {@link https://en.wikipedia.org/wiki/International_Standard_Recording_Code}
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isISRC = validator.isISRC;

/**
 * Check if the string is valid JWT token.
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
export const isJWT = validator.isJWT;

export type isMACAddressOptions = {
    no_separators?: boolean,
    eui?: string
};

/**
 * check if the string is a MAC address.
 * 
 * @param value The string to validate
 * @param options
 * @returns 
 * @category Internet Validator
 */
export const isMACAddress = (value: string, options?: isMACAddressOptions): boolean => {
    // console.log(`isMACAddress ${value}`, options);
    return validator.isMACAddress(value, options);
};


/**
 * check if the string is a magnet uri format. {@link https://en.wikipedia.org/wiki/Magnet_URI_scheme}
 * 
 * @param value The string to validate
 * @returns 
 * @category Internet Validator
 */
 export const isMagnetURI = validator.isMagnetURI;
