
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../validators';


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

/**
 * Check if the string is valid JWT token.
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsJWT() {
    return generateValidationDecorator(
        (value) => validators.isJWT(value),
        `Value :value: is not a JWT Token`);
}

/**
 * check if the string is a rgb or rgba color.
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsRgbColor(includePercentValues?: boolean) {
    return generateValidationDecorator(
        (value) => validators.isRgbColor(value, includePercentValues),
        `Value :value: is not a RGB or RGBA color string`);
}
