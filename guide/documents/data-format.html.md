---
layout: article.html.ejs
title: Data formats for validation, and storing data
---

As of this writing, the validation decorators and validation functions primarily validate string data.  A few of the functions act on numbers, and in that case can take either `string` or `number` data.  Obviously there are many other data types we might want to validate, so let's discuss what to do.

This package is based on `validator.js` which validates `string` data items.  It has a long list of validation functions, all of which validate strings.

A simple example is:

```ts
class Example {
    #title: string;

    @ValidateAccessor<string>()
    @IsAlpha('en-US')
    set title(ny: string) { this.#title = ny; }
    get title() { return this.#title; }
}
```

The `IsAlpha` decorator ensures that the string assigned to `#title` only contains alphabetic characters.  There are an extremely large number of data items that have a string representation, and can be stored this way.

One strategy to consider is to be given a string, but to then store the data in its native format.

```ts
class ImgRef {
    #src: URL;

    @ValidateAccessor<string>()
    @IsURL()
    set src(nurl: string) { this.#src = new URL(nurl); }
    get src() { return this?.#src?.toString(); }

    url()  { return this.#src; }
    toString() { return this.#src?.toString(); }
    get protocol() { return this?.#src?.protocol; }
    get host() { return this?.#src?.host; }
    get pathname() { return this?.#src?.pathname; }
}
```

The example is to store a URL for an image.  The `set` accessor receives the URL as a string, but we can use `new URL(url)` to parse that to an URL object, and store it as a URL.  We can then implement other `get` accessors to retrieve fields from the URL, and a `toString` method for conversion back to string format..

A similar example:

```ts
class Speed {
    #viteza: number;

    @ValidateAccessor<string | number>()
    @IsFloatRange(0, 99999)
    set speed(ns: string | number) { this.#viteza = ToFloat(ns); }
    get speed() { return this.#viteza; }

    toString() { return this?.#viteza?.toString(); }
}
```

This is the same strategy of receiving data as a `string`, and converting it to the native data format.  Notice that the type supplied to the `set` accessor and to `@ValidateAccessor` is `string | number`, so that TypeScript knows to accept either data format.

The `@IsFloatRange` uses the `isFloat` function from `validator.js`, which only validates `string` data.  This means `@IsFloatRange` tests its input, and if it is a `number` it handles the validation itself rather than using `validator.js`.
