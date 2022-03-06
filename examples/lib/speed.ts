
import {
    ValidateAccessor, IsFloatRange,
    conversions
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

const sp = new SpeedExample();

sp.speed = 30;
console.log({ speed: sp.speed, type: typeof sp.speed });

sp.speed = '30';
console.log({ speed: sp.speed, type: typeof sp.speed });

// sp.speed = 300;
// console.log(sp.speed);

sp.speed = '300 miles/hr';
console.log(sp.speed);
