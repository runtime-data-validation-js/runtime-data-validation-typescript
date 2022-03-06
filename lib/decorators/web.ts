
import * as validators from '../validators/index';
import { generateValidationDecorator } from '../index';


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

/**
 * Check if the string is of type slug. 
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsSlug() {
    return generateValidationDecorator(
        (value) => validators.isSlug(value),
        `Value :value: is not a SLUG string`);
}


/**
 * check if the string is a UUID (version 1, 2, 3, 4 or 5).
 * 
 * @returns 
 * @category Validation Decorator
 */
export function IsUUID(version?: number) {
    return generateValidationDecorator(
        (value) => validators.isUUID(value, version ?? 'any'),
        `Value :value: is not a UUID string`);
}
