
export {
    ValidateParams, ValidateAccessor, generateValidationDecorator
} from './validators';

export * as validators from './validators/index';
export * from './decorators/index';
export * as conversions from './conversions';

// export const ToBoolean = conversions.ToBoolean;
// export const ToDate = conversions.ToDate;
// export const ToFloat = conversions.ToFloat;
// export const ToInt = conversions.ToInt;

// TBD: isAfter 
// isAfter(str [, date]) 	check if the string is a date that's after the specified date (defaults to now).


// isBefore(str [, date]) 	check if the string is a date that's before the specified date.

// isDivisibleBy(str, number) 	check if the string is a number that's divisible by another.