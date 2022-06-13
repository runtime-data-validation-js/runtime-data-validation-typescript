
import * as util from 'util';
import { default as validator } from 'validator';
import { default as Duration } from "iso8601-duration";

/**
 * @category Options
 */
 export type IsDateOptions = {
    format?: string;
    strictMode?: boolean;
    delimiters?: Array<string>
};

/**
 * Check if the input is a valid date. 
 * 
 * @param value The string to validate
 * @param options {@link IsDateOptions}
 * @returns 
 * @category Date Validator
 */
export const isDate = (value: string, options?: IsDateOptions): boolean => {
    // console.log(`IsDate ${value}`, options);
    const ret = validator.isDate(value, options);
    // console.log(`IsDate ${value} ${util.inspect(options)} ==> ${ret}`);
    return ret;
};

/**
 * @category Options
 */
 export type IsISO8601Options = {
    strict?: boolean;
    strictSeparator?: boolean;
};

/**
 * Check if the input is a valid ISO8601 date. 
 * 
 * @param value The string to validate
 * @param options {@link IsISO8601Options}
 * @returns 
 * @category Date Validator
 */
export const isISO8601 = (value: string, options?: IsISO8601Options): boolean => {
    // console.log(`IsDate ${value}`, options);
    return validator.isISO8601(value, options)
}

/**
 * Check if the input is a valid ISO8601 Duration string.
 * For a discussion of this format see {@link https://en.wikipedia.org/wiki/ISO_8601#Durations}
 * For example, "P3Y6M4DT12H30M5S" represents a duration of 
 * "three years, six months, four days, twelve hours, thirty minutes, and five seconds".
 * 
 * @param value The string to validate
 * @returns 
 * @category Date Validator
 */
 export const isISO8601Duration = (value: string): boolean => {
    try {
        const parsed = Duration.parse(value);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * check if the string is a valid RFC 3339 date.
 * {@link https://tools.ietf.org/html/rfc3339}
 * 
 * @param value The string to validate
 * @returns 
 * @category Date Validator
 */
export const isRFC3339 = validator.isRFC3339;
