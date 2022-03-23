This directory contains an attempt to benchmark `runtime-data-validation`

The idea is to measure the difference between using validation or not, and determine if or how much this package slows down an application.  It's one thing to handwave an argument that because it adds extra code, and introduces more computation per operation, that using this package will make the application slower.  The goal is to use a standard benchmarking framework and run some tests.

But, the initial test produces results backwards from what's expected.

```
$ node dist/index.js 
Running "Performance" suite...
Progress: 100%

  set speed checked:
    11 145 264 ops/s, ±1.12%   | fastest

  set speed unchecked:
    7 000 367 ops/s, ±1.82%    | 37.19% slower

  set speed simple:
    6 733 752 ops/s, ±2.21%    | slowest, 39.58% slower

  set speed checking disabled:
    10 617 306 ops/s, ±1.17%   | 4.74% slower

Finished 4 cases!
  Fastest: set speed checked
  Slowest: set speed simple

Saved to: benchmark/results/check.json

Saved to: benchmark/results/check.chart.html
```

The `set speed checked` scenario is a simple class with validation decorators.  Both `set speed unchecked` and `set speed simple` are the same class but no validation decorators.  The `set speed checking disabled` scenario is the initial class, with validation decorators, but having called a function to disable their effect.

The expectation is that `set speed checked` would be the slowest, but you can see it's the fastest.

There is a fairly high degree of uncertainty, but the `benny` documentation doesn't describe what to do.

The test class:

```ts
export class SpeedExample {

    #speed: number;

    @ValidateAccessor<number | string>()
    @IsFloatRange(10, 70)
    set speed(nc: number | string) { 
        this.#speed = ToFloat(nc);
    }
    get speed() { return this.#speed; }

}
```

The variant scenarios are based on this.

Setup steps were:

```
$  git clone git@github.com:runtime-data-validation-js/runtime-data-validation-typescript.git
$  cd runtime-data-validation-typescript/
$  cd performance/
$  npm init -y
$  npm install benny --save
$  npm install .. --save
$  npm install typescript @types/node --save
$  npm install @types/benchmark --save
$  npm run build
$  node dist/index.js
```

In the parent directory, where the `runtime-data-validation` lives, run `npm run build` and `npm run watch` so that the package is kept up-to-date.