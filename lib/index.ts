/**
 * These are the validation decorators for the
 * `runtime-data-validation` package.  The functions in this
 * module are actually decorators, but the documentation is
 * unable to present them as decorators.
 * 
 * For the functions we've categorized as decorators,
 * the API will be described something like this:
 * 
 * ```js
 * IsAlpha(locale?: string, options?: IsAlphaOptions):
 *   (target: Object, propertyKey?: string | symbol, 
 *       descriptor?: number | PropertyDescriptor) => void
 * ```
 * 
 * This is the `@IsAlpha()` decorator.  This decorator takes two 
 * ptional parameters, _locale_ and _options_.  Any parameters shown
 * are where you should focus your attention.  The return type shown
 * here is the decorator function, which you should ignore since it is
 * an implementation detail of TypeScript decorators.
 * 
 * In other words, the usage is:
 * 
 * ```ts
 * class Example {
 *     #title: string;
 * 
 *     @ValidateAccessor<string>()
 *     @IsAlpha('en-US')
 *     set title(ny: string) { this.#title = ny; }
 *     get title() { return this.#title; }
 * }
 * ```
 * 
 * In other words, coding this as a decorator we use `@DecoratorName()`
 * and do not pay attention to the decorator function return value.
 * 
 * [Return to home page](./index.html)
 * 
 * @module runtime-data-validation
 */

export * as validators from './validators/index';
export * from './decorators/index';
export * as conversions from './conversions/index';

// export const ToBoolean = conversions.ToBoolean;
// export const ToDate = conversions.ToDate;
// export const ToFloat = conversions.ToFloat;
// export const ToInt = conversions.ToInt;

// TBD: isAfter 
// isAfter(str [, date]) 	check if the string is a date that's after the specified date (defaults to now).


// isBefore(str [, date]) 	check if the string is a date that's before the specified date.

// isDivisibleBy(str, number) 	check if the string is a number that's divisible by another.

import * as util from 'util';
import {
    isClassDecorator, isPropertyDecorator, isParameterDecorator,
    isMethodDecorator, isAccessorDecorator
} from 'decorator-inspectors';
const ACCESSOR_VALIDATORS = 'accessor-validators';
const PARAMETER_VALIDATORS = 'parameter-validators';

/**
 * Generates an accessor validation decorator function.
 * 
 * @param validator 
 * @param message 
 * @param target 
 * @param propertyKey 
 * @param descriptor 
 */
function generateAccessorDecorator(
    validator: Function, message: string,
    target: Object, propertyKey: string | symbol,
    descriptor: PropertyDescriptor) {

    let existing =
        Reflect.getMetadata(ACCESSOR_VALIDATORS,
                target, propertyKey)
        || [];
    const vfunc = function(value) {
        if (!validator(value)) {
            throw new Error(
                message.replace(':value:',
                    util.inspect(value)));
        }
    };
    if (!existing) {
        existing = [ vfunc ];
    } else {
        existing.push(vfunc);
    }

    // Store metadata
    Reflect.defineMetadata(ACCESSOR_VALIDATORS,
        existing, target, propertyKey);
    
}

/**
 * Generates a parameter validation decorator function.
 * 
 * @param validator 
 * @param message 
 * @param target 
 * @param propertyKey 
 * @param parameterIndex 
 */
function generateParameterDecorator(
                validator: Function, message: string,
                target: any, propertyKey: string | symbol,
                parameterIndex: number) {

    let existing = Reflect.getMetadata(PARAMETER_VALIDATORS,
                            target, propertyKey)
                    || [];
        
    const vfunc = (value) => {
        // console.log(`generateParameterDecorator validator ${validator} ${value}`);
        if (!validator(value)) {
            throw new Error(
                message.replace(':value:',
                    util.inspect(value)));
        }
    };

    if (!existing[parameterIndex]) {
        existing[parameterIndex] = [ vfunc ];
    } else {
        existing[parameterIndex].push(vfunc);
    }

    // console.log(`generateParameterDecorator ${target} ${String(propertyKey)} ${parameterIndex}`, existing);

    // Store metadata
    Reflect.defineMetadata(PARAMETER_VALIDATORS,
                existing, target, propertyKey);
}

