
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
 * 
 * @param value 
 * @returns 
 * @category Validator
 */
export const isISIN = validator.isISIN;
