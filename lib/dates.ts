

import * as util from 'util';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';

type IsDateOptions = {
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
