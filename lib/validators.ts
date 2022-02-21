
import "reflect-metadata";
import * as util from 'util';
import {
    isClassDecorator, isPropertyDecorator, isParameterDecorator,
    isMethodDecorator, isAccessorDecorator
} from 'decorator-inspectors';
const ACCESSOR_VALIDATORS = 'accessor-validators';
const PARAMETER_VALIDATORS = 'parameter-validators';

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
