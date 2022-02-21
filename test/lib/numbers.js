"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const runtime_data_validation_1 = require("runtime-data-validation");
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
describe('Integers', function () {
    var _IntegerExample_value, _IntegerExample_range;
    class IntegerExample {
        constructor() {
            _IntegerExample_value.set(this, void 0);
            _IntegerExample_range.set(this, void 0);
        }
        set value(nv) { __classPrivateFieldSet(this, _IntegerExample_value, nv, "f"); }
        get value() { return __classPrivateFieldGet(this, _IntegerExample_value, "f"); }
        set range(nr) { __classPrivateFieldSet(this, _IntegerExample_range, nr, "f"); }
        get range() { return __classPrivateFieldGet(this, _IntegerExample_range, "f"); }
    }
    _IntegerExample_value = new WeakMap(), _IntegerExample_range = new WeakMap();
    __decorate([
        (0, runtime_data_validation_1.ValidateAccessor)(),
        (0, runtime_data_validation_1.IsInt)(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], IntegerExample.prototype, "value", null);
    __decorate([
        (0, runtime_data_validation_1.ValidateAccessor)(),
        (0, runtime_data_validation_1.IsIntRange)(10, 100),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], IntegerExample.prototype, "range", null);
    const ie = new IntegerExample();
    it('Should set integer value', function () {
        ie.value = 33;
        chai_1.assert.equal(ie.value, 33);
    });
    it('Should fail to set floating value', function () {
        let failed = false;
        try {
            ie.value = 33.33;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
    });
    it('Should set within range', function () {
        ie.range = 10;
        chai_1.assert.equal(ie.range, 10);
        ie.range = 33;
        chai_1.assert.equal(ie.range, 33);
        ie.range = 66;
        chai_1.assert.equal(ie.range, 66);
        ie.range = 100;
        chai_1.assert.equal(ie.range, 100);
    });
    it('Should fail with out-of-range', function () {
        let failed = false;
        try {
            ie.range = 5;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
        failed = false;
        try {
            ie.range = -5;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
        failed = false;
        try {
            ie.range = 105;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
    });
});
describe('Floats', function () {
    var _FloatExample_value, _FloatExample_range;
    class FloatExample {
        constructor() {
            _FloatExample_value.set(this, void 0);
            _FloatExample_range.set(this, void 0);
        }
        set value(nv) { __classPrivateFieldSet(this, _FloatExample_value, nv, "f"); }
        get value() { return __classPrivateFieldGet(this, _FloatExample_value, "f"); }
        set range(nr) { __classPrivateFieldSet(this, _FloatExample_range, nr, "f"); }
        get range() { return __classPrivateFieldGet(this, _FloatExample_range, "f"); }
    }
    _FloatExample_value = new WeakMap(), _FloatExample_range = new WeakMap();
    __decorate([
        (0, runtime_data_validation_1.ValidateAccessor)(),
        (0, runtime_data_validation_1.IsFloat)(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], FloatExample.prototype, "value", null);
    __decorate([
        (0, runtime_data_validation_1.ValidateAccessor)(),
        (0, runtime_data_validation_1.IsFloatRange)(10, 100),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], FloatExample.prototype, "range", null);
    const fe = new FloatExample();
    it('Should set float value', function () {
        fe.value = 33;
        chai_1.assert.equal(fe.value, 33);
        fe.value = 33.33;
        chai_1.assert.equal(fe.value, 33.33);
    });
    it('Should not fail to set floating value', function () {
        let failed = false;
        try {
            fe.value = 33.33;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, false);
    });
    it('Should set within range', function () {
        fe.range = 10;
        chai_1.assert.equal(fe.range, 10);
        fe.range = 33;
        chai_1.assert.equal(fe.range, 33);
        fe.range = 66;
        chai_1.assert.equal(fe.range, 66);
        fe.range = 100;
        chai_1.assert.equal(fe.range, 100);
    });
    it('Should fail with out-of-range', function () {
        let failed = false;
        try {
            fe.range = 5;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
        failed = false;
        try {
            fe.range = -5;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
        failed = false;
        try {
            fe.range = 105;
        }
        catch (e) {
            failed = true;
        }
        chai_1.assert.equal(failed, true);
    });
});
