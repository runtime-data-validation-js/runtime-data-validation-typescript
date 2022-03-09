This is the detailed API documentation for `runtime-data-validation`.  This package contains a long list of TypeScript decorators for performing automatic data validation.

This package contains three major functional units:

* [_Execution Decorators_ and _Validation Decorators_](./modules.html) -- Decorator functions for use in data validation
* [_Validation functions_ and _Options_](./modules/validators.html) -- Regular functions and configuration types for performing validation.  The validation functions can also be used as type guards.
* [_Conversion functions_](./modules/conversions.html) -- Functions which assist with converting data from a string format to the native format

As of this writing the _Validation functions_ are mostly simple wrappers over functions provided by the `validator.js` package.  Likewise, the _Validation decorators_ are simple wrappers over those functions.

