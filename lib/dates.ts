

import * as util from 'util';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';

export type IsDateOptions = {
    format?: string;
    strictMode?: boolean;
    delimiters?: Array<string>
};

export function IsDate(options?: IsDateOptions) {
    return generateValidationDecorator(
        (value) => {
            // console.log(`IsDate ${value}`, options);
            return validator.isDate(value, options)
        },
        `Value :value: is not a Date`);
}

export function ToDate(date: Date | string): Date {
    if (typeof date === 'object' && date instanceof Date) {
        return date;
    } else if (typeof date === 'string') {
        return validator.toDate(date);
    } else {
        throw new Error(`ToDate received bad date ${util.inspect(date)}`);
    }
}

export type IsISO8601Options = {
    strict?: boolean;
    strictSeparator?: boolean;
};

export function IsISO8601(options?: IsISO8601Options) {
    return generateValidationDecorator(
        (value) => {
            // console.log(`IsDate ${value}`, options);
            return validator.isISO8601(value, options)
        },
        `Value :value: is not an ISO 8601 Date`);
}
