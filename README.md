# runtime-data-validation-typescript
Runtime data validation for JavaScript classes using TypeScript decorators

This is a collection of TypeScript decorators that intercept `set` operations on accessors, or method calls, to inspect incoming data, and automatically perform data validation.

For an example of what this means:

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
    ) {
        return ToFloat(width) * ToFloat(height);
    }

}
```

The first part are decorators attached to an accessor.  The `IsInt` decorator says any value assigned to this accessor must be an integer, and the `IsIntRange` decorator says the value must be between 1990 and 2050.

The second part is a method, `area`, with two parameters.  Each have an `IsFloatRange` decorator saying that any value assigned to these parameters must be between 0 and 1000.

Two decorators are required in addition.  `@ValidateAccessor` and `@ValidateParams` both ensure that the validations are performed.  The first intercepts attempts to assign a value to the accessor.  The second intercepts calls to the method.  Both perform the validations on the values received by the intercepted function invocation.

The coder does not explicitly request that validation is performed.  Instead, this pattern of decorators ensures that validation is performed on every assignment to the accessor, or to every method call.

Essentially every other data validation package requires that the coder explicitly invoke data validation.  Doesn't this raise the risk that the coder will forget to do validation on a critical code path?  With this package, data validation is performed on every assignment and every method call which carries the decorators.



The package includes a very long list of validation decorators.  The implementation uses [validator.js](https://www.npmjs.com/package/validator) in the background.  Development was inspired by [class-validator](https://www.npmjs.com/package/class-validator).
