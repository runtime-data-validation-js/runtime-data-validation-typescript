

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

