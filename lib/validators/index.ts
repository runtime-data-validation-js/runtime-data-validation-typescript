/**
 * These are the validation functions for the `runtime-data-validation`
 * package.  These functions all take as their first parameter a
 * value, as a `string`, that is to be validated.  Any additional
 * parameters provide configuration to customize the validation.
 * 
 * These functions can serve as _type guard_ functions.  In other
 * words, at the beginning of a function it is good form to
 * validate the parameters.  If your function is part of a class
 * its parameters can be validated using decorators.  But a
 * standalone function cannot be instrumented with decorators, in
 * which case you can directly use these functions.
 * 
 * USAGE:
 * 
 * ```
 * import { validators } from 'runtime-data-validation';
 * 
 * function operation(value: string) {
 *     if (!validators.isAscii(value)) {
 *         throw new Error(`Invalid value ${value}`);
 *     }
 *     // Continue with code
 * }
 * ```
 * 
 * [Return to home page](../index.html)
 * @module validation-functions
 */

export * from './dates';
export * from './finance';
export * from './formats';
export * from './internet';
export * from './numerical';
export * from './publications';
export * from './strings';
export * from './web';

export {
    blacklist, escape, ltrim, normalizeEmail, rtrim,
    stripLow, toBoolean, toDate, toFloat, toInt,
    trim, unescape, whitelist
} from 'validator';
