
import * as util from 'util';
import { default as validator } from 'validator';


/**
 * @category Options
 */
 export type IsBooleanOptions = {
    loose?: boolean
};

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Validator
 */
export const isBoolean = (value: string | boolean, options?: IsBooleanOptions) => {
    if (typeof value === 'boolean') return true;
    else return validator.isBoolean(value, options);
};

/**
 * @category Options
 */
 export type IsDecimalOptions = {
    force_decimal?: boolean; 
    decimal_digits?: string;
    locale?: string;
}

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Numerical Validator
 */
export const isDecimal = (value: string, options?: IsDecimalOptions) => {
    return validator.isDecimal(value, options);
};


/**
 * 
 * @param value 
 * @param min 
 * @param max 
 * @returns 
 * @category Numerical Validator
 */
 export const isIntRange = (value: string | number, min: number, max: number) => {
    if (typeof value === 'number') {
        if (Number.isInteger(value)
         && value >= min && value <= max) {
            return true;
        } else return false;
    }
    else if (validator.isInt(value, { min: min, max: max })) {
        return true;
    } else return false;
};


/**
 * @category Options
 */
 export type IsIntOptions = {
    min?: number, max?: number,
    allow_leading_zeros?: boolean
}

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Numerical Validator
 */
export const isInt = (value: string | number, options?: IsIntOptions) => {
    // console.log(`params.IsInt`);

    if (typeof value === 'number') {
        if (!Number.isInteger(value)) return false;
        if (options) {
            if (typeof options.max !== 'undefined'
             && typeof options.min !== 'undefined') {
                return (value >= options.min && value <= options.max);
            } else if (typeof options.max !== 'undefined') {
                return value <= options.max;
            } else if (typeof options.min !== 'undefined') {
                return value >= options.min;
            } else return true;
        } else return true;
    }
    else if (validator.isInt(value, options)) return true;
    else return false;
};


/**
 * 
 * @param value 
 * @param min 
 * @param max 
 * @returns 
 * @category Numerical Validator
 */
 export const isFloatRange = (value: string | number, min: number, max: number): boolean => {
    if (typeof value === 'number') {
        if (value >= min && value <= max) return true;
        else return false;
    }
    else if (validator.isFloat(value, { min: min, max: max })) {
        return true;
    } else return false;
};


/**
 * @category Options
 */
 export type IsFloatOptions = {
    min?: number,
    max?: number,
    locale?: string
};

/**
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Numerical Validator
 */
export const isFloat = (value: string | number, options?: IsFloatOptions): boolean => {

    if (typeof value === 'number') {
        // console.log(`IsFloat number ${value}`);
        if (options) {
            if (typeof options.max !== 'undefined'
             && typeof options.min !== 'undefined') {
                return (value >= options.min && value <= options.max);
            } else if (typeof options.max !== 'undefined') {
                return value <= options.max;
            } else if (typeof options.min !== 'undefined') {
                return value >= options.min;
            } else return true;
        } else return true;
    } else {
        // console.log(`IsFloat string ${value}`);
        if (validator.isFloat(value, options)) return true;
    }
    return false;
}


/**
 * @category Options
 */
export type isNumericOptions = {
    no_symbols?: boolean
};

/**
 * check if the string contains only numbers.
 * 
 * @param value 
 * @param options 
 * @returns 
 * @category Numerical Validator
 */
export const isNumeric = (value: string,
                        options?: isNumericOptions): boolean => {
    return validator.isNumeric(value, options);
}

/**
 * check if the string is a valid octal number.
 * 
 * @param value 
 * @returns 
 * @category Numerical Validator
 */
export const isOctal = validator.isOctal;
