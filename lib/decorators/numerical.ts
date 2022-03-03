
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';


/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsBoolean(options?: validators.IsBooleanOptions) {
    return generateValidationDecorator(
        (value) => validators.isBoolean(value, options),
        `Value :value: is not Boolean`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsDecimal(options?: validators.IsDecimalOptions) {
    return generateValidationDecorator(
        (value) => validators.isDecimal(value, options),
        `Value :value: not a decimal number`);
}

/**
 * 
 * @param min 
 * @param max 
 * @returns 
 * @category Validation Decorator
 */
 export function IsIntRange(min: number, max: number) {
    // console.log(`params.IsIntRange ${min} ${max}`);
    return generateValidationDecorator(
        (value) => validators.isIntRange(value, min, max),
        `Value :value: not an integer between ${min} and ${max}`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsInt(options?: validators.IsIntOptions) {
    // console.log(`params.IsInt`);
    return generateValidationDecorator(
        (value) => validators.isInt(value, options),
        `Value :value: not an integer`);
}

/**
 * 
 * @param min 
 * @param max 
 * @returns 
 * @category Validation Decorator
 */
 export function IsFloatRange(min: number, max: number) {
    return generateValidationDecorator(
        (value) => validators.isFloatRange(value, min, max),
        `Value :value: not a float between ${min} and ${max}`);
}

/**
 * 
 * @param options 
 * @returns 
 * @category Validation Decorator
 */
 export function IsFloat(options?: validators.IsFloatOptions) {
    return generateValidationDecorator(
        (value) => validators.isFloat(value, options),
        `Value :value: not a float`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHexadecimal() {
    return generateValidationDecorator(
        (value) => validators.isHexadecimal(value),
        `Value :value: not hexadecimal`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHexColor() {
    return generateValidationDecorator(
        (value) => validators.isHexColor(value),
        `Value :value: not hex color`);
}

/**
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsHSL() {
    return generateValidationDecorator(
        (value) => validators.isHSL(value),
        `Value :value: not HSL color`);
}
