---
layout: article.html.ejs
title: Developing custom validator decorators
---

Implementing a custom validation decorator is simple by using the `generateValidationDecorator` function.  This function assists with generating decorator functions that store necessary data in reflection metadata.  This function is used in all validation decorators exported by the `runtime-data-validation` package.

The following code comes from the test suite, `test/src/custom.ts` in the repository.

```ts
import {
    ValidateParams, ValidateAccessor, generateValidationDecorator
} from 'runtime-data-validation';
```

Import a few functions from the package, including `generateValidationDecorator`.

```ts
type CustomType = {
    flag1: boolean;
    speed: number;
    title?: string;
};
```

Define a data type that we will validate.  In TypeScript it is not possible to attach decorators to such a type.  But we could use this type as an object field, or as a method parameter.

```ts
class CustomValidationExample {

    #custom: CustomType;

    @ValidateAccessor<CustomType>()
    @IsCustom()
    set custom(nc: CustomType) { this.#custom = nc; }
    get custom() { return this.#custom; }
}

const cve = new CustomValidationExample();
```

This is a simple class which uses the type in a property.  There are `set` and `get` accessors for this property.  It uses the type in the correct way, storing the value provided to `set` into the private property.

Validation uses a decorator, `@IsCustom`, that could be implemented like so:

```ts
const isCustomType = (value: any): boolean => {
    if (typeof value !== 'object') {
        return false;
    }
    if (typeof value?.flag1 !== 'boolean'
     || typeof value?.speed !== 'number') {
        return false;
    }
    if (typeof value?.title !== 'undefined'
     && typeof value?.title !== 'string') {
        return false;
    }
    return true;
};

function IsCustom() {
    return generateValidationDecorator(
        isCustomType,
        `Value :value: is not a CustomType`);
}
```

Each TypeScript decorator is implemented by a function.  For a complete introduction see [_How to Use and Implement TypeScript Decorators_](https://javascript.plainenglish.io/deep-introduction-to-using-and-implementing-typescript-decorators-a9e876ad0d43)

This decorator function follows the decorator factory pattern.  The `IsCustom` function itself is not a decorator function.  Instead the decorator function is returned by `generateValidationDecorator`.

This function takes two parameters:

* The validation function - these return `false` if the item fails validation, and `true` if it is valid
* A message to use in the thrown exception if validation fails.  The marker `:value:` will receive the text resulting from calling `util.inspect(value)`.

In this case, `isCustomType` can serve as a _Type Guard_ function separately from being used in the validation decorator.  Type guards is a pattern recommended by the TypeScript team to create functions like this which inspect objects and determine if the object matches a desired shape.  The `isCustomType` function is then used as the validation function.

The following tests produce either success or failure:

```ts
const cve = new CustomValidationExample();

// Success cases
cve.custom = {
    flag1: true,
    speed: 1000
};
cve.custom = {
    flag1: false,
    speed: -2000
};

// Failure cases
cve.custom = 'Fooo';
cve.custom = {  };
cve.custom = {
    flag1: 'true',
    speed: '1000'
};
```

The success cases match the shape of CustomType, while the failure cases do not.  For the failure cases an exception is thrown by the validation.

The TypeScript compiler will flag these at compile time.  But what if your code is used from JavaScript where there is no compile time, nor compile time type checking?

Using the decorator factory pattern we can easily pass parameters to use in validation.

```ts
function IsCustomRange(min: number, max: number) {
    return generateValidationDecorator(
        (value) => {
            if (!isCustomType(value)) return false;
            const ct = <CustomType>value;
            if (ct.speed < min || ct.speed > max) return false;
            return true;
        },
        `Value :value: is not a CustomType`);
}
```

This decorator function takes two values, `min` and `max`.  The validation function first verifies that value matches the shape of _CustomType_.  It then performs a range check on the `speed` property, to make sure it is within the range specified.

To implement this in the class, add the following:

```ts
#customRange: CustomType;

@ValidateAccessor<CustomType>()
@IsCustomRange(0, 100)
set customRange(nc: CustomType) { this.#customRange = nc; }
get customRange() { return this.#customRange; }
```

