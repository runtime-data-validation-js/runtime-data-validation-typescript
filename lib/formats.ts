
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
