
import * as util from 'util';
import { generateValidationDecorator } from './validators';
import { default as validator } from 'validator';


// isBIC(str) 	check if a string is a BIC (Bank Identification Code) or SWIFT code.


export function IsBtcAddress() {
    return generateValidationDecorator(
        (value) => validator.isBtcAddress(value),
        `Value :value: is not a BTC address`);
}


export function IsCreditCard() {
    return generateValidationDecorator(
        (value) => validator.isCreditCard(value),
        `Value :value: is not a Credit Card Number`);
}

// isCurrency(str [, options]) 	check if the string is a valid currency amount.

export function IsDataURI() {
    return generateValidationDecorator(
        (value) => validator.isDataURI(value),
        `Value :value: is not a Data URI`);
}

export function IsEAN() {
    return generateValidationDecorator(
        (value) => validator.isEAN(value),
        `Value :value: is not an EAN`);
}

type IsEmailOptions = {
    allow_display_name?: boolean,
    require_display_name?: boolean,
    allow_utf8_local_part?: boolean,
    require_tld?: boolean,
    allow_ip_domain?: boolean,
    domain_specific_validation?: boolean,
    blacklisted_chars?: string,
    host_blacklist?: Array<string>
};

export function IsEmail(options?: IsEmailOptions) {
    return generateValidationDecorator(
        (value) => validator.isEmail(value, options),
        `Value :value: is not an E-Mail address`);
}
