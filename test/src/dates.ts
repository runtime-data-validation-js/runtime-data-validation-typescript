
import { assert } from 'chai';
import {
    IsDate, conversions, IsISO8601, IsISO8601Duration,
    ValidateParams, ValidateAccessor
} from 'runtime-data-validation';

const ToDate = conversions.ToDate;

describe('Dates', function(){

    class DatesExample {

        #date: Date;

        @ValidateAccessor<Date | string>()
        @IsDate()
        set date(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get date() { return this.#date; }

        @ValidateAccessor<Date | string>()
        @IsDate({ strictMode: true })
        set dateStrict(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateStrict() { return this.#date; }

        @ValidateAccessor<Date | string>()
        @IsDate({ delimiters: ['/', ' '] })
        set dateDelimiters(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateDelimiters() { return this.#date; }        

        @ValidateAccessor<Date | string>()
        @IsDate({
            format: 'MM.DD.YYYY',
            delimiters: ['.'],
            strictMode: true
        })
        set dateFull(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateFull() { return this.#date; }        

        #dateDDMMYYYY: Date;


        @ValidateAccessor<Date | string>()
        @IsDate({ format: 'DD/MM/YYYY' })
        set dateDDMMYYYY(nd: Date | string) {
            this.#dateDDMMYYYY = ToDate(nd);
        }
        get dateDDMMYYYY() { return this.#dateDDMMYYYY; }

        @ValidateAccessor<Date | string>()
        @IsDate({
            format: 'DD/MM/YYYY',
            strictMode: true
        })
        set dateDDMMYYYYstrict(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateDDMMYYYYstrict() { return this.#date; }

        @ValidateAccessor<Date | string>()
        @IsDate({ format: 'DD/MM/YY' })
        set dateDDMMYY(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateDDMMYY() { return this.#date; }

        @ValidateAccessor<Date | string>()
        @IsDate({ format: 'D/M/YY' })
        set dateDMYY(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateDMYY() { return this.#date; }

        

        @ValidateParams
        checkDate(
            @IsDate()
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateStrict(
            @IsDate({ strictMode: true })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateDelimiters(
            @IsDate({ delimiters: ['/', ' '] })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateFull(
            @IsDate({
                format: 'MM.DD.YYYY',
                delimiters: ['.'],
                strictMode: true
            })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateDDMMYYYY(
            @IsDate({ format: 'DD/MM/YYYY' })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateDDMMYYYYstrict(
            @IsDate({
                format: 'DD/MM/YYYY',
                strictMode: true
            })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateDDMMYY(
            @IsDate({ format: 'DD/MM/YY' })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

        @ValidateParams
        checkDateDMYY(
            @IsDate({ format: 'D/M/YY' })
            nd: Date | string
        ) {
            return ToDate(nd);
        }

    }

    const de = new DatesExample();

    const valid = [
        new Date(),
        // new Date([2014, 2, 15]),
        new Date('2014-03-15'),
        '2020/02/29',
    ];
    const invalid = [
        '',
        '15072002',
        null,
        undefined,
        // { year: 2002, month: 7, day: 15 },
        // 42,
        // { toString() { return '[object Date]'; } }, // faking
        '2020-02-30', // invalid date
        '2019-02-29', // non-leap year
        '2020-04-31', // invalid date
        '2020/03-15', // mixed delimiter
    ];

    it('Should check valid date accessors', function() {

        let count = 0;
        for (const v of valid) {
            de.date = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, valid.length);
    });

    it('Should check valid date parameters', function() {

        let count = 0;
        for (const v of valid) {
            const result = de.checkDate(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, valid.length);
    });

    it('Should reject invalid date accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                it('Should check valid date accessors', function() {
            
                    let count = 0;
                    for (const v of valid) {
                        de.date = v;
                        count++;
                        // Cannot do this since the date string is converted
                        // assert.equal(v, de.date);
                    }
                    assert.equal(count, valid.length);
                });
            
                it('Should check valid date parameters', function() {
            
                    let count = 0;
                    for (const v of valid) {
                        const result = de.checkDate(v);
                        count++;
                        // Cannot do this since the date string is converted
                        // assert.equal(v, result);
                    }
                    assert.equal(count, valid.length);
                });
            
                it('Should reject invalid date accessors', function() {
            
                    for (const iv of invalid) {
                        let failed = false;
                        try {
                            de.date = iv;
                        } catch (e) { failed = true; }
                        assert.equal(failed, true);
                    }
                });
            
                it('Should reject invalid date parameters', function() {
            
                    for (const iv of invalid) {
                        let failed = false;
                        try {
                            const result = de.checkDate(iv);
                        } catch (e) { failed = true; }
                        assert.equal(failed, true);
                    }
                });
            
                de.date = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = de.checkDate(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDDMMYYYY = [
        '15-07-2002',
        '15/07/2002',
    ];
    const invalidDDMMYYYY = [
        '15/7/2002',
        '15-7-2002',
        '15/7/02',
        '15-7-02',
        '15-07/2002',
    ];

    it('Should check valid date DD/MM/YYYY accessors', function() {

        let count = 0;
        for (const v of validDDMMYYYY) {
            de.dateDDMMYYYY = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validDDMMYYYY.length);
    });

    it('Should check valid date DD/MM/YYYY parameters', function() {

        let count = 0;
        for (const v of validDDMMYYYY) {
            const result = de.checkDateDDMMYYYY(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validDDMMYYYY.length);
    });

    it('Should reject invalid date DD/MM/YYYY accessors', function() {

        for (const iv of invalidDDMMYYYY) {
            let failed = false;
            try {
                de.dateDDMMYYYY = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date DD/MM/YYYY parameters', function() {

        for (const iv of invalidDDMMYYYY) {
            let failed = false;
            try {
                const result = de.checkDateDDMMYYYY(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDDMMYY = [
        '15-07-02',
        '15/07/02',
    ];
    const invalidDDMMYY = [
        '15/7/2002',
        '15-7-2002',
        '15/07-02',
    ];

    it('Should check valid date DD/MM/YY accessors', function() {

        let count = 0;
        for (const v of validDDMMYY) {
            de.dateDDMMYY = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validDDMMYY.length);
    });

    it('Should check valid date DD/MM/YY parameters', function() {

        let count = 0;
        for (const v of validDDMMYY) {
            const result = de.checkDateDDMMYY(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validDDMMYY.length);
    });

    it('Should reject invalid date DD/MM/YY accessors', function() {

        for (const iv of invalidDDMMYY) {
            let failed = false;
            try {
                de.dateDDMMYY = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date DD/MM/YY parameters', function() {

        for (const iv of invalidDDMMYY) {
            let failed = false;
            try {
                const result = de.checkDateDDMMYY(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDMYY = [
          '5-7-02',
          '5/7/02',
    ];
    const invalidDMYY = [
          '5/07/02',
          '15/7/02',
          '15-7-02',
          '5/7-02',
    ];

    it('Should check valid date D/M/YY accessors', function() {

        let count = 0;
        for (const v of validDMYY) {
            de.dateDMYY = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validDMYY.length);
    });

    it('Should check valid date D/M/YY parameters', function() {

        let count = 0;
        for (const v of validDMYY) {
            const result = de.checkDateDMYY(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validDMYY.length);
    });

    it('Should reject invalid date D/M/YY accessors', function() {

        for (const iv of invalidDMYY) {
            let failed = false;
            try {
                de.dateDMYY = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date D/M/YY parameters', function() {

        for (const iv of invalidDMYY) {
            let failed = false;
            try {
                const result = de.checkDateDMYY(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDDMMYYYYstrict = [
        '15/07/2002',
    ];
    const invalidDDMMYYYYstrict = [
        '15-07-2002',
        '15/7/2002',
        '15-7-2002',
        '15/7/02',
        '15-7-02',
        '15-07/2002',
    ];

    it('Should check valid date DD/MM/YYYY strict accessors', function() {

        let count = 0;
        for (const v of validDDMMYYYYstrict) {
            de.dateDDMMYYYYstrict = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validDDMMYYYYstrict.length);
    });

    it('Should check valid date DD/MM/YYYY strict parameters', function() {

        let count = 0;
        for (const v of validDDMMYYYYstrict) {
            const result = de.checkDateDDMMYYYYstrict(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validDDMMYYYYstrict.length);
    });

    it('Should reject invalid date DD/MM/YYYY strict accessors', function() {

        for (const iv of invalidDDMMYYYYstrict) {
            let failed = false;
            try {
                de.dateDDMMYYYYstrict = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date DD/MM/YYYY strict parameters', function() {

        for (const iv of invalidDDMMYYYYstrict) {
            let failed = false;
            try {
                const result = de.checkDateDDMMYYYYstrict(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validStrict = [
        '2020/01/15',
        '2014/02/15',
        '2014/03/15',
        '2020/02/29',
    ];
    const invalidStrict = [
        '2014-02-15',
        '2020-02-29',
        '15-07/2002',
        new Date(),
        // new Date([2014, 2, 15]),
        new Date('2014-03-15'),
    ];

    it('Should check valid date strict accessors', function() {

        let count = 0;
        for (const v of validStrict) {
            de.dateStrict = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validStrict.length);
    });

    it('Should check valid date strict parameters', function() {

        let count = 0;
        for (const v of validStrict) {
            const result = de.checkDateStrict(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validStrict.length);
    });

    it('Should reject invalid date strict accessors', function() {

        for (const iv of invalidStrict) {
            let failed = false;
            try {
                de.dateStrict = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date strict parameters', function() {

        for (const iv of invalidStrict) {
            let failed = false;
            try {
                const result = de.checkDateStrict(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDelimiters = [
        new Date(),
        // new Date([2014, 2, 15]),
        new Date('2014-03-15'),
        '2020/02/29',
        '2020 02 29',
    ];
    const invalidDelimiters = [
        '2020-02-29',
        '',
        '15072002',
        null,
        undefined,
        // { year: 2002, month: 7, day: 15 },
        // 42,
        // { toString() { return '[object Date]'; } },
        '2020/02/30',
        '2019/02/29',
        '2020/04/31',
        '2020/03-15',
    ];

    it('Should check valid date Delimiters accessors', function() {

        let count = 0;
        for (const v of validDelimiters) {
            de.dateDelimiters = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validDelimiters.length);
    });

    it('Should check valid date Delimiters parameters', function() {

        let count = 0;
        for (const v of validDelimiters) {
            const result = de.checkDateDelimiters(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validDelimiters.length);
    });

    it('Should reject invalid date Delimiters accessors', function() {

        for (const iv of invalidDelimiters) {
            let failed = false;
            try {
                de.dateDelimiters = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date delimiters parameters', function() {

        for (const iv of invalidDelimiters) {
            let failed = false;
            try {
                const result = de.checkDateDelimiters(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validFull = [
          '01.15.2020',
          '02.15.2014',
          '03.15.2014',
          '02.29.2020',
    ];
    const invalidFull = [
          '2014-02-15',
          '2020-02-29',
          '15-07/2002',
          new Date(),
          // new Date([2014, 2, 15]),
          new Date('2014-03-15'),
          '29.02.2020',
    ];
              

    it('Should check valid date full accessors', function() {

        let count = 0;
        for (const v of validFull) {
            de.dateFull = v;
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, de.date);
        }
        assert.equal(count, validFull.length);
    });

    it('Should check valid date full parameters', function() {

        let count = 0;
        for (const v of validFull) {
            const result = de.checkDateFull(v);
            count++;
            // Cannot do this since the date string is converted
            // assert.equal(v, result);
        }
        assert.equal(count, validFull.length);
    });

    it('Should reject invalid date full accessors', function() {

        for (const iv of invalidFull) {
            let failed = false;
            try {
                de.dateFull = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid date full parameters', function() {

        for (const iv of invalidFull) {
            let failed = false;
            try {
                const result = de.checkDateFull(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('ISO8601 Duration', function() {

    class ISO8601DurationExample {

        #iso8601: string;

        @ValidateAccessor<string>()
        @IsISO8601Duration()
        set iso8601(ni: string) { this.#iso8601 = ni; }
        get iso8601() { return this.#iso8601; }

        @ValidateParams
        checkISO8601Duration(
            @IsISO8601Duration() ndur: string
        ) {
            return ndur;
        }

    }

    const validDurations = [ 'PT10S', 'P3Y6M4DT12H30M5S'   ];

    const invalidDurations = [
        'invalid'
    ];

    const isoe = new ISO8601DurationExample();

    it('should validate correct ISO8601 durations accessors', function() {
        for (const v of validDurations) {
            isoe.iso8601 = v;
            assert.equal(v, isoe.iso8601);
        }
    });

    it('should validate correct ISO8601 durations parameters', function() {
        for (const v of validDurations) {
            const result = isoe.checkISO8601Duration(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISO8601 durations accessors', function() {

        for (const iv of invalidDurations) {
            let failed = false;
            try {
                isoe.iso8601 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISO8601 durations parameters', function() {

        for (const iv of invalidDurations) {
            let failed = false;
            try {
                const result = isoe.checkISO8601Duration(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('ISO8601 Dates', function() {

    class ISO8601Example {
        #iso8601: string;
        #iso8601strict: string;
        #iso8601sep: string;

        @ValidateAccessor<string>()
        @IsISO8601()
        set iso8601(ni: string) { this.#iso8601 = ni; }
        get iso8601() { return this.#iso8601; }

        @ValidateAccessor<string>()
        @IsISO8601({ strict: true })
        set iso8601strict(ni: string) { this.#iso8601strict = ni; }
        get iso8601strict() { return this.#iso8601strict; }

        @ValidateAccessor<string>()
        @IsISO8601({ strictSeparator: true })
        set iso8601sep(ni: string) { this.#iso8601sep = ni; }
        get iso8601sep() { return this.#iso8601sep; }

        @ValidateParams
        checkISO8601(
            @IsISO8601() ni: string
        ) {
            return ni;
        }

        @ValidateParams
        checkISO8601strict(
            @IsISO8601({ strict: true }) ni: string
        ) {
            return ni;
        }

        @ValidateParams
        checkISO8601sep(
            @IsISO8601({ strictSeparator: true }) ni: string
        ) {
            return ni;
        }




    }

    const isoe = new ISO8601Example();

    const validISO8601 = [
        '2009-12T12:34',
        '2009',
        '2009-05-19',
        '2009-05-19',
        '20090519',
        '2009123',
        '2009-05',
        '2009-123',
        '2009-222',
        '2009-001',
        '2009-W01-1',
        '2009-W51-1',
        '2009-W511',
        '2009-W33',
        '2009W511',
        '2009-05-19',
        '2009-05-19 00:00',
        '2009-05-19 14',
        '2009-05-19 14:31',
        '2009-05-19 14:39:22',
        '2009-05-19T14:39Z',
        '2009-W21-2',
        '2009-W21-2T01:22',
        '2009-139',
        '2009-05-19 14:39:22-06:00',
        '2009-05-19 14:39:22+0600',
        '2009-05-19 14:39:22-01',
        '20090621T0545Z',
        '2007-04-06T00:00',
        '2007-04-05T24:00',
        '2010-02-18T16:23:48.5',
        '2010-02-18T16:23:48,444',
        '2010-02-18T16:23:48,3-06:00',
        '2010-02-18T16:23.4',
        '2010-02-18T16:23,25',
        '2010-02-18T16:23.33+0600',
        '2010-02-18T16.23334444',
        '2010-02-18T16,2283',
        '2009-05-19 143922.500',
        '2009-05-19 1439,55',
        '2009-10-10',
        '2020-366',
        '2000-366',
    ];
    const invalidISO8601 = [
        '200905',
        '2009367',
        '2009-',
        '2007-04-05T24:50',
        '2009-000',
        '2009-M511',
        '2009M511',
        '2009-05-19T14a39r',
        '2009-05-19T14:3924',
        '2009-0519',
        '2009-05-1914:39',
        '2009-05-19 14:',
        '2009-05-19r14:39',
        '2009-05-19 14a39a22',
        '200912-01',
        '2009-05-19 14:39:22+06a00',
        '2009-05-19 146922.500',
        '2010-02-18T16.5:23.35:48',
        '2010-02-18T16:23.35:48',
        '2010-02-18T16:23.35:48.45',
        '2009-05-19 14.5.44',
        '2010-02-18T16:23.33.600',
        '2010-02-18T16,25:23:48,444',
        '2010-13-1',
        'nonsense2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Znonsense',
    ];
    
    it('should validate correct ISO8601 dates accessors', function() {
        for (const v of validISO8601) {
            isoe.iso8601 = v;
            assert.equal(v, isoe.iso8601);
        }
    });

    it('should validate correct ISO8601 dates parameters', function() {
        for (const v of validISO8601) {
            const result = isoe.checkISO8601(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISO8601 dates accessors', function() {

        for (const iv of invalidISO8601) {
            let failed = false;
            try {
                isoe.iso8601 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISO8601 dates parameters', function() {

        for (const iv of invalidISO8601) {
            let failed = false;
            try {
                const result = isoe.checkISO8601(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validISO8601strict = validISO8601.concat([
        '2000-02-29',
        '2009-123',
        '2009-222',
        '2020-366',
        '2400-366',
    ]);
    const invalidISO8601strict = invalidISO8601.concat([
        '2010-02-30',
        '2009-02-29',
        '2009-366',
        '2019-02-31',
    ]);

    it('should validate correct ISO8601 strict dates accessors', function() {
        for (const v of validISO8601strict) {
            isoe.iso8601strict = v;
            assert.equal(v, isoe.iso8601strict);
        }
    });

    it('should validate correct ISO8601 strict dates parameters', function() {
        for (const v of validISO8601strict) {
            const result = isoe.checkISO8601strict(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISO8601 strict dates accessors', function() {

        for (const iv of invalidISO8601strict) {
            let failed = false;
            try {
                isoe.iso8601strict = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISO8601 strict dates parameters', function() {

        for (const iv of invalidISO8601strict) {
            let failed = false;
            try {
                const result = isoe.checkISO8601strict(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validISO8601sep = [
        '2009-12T12:34',
        '2009',
        '2009-05-19',
        '2009-05-19',
        '20090519',
        '2009123',
        '2009-05',
        '2009-123',
        '2009-222',
        '2009-001',
        '2009-W01-1',
        '2009-W51-1',
        '2009-W511',
        '2009-W33',
        '2009W511',
        '2009-05-19',
        '2009-05-19T14:39Z',
        '2009-W21-2',
        '2009-W21-2T01:22',
        '2009-139',
        '20090621T0545Z',
        '2007-04-06T00:00',
        '2007-04-05T24:00',
        '2010-02-18T16:23:48.5',
        '2010-02-18T16:23:48,444',
        '2010-02-18T16:23:48,3-06:00',
        '2010-02-18T16:23.4',
        '2010-02-18T16:23,25',
        '2010-02-18T16:23.33+0600',
        '2010-02-18T16.23334444',
        '2010-02-18T16,2283',
        '2009-10-10',
        '2020-366',
        '2000-366',
    ];
    const invalidISO8601sep = [
        '200905',
        '2009367',
        '2009-',
        '2007-04-05T24:50',
        '2009-000',
        '2009-M511',
        '2009M511',
        '2009-05-19T14a39r',
        '2009-05-19T14:3924',
        '2009-0519',
        '2009-05-1914:39',
        '2009-05-19 14:',
        '2009-05-19r14:39',
        '2009-05-19 14a39a22',
        '200912-01',
        '2009-05-19 14:39:22+06a00',
        '2009-05-19 146922.500',
        '2010-02-18T16.5:23.35:48',
        '2010-02-18T16:23.35:48',
        '2010-02-18T16:23.35:48.45',
        '2009-05-19 14.5.44',
        '2010-02-18T16:23.33.600',
        '2010-02-18T16,25:23:48,444',
        '2010-13-1',
        '2009-05-19 00:00',
        // Previously valid cases
        '2009-05-19 14',
        '2009-05-19 14:31',
        '2009-05-19 14:39:22',
        '2009-05-19 14:39:22-06:00',
        '2009-05-19 14:39:22+0600',
        '2009-05-19 14:39:22-01',
    ];

    it('should validate correct ISO8601 strict separator dates accessors', function() {
        for (const v of validISO8601sep) {
            isoe.iso8601sep = v;
            assert.equal(v, isoe.iso8601sep);
        }
    });

    it('should validate correct ISO8601 strict separator dates parameters', function() {
        for (const v of validISO8601sep) {
            const result = isoe.checkISO8601sep(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISO8601 strict separator dates accessors', function() {

        for (const iv of invalidISO8601sep) {
            let failed = false;
            try {
                isoe.iso8601sep = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISO8601 strict separator dates parameters', function() {

        for (const iv of invalidISO8601sep) {
            let failed = false;
            try {
                const result = isoe.checkISO8601sep(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});
