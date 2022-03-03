
import * as util from 'util';
import { default as validator } from 'validator';

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
 * check if the string is an ISIN (stock/security identifier).
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
export const isISIN = validator.isISIN;

export type isLatLongOptions = { checkDMS: boolean };

/**
 * check if the string is a valid latitude-longitude coordinate 
 * in the format `lat,long` or `lat, long`.
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Validator
 */
export const isLatLong = (value: string, options?: isLatLongOptions) => {
    return validator.isLatLong(value, options);
};

const isLicensePlateLocales = ['cs-CZ', 'de-DE', 'de-LI', 'fi-FI',
                                'pt-PT', 'sq-AL', 'pt-BR'];

/**
 * check if string matches the format of a country's license plate.
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Validator
 */
export const isLicensePlate = (value: string, locale?: string) => {
    if (typeof locale === 'undefined') locale = 'any';
    return validator.isLicensePlate(value, locale);
};

/**
 * check if the string is a locale
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
 export const isLocale = validator.isLocale;
