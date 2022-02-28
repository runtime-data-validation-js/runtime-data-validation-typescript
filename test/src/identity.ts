
import { assert } from 'chai';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, IsEthereumAddress,
    IsFQDN, IsHash, IsIBAN, IsIdentityCard,
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';


describe('Identity', function() {
    class IdentityExample {
        #identity: string;

        @ValidateAccessor<string>()
        @IsIdentityCard('LK')
        set identityLK(identity: string) { this.#identity = identity; }
        get identityLK() { return this.#identity; }

        @ValidateParams
        checkIdentityCardLK(
            @IsIdentityCard('LK') identity: string
        ) {
            return identity;
        }


        @ValidateAccessor<string>()
        @IsIdentityCard('PL')
        set identityPL(identity: string) { this.#identity = identity; }
        get identityPL() { return this.#identity; }

        @ValidateParams
        checkIdentityCardPL(
            @IsIdentityCard('PL') identity: string
        ) {
            return identity;
        }


        @ValidateAccessor<string>()
        @IsIdentityCard('ES')
        set identityES(identity: string) { this.#identity = identity; }
        get identityES() { return this.#identity; }

        @ValidateParams
        checkIdentityCardES(
            @IsIdentityCard('ES') identity: string
        ) {
            return identity;
        }


        @ValidateAccessor<string>()
        @IsIdentityCard('FI')
        set identityFI(identity: string) { this.#identity = identity; }
        get identityFI() { return this.#identity; }

        @ValidateParams
        checkIdentityCardFI(
            @IsIdentityCard('FI') identity: string
        ) {
            return identity;
        }



        @ValidateAccessor<string>()
        @IsIdentityCard('IN')
        set identityIN(identity: string) { this.#identity = identity; }
        get identityIN() { return this.#identity; }

        @ValidateParams
        checkIdentityCardIN(
            @IsIdentityCard('IN') identity: string
        ) {
            return identity;
        }




        @ValidateAccessor<string>()
        @IsIdentityCard('IR')
        set identityIR(identity: string) { this.#identity = identity; }
        get identityIR() { return this.#identity; }

        @ValidateParams
        checkIdentityCardIR(
            @IsIdentityCard('IR') identity: string
        ) {
            return identity;
        }




        @ValidateAccessor<string>()
        @IsIdentityCard('IT')
        set identityIT(identity: string) { this.#identity = identity; }
        get identityIT() { return this.#identity; }

        @ValidateParams
        checkIdentityCardIT(
            @IsIdentityCard('IT') identity: string
        ) {
            return identity;
        }



        @ValidateAccessor<string>()
        @IsIdentityCard('NO')
        set identityNO(identity: string) { this.#identity = identity; }
        get identityNO() { return this.#identity; }

        @ValidateParams
        checkIdentityCardNO(
            @IsIdentityCard('NO') identity: string
        ) {
            return identity;
        }




        @ValidateAccessor<string>()
        @IsIdentityCard('TH')
        set identityTH(identity: string) { this.#identity = identity; }
        get identityTH() { return this.#identity; }

        @ValidateParams
        checkIdentityCardTH(
            @IsIdentityCard('TH') identity: string
        ) {
            return identity;
        }



        @ValidateAccessor<string>()
        @IsIdentityCard('he-IL')
        set identityHEIL(identity: string) { this.#identity = identity; }
        get identityHEIL() { return this.#identity; }

        @ValidateParams
        checkIdentityCardHEIL(
            @IsIdentityCard('he-IL') identity: string
        ) {
            return identity;
        }



        @ValidateAccessor<string>()
        @IsIdentityCard('ar-LY')
        set identityARLY(identity: string) { this.#identity = identity; }
        get identityARLY() { return this.#identity; }

        @ValidateParams
        checkIdentityCardARLY(
            @IsIdentityCard('ar-LY') identity: string
        ) {
            return identity;
        }




        @ValidateAccessor<string>()
        @IsIdentityCard('ar-TN')
        set identityARTN(identity: string) { this.#identity = identity; }
        get identityARTN() { return this.#identity; }

        @ValidateParams
        checkIdentityCardARTN(
            @IsIdentityCard('ar-TN') identity: string
        ) {
            return identity;
        }



        @ValidateAccessor<string>()
        @IsIdentityCard('zh-CN')
        set identityZHCN(identity: string) { this.#identity = identity; }
        get identityZHCN() { return this.#identity; }

        @ValidateParams
        checkIdentityCardZHCN(
            @IsIdentityCard('zh-CN') identity: string
        ) {
            return identity;
        }


        @ValidateAccessor<string>()
        @IsIdentityCard('zh-TW')
        set identityZHTW(identity: string) { this.#identity = identity; }
        get identityZHTW() { return this.#identity; }

        @ValidateParams
        checkIdentityCardZHTW(
            @IsIdentityCard('zh-TW') identity: string
        ) {
            return identity;
        }

    }

    const ie = new IdentityExample();

    const validLK = [
        '722222222v',
        '722222222V',
        '993151225x',
        '993151225X',
        '188888388x',
        '935632124V',
        '199931512253',
        '200023125632',
    ];
    const invalidLK = [
        '023125648V',
        '023345621v',
        '021354211X',
        '055321231x',
        '02135465462',
        '199931512253X',
    ];

    it('should validate correct Identity Card LK accessors', function() {
        for (const v of validLK) {
            ie.identityLK = v;
            assert.equal(v, ie.identityLK);
        }
    });

    it('should validate correct Identity Card LK parameters', function() {
        for (const v of validLK) {
            const result = ie.checkIdentityCardLK(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card LK accessors', function() {

        for (const iv of invalidLK) {
            let failed = false;
            try {
                ie.identityLK = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card LK parameters', function() {

        for (const iv of invalidLK) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardLK(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validPL = [
        '99012229019',
        '09210215408',
        '20313034701',
        '86051575214',
        '77334586883',
        '54007481320',
        '06566860643',
        '77552478861',
    ];
    const invalidPL = [
        'aa',
        '5',
        '195',
        '',
        ' ',
        '12345678901',
        '99212229019',
        '09210215402',
        '20313534701',
        '86241579214',
    ];

    it('should validate correct Identity Card PL accessors', function() {
        for (const v of validPL) {
            ie.identityPL = v;
            assert.equal(v, ie.identityPL);
        }
    });

    it('should validate correct Identity Card PL parameters', function() {
        for (const v of validPL) {
            const result = ie.checkIdentityCardPL(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card PL accessors', function() {

        for (const iv of invalidPL) {
            let failed = false;
            try {
                ie.identityPL = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card PL parameters', function() {

        for (const iv of invalidPL) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardPL(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validES = [
        '99999999R',
        '12345678Z',
        '01234567L',
        '01234567l',
        'X1234567l',
        'x1234567l',
        'X1234567L',
        'Y1234567X',
        'Z1234567R',
    ];
    const invalidES = [
        '123456789',
        '12345678A',
        '12345 678Z',
        '12345678-Z',
        '1234*6789',
        '1234*678Z',
        '12345678!',
        '1234567L',
        'A1234567L',
        'X1234567A',
        'Y1234567B',
        'Z1234567C',
    ];

    it('should validate correct Identity Card ES accessors', function() {
        for (const v of validES) {
            ie.identityES = v;
            assert.equal(v, ie.identityES);
        }
    });

    it('should validate correct Identity Card ES parameters', function() {
        for (const v of validES) {
            const result = ie.checkIdentityCardES(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card ES accessors', function() {

        for (const iv of invalidES) {
            let failed = false;
            try {
                ie.identityES = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card ES parameters', function() {

        for (const iv of invalidES) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardES(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validFI = [
        '131052-308T', // People born in 1900s
        '131052A308T', // People born in 2000s
        '131052+308T', // People born in 1800s
        '131052-313Y',
    ];
    const invalidFI = [
        '131052308T',
        '131052-308T ',
        '131052-308A',
    ];

    it('should validate correct Identity Card FI accessors', function() {
        for (const v of validFI) {
            ie.identityFI = v;
            assert.equal(v, ie.identityFI);
        }
    });

    it('should validate correct Identity Card FI parameters', function() {
        for (const v of validFI) {
            const result = ie.checkIdentityCardFI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card FI accessors', function() {

        for (const iv of invalidFI) {
            let failed = false;
            try {
                ie.identityFI = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card FI parameters', function() {

        for (const iv of invalidFI) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardFI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validIN = [
        '298448863364',
        '2984 4886 3364',
    ];
    const invalidIN = [
        '99999999R',
        '12345678Z',
        '01234567L',
        '01234567l',
        'X1234567l',
        'x1234567l',
        'X1234567L',
    ];

    it('should validate correct Identity Card IN accessors', function() {
        for (const v of validIN) {
            ie.identityIN = v;
            assert.equal(v, ie.identityIN);
        }
    });

    it('should validate correct Identity Card IN parameters', function() {
        for (const v of validIN) {
            const result = ie.checkIdentityCardIN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card IN accessors', function() {

        for (const iv of invalidIN) {
            let failed = false;
            try {
                ie.identityIN = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card IN parameters', function() {

        for (const iv of invalidIN) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardIN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validIR = [
        '0499370899',
        '0790419904',
        '0084575948',
        '0963695398',
        '0684159414',
        '0067749828',
        '0650451252',
        '1583250689',
        '4032152314',
        '0076229645',
        '4271467685',
        '0200203241',
    ];
    const invalidIR = [
        '1260293040',
        '0000000001',
        '1999999999',
        '9999999991',
        'AAAAAAAAAA',
        '0684159415',
    ];

    it('should validate correct Identity Card IR accessors', function() {
        for (const v of validIR) {
            ie.identityIR = v;
            assert.equal(v, ie.identityIR);
        }
    });

    it('should validate correct Identity Card IR parameters', function() {
        for (const v of validIR) {
            const result = ie.checkIdentityCardIR(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card IR accessors', function() {

        for (const iv of invalidIR) {
            let failed = false;
            try {
                ie.identityIR = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card IR parameters', function() {

        for (const iv of invalidIR) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardIR(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validIT = [
        'CR43675TM',
        'CA79382RA',
    ];
    const invalidIT = [
        'CA00000AA',
        'CB2342TG',
        'CS123456A',
        'C1236EC',
    ];

    it('should validate correct Identity Card IT accessors', function() {
        for (const v of validIT) {
            ie.identityIT = v;
            assert.equal(v, ie.identityIT);
        }
    });

    it('should validate correct Identity Card IT parameters', function() {
        for (const v of validIT) {
            const result = ie.checkIdentityCardIT(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card IT accessors', function() {

        for (const iv of invalidIT) {
            let failed = false;
            try {
                ie.identityIT = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card IT parameters', function() {

        for (const iv of invalidIT) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardIT(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validNO = [
        '09053426694',
        '26028338723',
        '08031470790',
        '12051539514',
        '02077448074',
        '14035638319',
        '13031379673',
        '29126214926',
    ];
    const invalidNO = [
        '09053426699',
        '00000000000',
        '26028338724',
        '92031470790',
    ];

    it('should validate correct Identity Card NO accessors', function() {
        for (const v of validNO) {
            ie.identityNO = v;
            assert.equal(v, ie.identityNO);
        }
    });

    it('should validate correct Identity Card NO parameters', function() {
        for (const v of validNO) {
            const result = ie.checkIdentityCardNO(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card NO accessors', function() {

        for (const iv of invalidNO) {
            let failed = false;
            try {
                ie.identityNO = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card NO parameters', function() {

        for (const iv of invalidNO) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardNO(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validTH = [
        '1101230000001',
        '1101230000060',
    ];
    const invalidTH = [
        'abc',
        '1101230',
        '11012300000011',
        'aaaaaaaaaaaaa',
        '110123abcd001',
        '1101230000007',
        '0101123450000',
        '0101123450004',
        '9101123450008',
    ];

    it('should validate correct Identity Card TH accessors', function() {
        for (const v of validTH) {
            ie.identityTH = v;
            assert.equal(v, ie.identityTH);
        }
    });

    it('should validate correct Identity Card TH parameters', function() {
        for (const v of validTH) {
            const result = ie.checkIdentityCardTH(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card TH accessors', function() {

        for (const iv of invalidTH) {
            let failed = false;
            try {
                ie.identityTH = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card TH parameters', function() {

        for (const iv of invalidTH) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardTH(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validHEIL = [
        '219472156',
        '219486610',
        '219488962',
        '219566726',
        '219640216',
        '219645041',
        '334795465',
        '335211686',
        '335240479',
        '335472171',
        '336999842',
        '337090443',
    ];
    const invalidHEIL = [
        '123456789',
        '12345678A',
        '12345 678Z',
        '12345678-Z',
        '1234*6789',
        '1234*678Z',
        '12345678!',
        '1234567L',
        'A1234567L',
        'X1234567A',
        'Y1234567B',
        'Z1234567C',
        '219772156',
        '219487710',
        '334705465',
        '336000842',
    ];

    it('should validate correct Identity Card he-IL accessors', function() {
        for (const v of validHEIL) {
            ie.identityHEIL = v;
            assert.equal(v, ie.identityHEIL);
        }
    });

    it('should validate correct Identity Card he-IL parameters', function() {
        for (const v of validHEIL) {
            const result = ie.checkIdentityCardHEIL(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card he-IL accessors', function() {

        for (const iv of invalidHEIL) {
            let failed = false;
            try {
                ie.identityHEIL = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card he-IL parameters', function() {

        for (const iv of invalidHEIL) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardHEIL(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validARLY = [
        '119803455876',
        '120024679875',
        '219624876201',
        '220103480657',
    ];
    const invalidARLY = [
        '987654320123',
        '123-456-7890',
        '012345678912',
        '1234567890',
        'AFJBHUYTREWR',
        'C4V6B1X0M5T6',
        '9876543210123',
    ];

    it('should validate correct Identity Card ar-LY accessors', function() {
        for (const v of validARLY) {
            ie.identityARLY = v;
            assert.equal(v, ie.identityARLY);
        }
    });

    it('should validate correct Identity Card ar-LY parameters', function() {
        for (const v of validARLY) {
            const result = ie.checkIdentityCardARLY(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card ar-LY accessors', function() {

        for (const iv of invalidARLY) {
            let failed = false;
            try {
                ie.identityARLY = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card ar-LY parameters', function() {

        for (const iv of invalidARLY) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardARLY(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validARTN = [
        '09958092',
        '09151092',
        '65126506',
        '79378815',
        '58994407',
        '73089789',
        '73260311',
    ];
    const invalidARTN = [
        '123456789546',
        '123456789',
        '023456789',
        '12345678A',
        '12345',
        '1234578A',
        '123 578A',
        '12345 678Z',
        '12345678-Z',
        '1234*6789',
        '1234*678Z',
        'GE9800as98',
        'X231071922',
        '1234*678Z',
        '12345678!',
    ];

    it('should validate correct Identity Card ar-TN accessors', function() {
        for (const v of validARTN) {
            ie.identityARTN = v;
            assert.equal(v, ie.identityARTN);
        }
    });

    it('should validate correct Identity Card ar-TN parameters', function() {
        for (const v of validARTN) {
            const result = ie.checkIdentityCardARTN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card ar-TN accessors', function() {

        for (const iv of invalidARTN) {
            let failed = false;
            try {
                ie.identityARTN = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card ar-TN parameters', function() {

        for (const iv of invalidARTN) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardARTN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validZHCN = [
        '235407195106112745',
        '210203197503102721',
        '520323197806058856',
        '110101491001001',
    ];
    const invalidZHCN = [
        '160323197806058856',
        '010203197503102721',
        '520323297806058856',
        '520323197802318856',
        '235407195106112742',
        '010101491001001',
        '110101491041001',
        '160101491001001',
        '110101940231001',
        'xx1234567',
        '135407195106112742',
        '123456789546',
        '123456789',
        '023456789',
        '12345678A',
        '12345',
        '1234578A',
        '123 578A',
        '12345 678Z',
        '12345678-Z',
        '1234*6789',
        '1234*678Z',
        'GE9800as98',
        'X231071922',
        '1234*678Z',
        '12345678!',
        '235407207006112742',
    ];

    it('should validate correct Identity Card zh-CN accessors', function() {
        for (const v of validZHCN) {
            ie.identityZHCN = v;
            assert.equal(v, ie.identityZHCN);
        }
    });

    it('should validate correct Identity Card zh-CN parameters', function() {
        for (const v of validZHCN) {
            const result = ie.checkIdentityCardZHCN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card zh-CN accessors', function() {

        for (const iv of invalidZHCN) {
            let failed = false;
            try {
                ie.identityZHCN = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card zh-CN parameters', function() {

        for (const iv of invalidZHCN) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardZHCN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validZHTW = [
        'B176944193',
        'K101189797',
        'F112866121',
        'A219758834',
        'A244144802',
        'A146047171',
        'Q170219004',
        'Z277018381',
        'X231071923',
    ];
    const invalidZHTW = [
        '123456789',
        'A185034995',
        'X431071923',
        'GE9800as98',
        'X231071922',
        '1234*678Z',
        '12345678!',
        '1234567L',
        'A1234567L',
        'X1234567A',
        'Y1234567B',
        'Z1234567C',
        '219772156',
        '219487710',
        '334705465',
        '336000842',
    ];

    it('should validate correct Identity Card zh-TW accessors', function() {
        for (const v of validZHTW) {
            ie.identityZHTW = v;
            assert.equal(v, ie.identityZHTW);
        }
    });

    it('should validate correct Identity Card zh-TW parameters', function() {
        for (const v of validZHTW) {
            const result = ie.checkIdentityCardZHTW(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Identity Card zh-TW accessors', function() {

        for (const iv of invalidZHTW) {
            let failed = false;
            try {
                ie.identityZHTW = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Identity Card zh-TW parameters', function() {

        for (const iv of invalidZHTW) {
            let failed = false;
            try {
                const result = ie.checkIdentityCardZHTW(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
});
