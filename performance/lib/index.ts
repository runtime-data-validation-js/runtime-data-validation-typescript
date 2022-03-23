import * as b from 'benny';

import {
    ValidateAccessor, IsFloatRange,
    conversions, setEnabled as ValidateEnabled
} from 'runtime-data-validation';

const { ToFloat } = conversions;

export class SpeedExample {

    #speed: number;

    @ValidateAccessor<number | string>()
    @IsFloatRange(10, 70)
    set speed(nc: number | string) { 
        this.#speed = ToFloat(nc);
    }
    get speed() { return this.#speed; }

}

const spcheck = new SpeedExample();

export class SpeedExampleUnchecked {

    #speed: number;

    set speed(nc: number | string) { 
        this.#speed = ToFloat(nc);
    }
    get speed() { return this.#speed; }

}

const spuncheck = new SpeedExampleUnchecked();

export class SpeedExampleSimple {

    #speed: number;

    set speed(nc: number) { this.#speed = nc; }
    get speed() { return this.#speed; }

}

const spsimplecheck = new SpeedExampleSimple();

const options = {
    maxTime: 10
    // minTime: 20
};

b.suite(
    'Performance',

    b.add('set speed checked', () => {
        spcheck.speed = (Math.random() * 60) + 10;
    }, options),

    b.add('set speed unchecked', () => {
        spuncheck.speed = (Math.random() * 60) + 10;
    }, options),

    b.add('set speed simple', () => {
        spsimplecheck.speed = (Math.random() * 60) + 10;
    }, options),

    b.add('set speed checking disabled', () => {
        ValidateEnabled(false);
        return () => {
            spcheck.speed = (Math.random() * 60) + 10;
        };
    }, options),

    b.cycle(),
    b.complete(),
    b.save({ file: 'check', version: '1.0.0' }),
    b.save({ file: 'check', format: 'chart.html' }),
);
