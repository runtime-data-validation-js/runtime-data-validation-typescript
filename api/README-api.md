This is the detailed API documentation for `runtime-data-validation`.  This package contains a long list of TypeScript decorators for performing automatic data validation.

For an overview of the package see [the project home page](../index.html)

This package contains three major functional units:

Group                                | Discussion
-------------------------------------|-----------------
_Decorators_ and _Validation Decorators_ | Decorator functions for use in data validation
_Validation functions_ and _Options_ | Regular functions and configuration types for performing validation
_Conversion functions_               | Functions which assist with converting data from a string format to the native format

As of this writing the _Validation functions_ are mostly simple wrappers over functions provided by the `validator.js` package.  Likewise, the _Validation decorators_ are simple wrappers over those functions.

# Using the Decorators

Unfortunately, TypeDoc is excellent at documenting API methods, but does not present decorator functions as decorators.  For the functions we've categorized as decorators, the API will be described something like this:

```js
IsAlpha(locale?: string, options?: IsAlphaOptions):
  (target: Object, propertyKey?: string | symbol, descriptor?: number | PropertyDescriptor)
  => void
```

This is the `@IsAlpha()` decorator.  This decorator takes two optional parameters, _locale_ and _options_.  Any parameters shown are where you should focus your attention.  The return type shown here is the decorator function, which you should ignore since it is an implementation detail of TypeScript decorators.

In other words, the usage is:

```ts
class Example {
    #title: string;

    @ValidateAccessor<string>()
    @IsAlpha('en-US')
    set title(ny: string) { this.#title = ny; }
    get title() { return this.#title; }
}
```

In other words, coding this as a decorator we use `@DecoratorName()` and do not pay attention to the decorator function return value.

# String focused validation and other data types

This needs to be a Guide article



# Data format for validation

This package is built using the [validator.js](https://www.npmjs.com/package/validator) package.  Every validation function in package validates data in `string` format.

It may be that _validator.js_ focuses on validating data you might receive from an HTML FORM or other string-based inputs like a JSON file.

In this package, we have extended that model to validate _number_ values in cases where appropriate.  Primarily this applies to `@IsFloat()` and `@IsInt()`, and we see above the issue.

The native data type for both is `number`.  But in the example above, the parameter types are `number | string`.  This type is for compatibility with the validation function.  But, for storage in the class, the data should be stored in its native data type.  Hence, the `ToInt` and `ToFloat` functions are used for that purpose.



