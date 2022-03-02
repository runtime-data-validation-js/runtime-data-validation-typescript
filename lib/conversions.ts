

import * as util from 'util';
import { default as validator } from 'validator';

/**
 * Converts a date string to a `Date` object.
 * 
 * @param date 
 * @returns 
 * @category Conversion
 */
 export function ToDate(date: Date | string): Date {
    if (typeof date === 'object' && date instanceof Date) {
        return date;
    } else if (typeof date === 'string') {
        return validator.toDate(date);
    } else {
        throw new Error(`ToDate received bad date ${util.inspect(date)}`);
    }
}

/**
 * 
 * @param bool 
 * @returns 
 * @category Conversion
 */
 export function ToBoolean(bool: boolean | string): boolean {

    if (typeof bool === 'boolean') return bool;
    if (typeof bool === 'string') {
        if (bool.toLocaleLowerCase() === 'true') return true;
        if (bool === '1') return true;
        if (bool.toLocaleLowerCase() === 'yes') return true;
        if (bool === '0') return false;
        if (bool.toLocaleLowerCase() === 'false') return false;
        if (bool.toLocaleLowerCase() === 'no') return false;
        throw new Error(`ToBoolean got invalid string ${bool}`);
    }
    throw new Error(`ToBoolean received unknown value ${util.inspect(bool)}`);
}

/**
 * 
 * @param value 
 * @returns 
 * @category Conversion
 */
 export function ToInt(value: number | string): number {
    return typeof value === 'string'
                    ? validator.toInt(value)
                    : value;
}

/**
 * 
 * @param value 
 * @returns 
 * @category Conversion
 */
 export function ToFloat(value: number | string): number {
    return typeof value === 'string'
                    ? validator.toFloat(value)
                    : value;
}
