
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

There are two decorators, which we call _Execution Decorators_, `@ValidateAccessor` and `@ValidateParams`, which drive the data validation process.  These decorators instrument the methods or accessors are instrumented.  The instrumentation knows about the other decorators, and these describe what validation steps to perform.

The other decorators are called _Validation Decorators_.  If no validation decorators are attached, no validation occurs.

With the decorators shown here:

* The `IsInt` decorator says any value must be an integer, and the `IsIntRange` decorator says the value must be between 1990 and 2050.
* Similarly, `IsFloatRange` says the value must be floating point (or integer), between `0` and `1000`.
* For accessors - the supplied parameter is validated, using the `@ValidateAccessor` execution decorator to handle the validation process
* For method calls - the value for each parameter is checked by any attached validation decorators, using the `@ValidateParams` execution decorator to handle the validation process

The validation is performed before the method is executed, creating certainty that data arriving as accessor or method parameters is validated and correct.

The developer does not explicitly request that validation is performed.  Instead, attaching the decorators ensures that validation is performed on every assignment to the accessor, or to every method call.

Most (or all?) data validation packages, for JavaScript or TypeScript, require the developer to explicitly invoke data validation.  Doesn't this create a risk of forgetting to code validation on a critical code path?

The package includes a very long list of validation decorators.  The implementation uses [validator.js](https://www.npmjs.com/package/validator) in the background.  Development was inspired by [class-validator](https://www.npmjs.com/package/class-validator).

For detailed documentation see: [`runtime-data-validation-js.github.io`](https://runtime-data-validation-js.github.io/)

For the API, see: [`runtime-data-validation-js.github.io/api`](https://runtime-data-validation-js.github.io/api/index.html)

# Disabling validation

You may be concerned about the performance impact of validation.  We tried to build a benchmark test to measure what is the impact, but got inconclusive results.  You'll find this in the `performance` directory of the package.

But, while doing this an API method was added to disable validation.

To start, import this function:

```ts
import {
    setEnabled as ValidateEnabled
} from 'runtime-data-validation';
```

Then, call `ValidateEnable(false)` to disable validation, or with `true` to enable it.  Your application can dynamically call this to enable or disable at will.

# Installation

On TechSparx there is [a complete overview of TypeScript decorators](https://techsparx.com/nodejs/typescript/decorators/introduction.html), that goes over setting up a Node.js project with decorator support.  Included in that article series is [a description of the theory behind this package](https://techsparx.com/nodejs/typescript/decorators/runtime-validation.html).

Install the `runtime-data-validation` package:

```
$ npm install runtime-data-validation --save
```

In your `tsconfig.json` file make these settings:

```json
{
    "compilerOptions": {
        ...
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        ...
    }
}
```

The first, `experimentalDecorators`, turns on decorator support.

The second, `emitDecoratorMetadata`, emits data required by the `reflect-metadata` package.  This package enables us to do powerful things in decorators by recording metadata about classes, properties, methods, and parameters.

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
