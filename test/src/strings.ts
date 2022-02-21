
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    ValidateParams, ValidateAccessor
} from 'runtime-data-validation';

describe('Contains', function() {

    class ContainsExample {

        #title: string;

        @ValidateAccessor<string>()
        @Contains('world')
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @Contains('world')
            message: string) {
            return message;
        }
    }

    const ce = new ContainsExample();

    it('Should contain string', function() {
        ce.title = 'Maggies world';
        assert.equal(ce.title, 'Maggies world');
    });

    it('Should fail on bad string', function() {
        let failed = false;
        try {
            ce.title = 'Gillagans Wake';
            assert.equal(ce.title, 'Gillagans Wake');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should echo good param', function() {
        const msg = 'Reiki world';
        const result = ce.echo(msg);
        assert.equal(result, msg);
    });

    it('Should fail on bad parameter', function() {
        let failed = false;
        try {
            const msg = 'Reiki World';
            const result = ce.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});

describe('Equals', function() {
    class EqualsExample {

        #title: string;

        @ValidateAccessor<string>()
        @Equals('world')
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        @ValidateParams
        echo(
            @Equals('world')
            message: string) {
            return message;
        }
    }

    const ee2 = new EqualsExample();

    it('Should equal', function() {
        ee2.title = 'world';
        assert.equal(ee2.title, 'world');
    });

    it('Should fail not equal', function() {
        let failed = false;
        try {
            ee2.title = 'World';
            assert.equal(ee2.title, 'World');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });

    it('Should echo good param', function() {
        const msg = 'world';
        const result = ee2.echo(msg);
        assert.equal(result, msg);
    });

    it('Should fail on bad parameter', function() {
        let failed = false;
        try {
            const msg = 'World';
            const result = ee2.echo(msg);
            assert.equal(result, msg);
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});

describe('IsAlpha - IsAlphanumeric', function() {

    class AlphaExample {

        #title: string;

        @ValidateAccessor<string>()
        @IsAlpha()
        set title(nt: string) { this.#title = nt; }
        get title() { return this.#title; }

        #license: string;

        @ValidateAccessor<string>()
        @IsAlphanumeric()
        set license(nt: string) { this.#license = nt; }
        get license() { return this.#license; }

        @ValidateParams
        titlense(
            @IsAlpha()        newtitle: string,
            @IsAlphanumeric() newlicense: string
        ) {
            this.title = newtitle;
            this.license = newlicense;
        }
    }

    const ae = new AlphaExample();

    it('Should set values', function() {
        ae.title = 'GilligansWake';
        assert.equal(ae.title, 'GilligansWake');

        ae.license = '4HDR298';
        assert.equal(ae.license, '4HDR298');

        ae.titlense('BoatWake', 'UBUYGAS1');
        assert.equal(ae.title, 'BoatWake');
        assert.equal(ae.license, 'UBUYGAS1');
    });

    it('Should fail for bad values', function() {
        let failed = false;
        try {
            ae.title = 'Words with Spaces';
            assert.equal(ae.title, 'Words with Spaces');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.license = 'Words with Spaces1234';
            assert.equal(ae.license, 'Words with Spaces1234');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.titlense('Boat Wake', 'UBUYGAS1');
            assert.equal(ae.title, 'Boat Wake');
            assert.equal(ae.license, 'UBUYGAS1');
        } catch (e) { failed = true; }
        assert.equal(failed, true);

        failed = false;
        try {
            ae.titlense('BoatWake', 'U-BUY-GAS-1');
            assert.equal(ae.title, 'BoatWake');
            assert.equal(ae.license, 'U-BUY-GAS-1');
        } catch (e) { failed = true; }
        assert.equal(failed, true);
    });
});

