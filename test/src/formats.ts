
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    IsFQDN, IsHash, IsIBAN, IsIMEI, IsISBN, IsISIN,
    IsLatLong, IsLicensePlate,
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

describe('Car license plates', function() {

    class LicensePlateExample {

        #plate: string;

        @ValidateAccessor<string>()
        @IsLicensePlate()
        set plate(ni: string) { this.#plate = ni; }
        get plate() { return this.#plate; }

        @ValidateParams
        checkLicPlate(
            @IsLicensePlate() ni: string
        ) {
            return ni;
        }

        #platePTPT: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('pt-PT')
        set platePTPT(ni: string) { this.#platePTPT = ni; }
        get platePTPT() { return this.#platePTPT; }

        @ValidateParams
        checkLicPlatePTPT(
            @IsLicensePlate('pt-PT') ni: string
        ) {
            return ni;
        }

        #plateDELI: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('de-LI')
        set plateDELI(ni: string) { this.#plateDELI = ni; }
        get plateDELI() { return this.#plateDELI; }

        @ValidateParams
        checkLicPlateDELI(
            @IsLicensePlate('de-LI') ni: string
        ) {
            return ni;
        }

        #plateDEDE: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('de-DE')
        set plateDEDE(ni: string) { this.#plateDEDE = ni; }
        get plateDEDE() { return this.#plateDEDE; }

        @ValidateParams
        checkLicPlateDEDE(
            @IsLicensePlate('de-DE') ni: string
        ) {
            return ni;
        }

        #plateFIFI: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('fi-FI')
        set plateFIFI(ni: string) { this.#plateFIFI = ni; }
        get plateFIFI() { return this.#plateFIFI; }

        @ValidateParams
        checkLicPlateFIFI(
            @IsLicensePlate('fi-FI') ni: string
        ) {
            return ni;
        }

        #plateSQAL: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('sq-AL')
        set plateSQAL(ni: string) { this.#plateSQAL = ni; }
        get plateSQAL() { return this.#plateSQAL; }

        @ValidateParams
        checkLicPlateSQAL(
            @IsLicensePlate('sq-AL') ni: string
        ) {
            return ni;
        }

        #plateCSCZ: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('cs-CZ')
        set plateCSCZ(ni: string) { this.#plateCSCZ = ni; }
        get plateCSCZ() { return this.#plateCSCZ; }

        @ValidateParams
        checkLicPlateCSCZ(
            @IsLicensePlate('cs-CZ') ni: string
        ) {
            return ni;
        }

        #platePTBR: string;

        @ValidateAccessor<string>()
        @IsLicensePlate('pt-BR')
        set platePTBR(ni: string) { this.#platePTBR = ni; }
        get platePTBR() { return this.#platePTBR; }

        @ValidateParams
        checkLicPlatePTBR(
            @IsLicensePlate('pt-BR') ni: string
        ) {
            return ni;
        }

    }

    const lpe = new LicensePlateExample();

    const validPTPT = [
        'AA-12-34',
        '12·34·AB',
        '12·AB·34',
        'AB 12 CD',
        'AB12CD',
    ];
    const invalidPTPT = [
        '',
        'notalicenseplate',
        'A1-B2-C3',
        'ABC-1-EF',
    ];

    it('should validate correct Car License Plate pt-PT accessors', function() {
        for (const v of validPTPT) {
            lpe.platePTPT = v;
            assert.equal(v, lpe.platePTPT);
        }
    });

    it('should validate correct Car License Plate pt-PT parameters', function() {
        for (const v of validPTPT) {
            const result = lpe.checkLicPlatePTPT(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate pt-PT accessors', function() {

        for (const iv of invalidPTPT) {
            let failed = false;
            try {
                lpe.platePTPT = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate pt-PT parameters', function() {

        for (const iv of invalidPTPT) {
            let failed = false;
            try {
                const result = lpe.checkLicPlatePTPT(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDELI = [
        'FL 1',
        'FL 99999',
        'FL 1337',
    ];
    const invalidDELI = [
        '',
        'FL 999999',
        'AB 12345',
        'FL -1',
    ];

    it('should validate correct Car License Plate de-LI accessors', function() {
        for (const v of validDELI) {
            lpe.plateDELI = v;
            assert.equal(v, lpe.plateDELI);
        }
    });

    it('should validate correct Car License Plate de-LI parameters', function() {
        for (const v of validDELI) {
            const result = lpe.checkLicPlateDELI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate de-LI accessors', function() {

        for (const iv of invalidDELI) {
            let failed = false;
            try {
                lpe.plateDELI = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate de-LI parameters', function() {

        for (const iv of invalidDELI) {
            let failed = false;
            try {
                const result = lpe.checkLicPlateDELI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDEDE = [
        'M A 1',
        'M A 12',
        'M A 123',
        'M A 1234',
        'M AB 1',
        'M AB 12',
        'M AB 123',
        'M AB 1234',
        'FS A 1',
        'FS A 12',
        'FS A 123',
        'FS A 1234',
        'FS AB 1',
        'FS AB 12',
        'FS AB 123',
        'FS AB 1234',
        'FSAB1234',
        'FS-AB-1234',
        'FS AB 1234 H',
        'FS AB 1234 E',
        'FSAB1234E',
        'FS-AB-1234-E',
    ];
    const invalidDEDE = [
        'YY AB 123',
        'PAF AB 1234',
        'M ABC 123',
        'M AB 12345',
        'FS AB 1234 A',
    ];

    it('should validate correct Car License Plate de-DE accessors', function() {
        for (const v of validDEDE) {
            lpe.plateDEDE = v;
            assert.equal(v, lpe.plateDEDE);
        }
    });

    it('should validate correct Car License Plate de-DE parameters', function() {
        for (const v of validDEDE) {
            const result = lpe.checkLicPlateDEDE(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate de-DE accessors', function() {

        for (const iv of invalidDEDE) {
            let failed = false;
            try {
                lpe.plateDEDE = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate de-DE parameters', function() {

        for (const iv of invalidDEDE) {
            let failed = false;
            try {
                const result = lpe.checkLicPlateDEDE(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validFIFI = [
        'ABC-123',
        'ABC 123',
        'ABC123',
        'A100',
        'A 100',
        'A-100',
        'C10001',
        'C 10001',
        'C-10001',
        '123-ABC',
        '123 ABC',
        '123ABC',
        '123-A',
        '123 A',
        '123A',
        '199AA',
        '199 AA',
        '199-AA',
    ];
    const invalidFIFI = [
        ' ',
        'A-1',
        'A1A-100',
        '1-A-2',
        'C1234567',
        'A B C 1 2 3',
        'abc-123',
    ];

    it('should validate correct Car License Plate fi-FI accessors', function() {
        for (const v of validFIFI) {
            lpe.plateFIFI = v;
            assert.equal(v, lpe.plateFIFI);
        }
    });

    it('should validate correct Car License Plate fi-FI parameters', function() {
        for (const v of validFIFI) {
            const result = lpe.checkLicPlateFIFI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate fi-FI accessors', function() {

        for (const iv of invalidFIFI) {
            let failed = false;
            try {
                lpe.plateFIFI = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate fi-FI parameters', function() {

        for (const iv of invalidFIFI) {
            let failed = false;
            try {
                const result = lpe.checkLicPlateFIFI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validSQAL = [
        'AA 000 AA',
        'ZZ 999 ZZ',
    ];
    const invalidSQAL = [
        '',
        'AA 0 A',
        'AAA 00 AAA',
    ];

    it('should validate correct Car License Plate sq-AL accessors', function() {
        for (const v of validSQAL) {
            lpe.plateSQAL = v;
            assert.equal(v, lpe.plateSQAL);
        }
    });

    it('should validate correct Car License Plate sq-AL parameters', function() {
        for (const v of validSQAL) {
            const result = lpe.checkLicPlateSQAL(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate sq-AL accessors', function() {

        for (const iv of invalidSQAL) {
            let failed = false;
            try {
                lpe.plateSQAL = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate sq-AL parameters', function() {

        for (const iv of invalidSQAL) {
            let failed = false;
            try {
                const result = lpe.checkLicPlateSQAL(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validCSCZ = [
        'ALA4011',
        '4A23000',
        'DICTAT0R',
        'VETERAN',
        'AZKVIZ8',
        '2A45876',
        'DIC-TAT0R',
    ];
    const invalidCSCZ = [
        '',
        'invalidlicenseplate',
        'LN5758898',
        'X-|$|-X',
        'AE0F-OP4',
        'GO0MER',
        '2AAAAAAAA',
        'FS AB 1234 E',
        'GB999 9999 00',
    ];
    
    it('should validate correct Car License Plate cs-CZ accessors', function() {
        for (const v of validCSCZ) {
            lpe.plateCSCZ = v;
            assert.equal(v, lpe.plateCSCZ);
        }
    });

    it('should validate correct Car License Plate cs-CZ parameters', function() {
        for (const v of validCSCZ) {
            const result = lpe.checkLicPlateCSCZ(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate cs-CZ accessors', function() {

        for (const iv of invalidCSCZ) {
            let failed = false;
            try {
                lpe.plateCSCZ = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate cs-CZ parameters', function() {

        for (const iv of invalidCSCZ) {
            let failed = false;
            try {
                const result = lpe.checkLicPlateCSCZ(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validPTBR = [
      'ABC1234',
      'ABC 1234',
      'ABC-1234',
      'ABC1D23',
      'ABC1K23',
      'ABC1Z23',
      'ABC 1D23',
      'ABC-1D23',
    ];
    const invalidPTBR = [
      '',
      'AA 0 A',
      'AAA 00 AAA',
      'ABCD123',
      'AB12345',
      'AB123DC',
    ];

    it('should validate correct Car License Plate pt-BR accessors', function() {
        for (const v of validPTBR) {
            lpe.platePTBR = v;
            assert.equal(v, lpe.platePTBR);
        }
    });

    it('should validate correct Car License Plate pt-BR parameters', function() {
        for (const v of validPTBR) {
            const result = lpe.checkLicPlatePTBR(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate pt-BR accessors', function() {

        for (const iv of invalidPTBR) {
            let failed = false;
            try {
                lpe.platePTBR = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate pt-BR parameters', function() {

        for (const iv of invalidPTBR) {
            let failed = false;
            try {
                const result = lpe.checkLicPlatePTBR(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validANY = [
        'FL 1',
        'FS AB 123',
    ];
    const invalidANY = [
        '',
        'FL 999999',
        'FS AB 1234 A',
    ];

    it('should validate correct Car License Plate ANY accessors', function() {
        for (const v of validANY) {
            lpe.plate = v;
            assert.equal(v, lpe.plate);
        }
    });

    it('should validate correct Car License Plate ANY parameters', function() {
        for (const v of validANY) {
            const result = lpe.checkLicPlate(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Car License Plate ANY accessors', function() {

        for (const iv of invalidANY) {
            let failed = false;
            try {
                lpe.plate = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Car License Plate ANY parameters', function() {

        for (const iv of invalidANY) {
            let failed = false;
            try {
                const result = lpe.checkLicPlate(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});
