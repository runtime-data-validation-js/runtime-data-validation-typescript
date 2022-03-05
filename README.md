
Automatic runtime data validation for JavaScript classes using TypeScript decorators.  With these decorators, one can instrument both `set` accessors, and method calls.  For every instrumented thing, every invocation is automatically intercepted, the incoming data is inspected against the declared validations.  If data is not validated, an exception is thrown preventing execution of the accessor or method.

Therefore, an instance of a class that has these validation decorators will always have correct data.  The validation prevents incorrect data from being assigned into protected object fields or methods.

To explain what this means, consider this example:

```js
class ValidateExample {

    #year: number;

    @ValidateAccessor<number>()
    @IsIntRange(1990, 2050)
    @IsInt()
    set year(ny: number | string) {
        this.#year = ToInt(ny);
    }
    get year() { return this.#year; }

    @ValidateParams
    area(
        @IsFloatRange(0, 1000)
        width: number | string,

        @IsFloatRange(0, 1000)
        height: number | string
    ): number {
        return ToFloat(width) * ToFloat(height);
    }

}
```

There are two decorators, `@ValidateAccessor` and `@ValidateParams`, which drive the data validation process.  These decorators instrument the methods or accessors are instrumented.  The instrumentation knows about the other decorators, and these describe what validation steps to perform.  If no validation decorators are attached, no validation occurs.

With the decorators shown here:

* The `IsInt` decorator says any value must be an integer, and the `IsIntRange` decorator says the value must be between 1990 and 2050.
* Similarly, `IsFloatRange` says the value must be floating point (or integer), between `0` and `1000`.
* For accessors - the supplied parameter is validated
* For method calls - the value for each parameter can have different validation decorators suitable to the needs of that parameter

The validation is performed before the method is executed.  This creates certainty that data arriving to the method is validated.

The developer does not explicitly request that validation is performed.  Instead, attaching the decorators ensures that validation is performed on every assignment to the accessor, or to every method call.

Most (or all?) data validation packages, for JavaScript or TypeScript, require the developer to explicitly invoke data validation.  Doesn't this create a risk of forgetting to code validation on a critical code path?

The package includes a very long list of validation decorators.  The implementation uses [validator.js](https://www.npmjs.com/package/validator) in the background.  Development was inspired by [class-validator](https://www.npmjs.com/package/class-validator).

For detailed documentation see:

* https://robogeek.github.io/runtime-data-validation-typescript/
* https://robogeek.github.io/runtime-data-validation-typescript/api/index.html

# Installation

```
$ npm install runtime-data-validation --save
```

To use the decorators, add this to your code:

```js
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    ...
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';
```

That is, `import` any needed decorator function.  Then structure your code similarly to the example shown above.

# About

I became inspired to develop this package after updating my book [_Quick Start to using Typescript and TypeORM on Node.js for CLI and web applications_](https://amzn.to/35bSWMA) (sponsored)

Additionally, I've written a series of articles giving [a full introduction to using and developing TypeScript decorators](https://javascript.plainenglish.io/deep-introduction-to-using-and-implementing-typescript-decorators-a9e876ad0d43).
