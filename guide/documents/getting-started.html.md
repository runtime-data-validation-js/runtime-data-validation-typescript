---
layout: article.html.ejs
title: Getting started with the runtime-data-validation package
---

The `runtime-data-validation` package is available for TypeScript projects running on Node.js.  It requires the decorator support provided by TypeScript.  In theory it can run in the browser, but that hasn't been implemented.

Installation:

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