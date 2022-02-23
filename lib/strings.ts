

import * as util from 'util';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';


export type ContainsType = {
    ignoreCase?: boolean;
    minOccurrences?: number;
};

export function Contains(seed: string, options?: ContainsType) {
    return generateValidationDecorator(
        (value) => validator.contains(value, seed, options),
        `Value :value: does not contain ${seed}`);
}

export function Equals(comparison: string) {
    return generateValidationDecorator(
        (value) => validator.equals(value, comparison),
        `Value :value: does not equal ${comparison}`);
}

export type IsAlphaOptions = {
    ignore?: string | RegExp;
};

export function IsAlpha(locale?: string,
            options?: IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validator.isAlpha(value, locale, options),
        `Value :value: is not alpha ${locale}`);
}

export function IsAlphanumeric(locale?: string,
            options?: IsAlphaOptions) {
    return generateValidationDecorator(
        (value) => validator.isAlphanumeric(value, locale, options),
        `Value :value: is not alpha ${locale}`);
}

export function IsAscii() {
    return generateValidationDecorator(
        (value) => validator.isAscii(value),
        `Value :value: is not ASCII encoded`);
}

export function IsBase32() {
    return generateValidationDecorator(
        (value) => validator.isBase32(value),
        `Value :value: is not BASE32 encoded`);
}

export function IsBase58() {
    return generateValidationDecorator(
        (value) => validator.isBase58(value),
        `Value :value: is not BASE58 encoded`);
}

type IsBase64Options = {
    urlSafe?: boolean
};

export function IsBase64(options?: IsBase64Options) {
    return generateValidationDecorator(
        (value) => validator.isBase64(value, options),
        `Value :value: is not BASE64 encoded`);
}

type IsByteLengthOptions = {
    min: number;
    max: number;
};

export function IsByteLength(options?: IsByteLengthOptions) {
    return generateValidationDecorator(
        (value) => validator.isByteLength(value, options),
        `Value :value: is not within byte length ${util.inspect(options)}`);
}