/**
 * Generates either an accessor validation decorator function,
 * or parameter validation decorator function, depending on 
 * the context in which it is being used.  The `validator` parameter
 * must be a function for data validation, which returns `true` if
 * the data is valid, or `false` otherwise.  The function data is
 * stored in reflection metadata, which is used by
 * {@link ValidateAccessor} or {@link ValidateParams} to drive
 * the validation process.
 * 
 * @param validator The validation function
 * @param message The error message to use in thrown exceptions
 * @returns 
 * @category Decorator Generator
 */
export function generateValidationDecorator(
                validator: Function, message: string) {
    return (target: Object, 
        propertyKey?: string | symbol,
        descriptor?: number | PropertyDescriptor) => {

        if (isAccessorDecorator(target, propertyKey, descriptor)) {
            generateAccessorDecorator(validator, message,
                    target, propertyKey,
                    <PropertyDescriptor>descriptor);
        } else if (isParameterDecorator(target, propertyKey, descriptor)) {
            generateParameterDecorator(validator, message,
                    target, propertyKey, <number>descriptor);
        } else if (isClassDecorator(target, propertyKey, descriptor)) {
            throw new Error(`generateValidationDecorator cannot be used with a class ${target}`);
        } else if (isPropertyDecorator(target, propertyKey, descriptor)) {
            throw new Error(`generateValidationDecorator cannot be used with a property ${target} ${String(propertyKey)}`);
        } else if (isMethodDecorator(target, propertyKey, descriptor)) {
            throw new Error(`generateValidationDecorator cannot be used with a method ${target} ${String(propertyKey)}`);
        } else {
            throw new Error('generateValidationDecorator used in unknown situation');
        }
    }
}

/**
 * A method decorator function which performs data validation
 * according to the validation decorators attached to any
 * method parameters.
 * 
 * @param target 
 * @param propertyKey 
 * @param descriptor 
 * @category Execution Decorator
 */
export function ValidateParams(
    target: Object, propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    // console.log(`ValidateParams ${target} ${String(propertyKey)}`, descriptor);
    // Store the original value
    const savedValue = descriptor.value;
    // Attach validation logic
    descriptor.value = function(...args: any[]) {
        let validators = Reflect.getMetadata(PARAMETER_VALIDATORS,
                                target, propertyKey)
                        || [];
        // const validators = ParamValidators(target, propertyKey) || {};

        for (const key in Object.keys(validators)) {
            if (key === 'length') continue;
            const funclist = validators[key];
            const value = args[key];
            // console.log(`ValidateParams ${target} ${String(propertyKey)} ${key} value ${value} funclist`, funclist);
            for (const func of funclist) {
                func(value);
            }
        }
        // Actually call the function
        return savedValue.call(this, ...args);
    };
}

/**
 * An accessor decorator function which performs data validation
 * according to the validation decorators attached to the accessor.
 * 
 * @returns 
 * @category Execution Decorator
 */
export function ValidateAccessor<T>() {
    return (target: Object, propertyKey: string,
        descriptor: PropertyDescriptor) => {
        
        const originals = {
            get: descriptor.get,
            set: descriptor.set
        };
        if (originals.set) {
            descriptor.set = function(newval: T) {
                let validators =
                    Reflect.getMetadata(ACCESSOR_VALIDATORS,
                            target, propertyKey)
                    || [];
                // const validators = AccessorValidators(target, propertyKey);
                // console.log(`AccessorValidation validators`, validators);
                for (const func of validators) {
                    func(newval);
                }
                originals.set.call(this, newval);
            };
        }
    }
}
