import {
    ValidateAccessor, ValidateParams,
    IsAlpha
} from 'runtime-data-validation';

class Example {
    #title: string;

    @ValidateAccessor<string>()
    @IsAlpha('en-US')
    set title(ny: string) { this.#title = ny; }
    get title() { return this.#title; }
}

const ee = new Example();

ee.title = 'AManForAllSeasons';
console.log(ee.title);

// Error: Value 'A Man For All Seasons' is not alpha en-US
// ee.title = 'A Man For All Seasons';
// console.log(ee.title);

// Error: Value 'diplomaticăîntrsurpriză' is not alpha en-US
ee.title = 'diplomaticăîntrsurpriză';
console.log(ee.title);
