
import { assert } from 'chai';
import {
    IsDate, ToDate,
    ValidateParams, ValidateAccessor
} from 'runtime-data-validation';

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

        @ValidateAccessor<Date | string>()
        @IsDate({ format: 'DD/MM/YYYY' })
        set dateDDMMYYYY(nd: Date | string) {
            this.#date = ToDate(nd);
        }
        get dateDDMMYYYY() { return this.#date; }

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
        new Date([2014, 2, 15]),
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
        new Date([2014, 2, 15]),
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
        new Date([2014, 2, 15]),
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
          new Date([2014, 2, 15]),
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
