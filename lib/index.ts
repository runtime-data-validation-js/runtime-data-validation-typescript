
/* import * as _params from './ParameterValidators';
export const params = _params;
import * as _accessors from './AccessorValidation';
export const accessors = _accessors; */

import * as util from 'util';
import * as numbers from './funcs/numbers';
import { generateValidationDecorator } from './validators';
export { ValidateParams, ValidateAccessor } from './validators';
import { default as validator } from 'validator';

export * from './dates.js';
export * from './formats.js';
export * from './numerical.js';
export * from './strings.js';

// TBD: isAfter 
// isAfter(str [, date]) 	check if the string is a date that's after the specified date (defaults to now).


// isBefore(str [, date]) 	check if the string is a date that's before the specified date.

