
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    IsFQDN, IsHash, IsIBAN, IsIMEI, IsISBN, IsISIN,
    IsLatLong,
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';


describe('IMEI', function() {

    class IMEIExample {
        #imei: string;

        @ValidateAccessor<string>()
        @IsIMEI()
        set imei(ni: string) { this.#imei = ni; }
        get imei() { return this.#imei; }

        @ValidateAccessor<string>()
        @IsIMEI({ allow_hyphens: true })
        set imeiHyphens(ni: string) { this.#imei = ni; }
        get imeiHyphens() { return this.#imei; }

        @ValidateParams
        checkIMEI(
            @IsIMEI() ni: string
        ) {
            return ni;
        }

        @ValidateParams
        checkIMEIHyphens(
            @IsIMEI({ allow_hyphens: true }) ni: string
        ) {
            return ni;
        }
    }

    const ie = new IMEIExample();

    const valid = [
        '352099001761481',
        '868932036356090',
        '490154203237518',
        '546918475942169',
        '998227667144730',
        '532729766805999',
    ];
    const invalid = [
        '490154203237517',
        '3568680000414120',
        '3520990017614823',
    ];


    it('should validate correct IMEI numbers accessors', function() {
        for (const v of valid) {
            ie.imei = v;
            assert.equal(v, ie.imei);
        }
    });

    it('should validate correct IMEI numbers parameters', function() {
        for (const v of valid) {
            const result = ie.checkIMEI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IMEI numbers accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ie.imei = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IMEI numbers parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ie.checkIMEI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validHY = [
        '35-209900-176148-1',
        '86-893203-635609-0',
        '49-015420-323751-8',
        '54-691847-594216-9',
        '99-822766-714473-0',
        '53-272976-680599-9',
    ];
    const invalidHY = [
        '49-015420-323751-7',
        '35-686800-0041412-0',
        '35-209900-1761482-3',
    ];

    it('should validate correct IMEI-Hyphens numbers accessors', function() {
        for (const v of validHY) {
            ie.imeiHyphens = v;
            assert.equal(v, ie.imeiHyphens);
        }
    });

    it('should validate correct IMEI-Hyphens numbers parameters', function() {
        for (const v of validHY) {
            const result = ie.checkIMEIHyphens(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IMEI-Hyphens numbers accessors', function() {

        for (const iv of invalidHY) {
            let failed = false;
            try {
                ie.imeiHyphens = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IMEI-Hyphens numbers parameters', function() {

        for (const iv of invalidHY) {
            let failed = false;
            try {
                const result = ie.checkIMEIHyphens(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });


});

describe('LatLong', function() {

    class LatLongExample {

        #latlong: string;

        @ValidateAccessor<string>()
        @IsLatLong()
        set latlong(ni: string) { this.#latlong = ni; }
        get latlong() { return this.#latlong; }

        @ValidateParams
        checkLatLong(
            @IsLatLong() ni: string
        ) {
            return ni;
        }

        #latlongDMS: string;

        @ValidateAccessor<string>()
        @IsLatLong({ checkDMS: true })
        set latlongDMS(ni: string) { this.#latlongDMS = ni; }
        get latlongDMS() { return this.#latlongDMS; }

        @ValidateParams
        checkLatLongDMS(
            @IsLatLong({ checkDMS: true }) ni: string
        ) {
            return ni;
        }

    }

    const lle = new LatLongExample();

    const valid = [
        '(-17.738223, 85.605469)',
        '(-12.3456789, +12.3456789)',
        '(-60.978437, -0.175781)',
        '(77.719772, -37.529297)',
        '(7.264394, 165.058594)',
        '0.955766, -19.863281',
        '(31.269161,164.355469)',
        '+12.3456789, -12.3456789',
        '-15.379543, -137.285156',
        '(11.770570, -162.949219)',
        '-55.034319, 113.027344',
        '58.025555, 36.738281',
        '55.720923,-28.652344',
        '-90.00000,-180.00000',
        '(-71, -146)',
        '(-71.616864, -146.616864)',
        '-0.55, +0.22',
        '90, 180',
        '+90, -180',
        '-90,+180',
        '90,180',
        '0, 0',
    ];
    const invalid = [
        '(020.000000, 010.000000000)',
        '89.9999999989, 360.0000000',
        '90.1000000, 180.000000',
        '+90.000000, -180.00001',
        '090.0000, 0180.0000',
        '126, -158',
        '(-126.400010, -158.400010)',
        '-95, -96',
        '-95.738043, -96.738043',
        '137, -148',
        '(-137.5942, -148.5942)',
        '(-120, -203)',
        '(-119, -196)',
        '+119.821728, -196.821728',
        '(-110, -223)',
        '-110.369532, 223.369532',
        '(-120.969949, +203.969949)',
        '-116, -126',
        '-116.894222, -126.894222',
        '-112, -160',
        '-112.96381, -160.96381',
        '-90., -180.',
        '+90.1, -180.1',
        '(-17.738223, 85.605469',
        '0.955766, -19.863281)',
        '+,-',
        '(,)',
        ',',
        ' ',
    ];

    it('should validate correct Lat Long accessors', function() {
        for (const v of valid) {
            lle.latlong = v;
            assert.equal(v, lle.latlong);
        }
    });

    it('should validate correct Lat Long parameters', function() {
        for (const v of valid) {
            const result = lle.checkLatLong(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Lat Long accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                lle.latlong = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Lat Long parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = lle.checkLatLong(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDMS = [
        '40° 26′ 46″ N, 79° 58′ 56″ W',
        '40° 26′ 46″ S, 79° 58′ 56″ E',
        '90° 0′ 0″ S, 180° 0′ 0″ E',
        '40° 26′ 45.9996″ N, 79° 58′ 55.2″ E',
        '40° 26′ 46″ n, 79° 58′ 56″ w',
        '40°26′46″s, 79°58′56″e',
        '11° 0′ 0.005″ S, 180° 0′ 0″ E',
        '40°26′45.9996″N, 79°58′55.2″E',

    ];
    const invalidDMS = [
        '100° 26′ 46″ N, 79° 70′ 56″ W',
        '40° 89′ 46″ S, 79° 58′ 100″ E',
        '40° 26.445′ 45″ N, 79° 58′ 55.2″ E',
        '40° 46″ N, 79° 58′ 56″ W',
    ];

    it('should validate correct Lat Long DMS accessors', function() {
        for (const v of valid) {
            lle.latlongDMS = v;
            assert.equal(v, lle.latlongDMS);
        }
    });

    it('should validate correct Lat Long DMS parameters', function() {
        for (const v of valid) {
            const result = lle.checkLatLongDMS(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Lat Long DMS accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                lle.latlongDMS = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Lat Long DMS parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = lle.checkLatLongDMS(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});
