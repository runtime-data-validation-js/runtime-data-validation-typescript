
import * as validators from '../validators/index';

import { generateValidationDecorator } from '../validators';

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsDate(options?: validators.IsDateOptions) {
    return generateValidationDecorator(
        (value) => validators.IsDate(value, options),
        `Value :value: is not a Date`);
}

/**
 * Check if the string is a valid ISO 8601 date. 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsISO8601(options?: validators.IsISO8601Options) {
    return generateValidationDecorator(
        (value) => validators.IsISO8601(value, options),
        `Value :value: is not an ISO 8601 Date`);
}
