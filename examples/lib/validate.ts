import {
    ValidateAccessor, ValidateParams,
    IsIntRange, IsInt, IsFloatRange,
    conversions
} from 'runtime-data-validation';

const { ToFloat, ToInt } = conversions;

export class ValidateExample {

    #year: number;

    @ValidateAccessor<number>()
    @IsIntRange(1990, 2050)
    @IsInt()
    set year(ny: number | string) { this.#year = ToInt(ny); }
    get year() { return this.#year; }

    @ValidateParams
    area(
        @IsFloatRange(0, 1000) width: number | string,
        @IsFloatRange(0, 1000) height: number | string
    ) {
        return ToFloat(width) * ToFloat(height);
    }

}

const ve = new ValidateExample();

ve.year = 1999;
console.log({
    year: ve.year,
    area: ve.area(10, 200)
});

// Error: Value 2150 not an integer between 1990 and 2050
// ve.year = 2150;

console.log(ve.area('10', '200'));

// Error: Value 'two hundred' not a float between 0 and 1000
console.log(ve.area('10', 'two hundred'));

