This is the detailed API documentation for `runtime-data-validation`.  This package contains a long list of TypeScript decorators for performing automatic data validation.

It does this by instrumenting the `set` accessor and method calls where the developer has added validation decorators.  That is:

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

The `ValidateAccessor` and `ValidateParams` decorators trigger execution of the validation decorators.  The other decorators perform the corresponding validations.

Most of the functions exported by this package are decorator functions.  The sidebar is unfortunately not divided into groups, but scroll to the top of [modules.html](modules.html) and you'll see everything divided into these categories:

* _Validation Decorator_ -- Decorator functions for use in data validation
* _Options_ -- TypeScript types for use with certain decorator functions
* _Conversion_ -- Functions which assist with converting data from a string format to the native format

# Using the Decorators

Unfortunately, TypeDoc is not presenting the API to be clear how to use the decorators.  Let's take one example:

```js
IsAlpha(locale?: string, options?: IsAlphaOptions):
  (target: Object, propertyKey?: string | symbol, descriptor?: number | PropertyDescriptor)
  => void
```

This is the `@IsAlpha()` decorator.  The decorator options are the first  parameter list, in this case _locale_ and _options_.  One should ignore the return type, since it is what's required for this to be recognized by TypeScript as a decorator.

In other words, the usage is:

```ts
class Example {
    #title: string;

    @ValidateAccessor<string>()
    @IsAlpha(locale: 'en-US')
    set title(ny: string) { this.#title = ny; }
    get title() { return this.#title; }
}
```

In other words, coding this as a decorator we use `@DecoratorName()` and do not pay attention to the decorator function return value.

# Data format for validation

This package is built using the [validator.js](https://www.npmjs.com/package/validator) package.  Every validation function in package validates data in `string` format.

It may be that _validator.js_ focuses on validating data you might receive from an HTML FORM or other string-based inputs like a JSON file.

In this package, we have extended that model to validate _number_ values in cases where appropriate.  Primarily this applies to `@IsFloat()` and `@IsInt()`, and we see above the issue.

The native data type for both is `number`.  But in the example above, the parameter types are `number | string`.  This type is for compatibility with the validation function.  But, for storage in the class, the data should be stored in its native data type.  Hence, the `ToInt` and `ToFloat` functions are used for that purpose.



