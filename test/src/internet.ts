
import { assert } from 'chai';
import { stringify } from 'querystring';
import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    Contains, Equals, IsAlpha, IsAlphanumeric,
    IsAscii, IsBase32, IsBase58, IsBase64,
    IsBtcAddress, IsCreditCard, IsDataURI,
    IsEAN, IsEmail, 
    IsFQDN, IsHash, IsMD5, IsIP, IsIPRange,
    IsISO31661Alpha2, IsISO31661Alpha3,
    ValidateParams, ValidateAccessor, IsISRC,
    IsJWT, IsMACAddress, IsMagnetURI
} from 'runtime-data-validation';

function repeat(str, count) {
    let result = '';
    for (; count; count--) {
      result += str;
    }
    return result;
}

describe('E-Mail', function() {

    class EMAILExample {

        #email: string;

        @ValidateAccessor<string>()
        @IsEmail()
        set email(email: string) { this.#email = email; }
        get email() { return this.#email; }

        @ValidateAccessor<string>()
        @IsEmail({ allow_utf8_local_part: false })
        set emailUTF8(email: string) { this.#email = email; }
        get emailUTF8() { return this.#email; }

        @ValidateAccessor<string>()
        @IsEmail({ allow_display_name: true })
        set emailDN(email: string) { this.#email = email; }
        get emailDN() { return this.#email; }

        @ValidateAccessor<string>()
        @IsEmail({ require_display_name: true })
        set emailDNReq(email: string) { this.#email = email; }
        get emailDNReq() { return this.#email; }

        @ValidateParams
        checkEmail(
            @IsEmail()
            email: string
        ) {
            return email;
        }

        @ValidateParams
        checkEmailUTF8(
            @IsEmail({ allow_utf8_local_part: false })
            email: string
        ) {
            return email;
        }

        @ValidateParams
        checkEmailDN(
            @IsEmail({ allow_display_name: true })
            email: string
        ) {
            return email;
        }

        @ValidateParams
        checkEmailDNReq(
            @IsEmail({ require_display_name: true })
            email: string
        ) {
            return email;
        }

    }

    const ee = new EMAILExample();

    const valid = [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
        '"foobar"@example.com',
        '"  foo  m端ller "@example.com',
        '"foo\\@bar"@example.com',
        `${repeat('a', 64)}@${repeat('a', 63)}.com`,
        `${repeat('a', 64)}@${repeat('a', 63)}.com`,
        `${repeat('a', 31)}@gmail.com`,
        'test@gmail.com',
        'test.1@gmail.com',
        'test@1337.com',
    ];
    const invalid = [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'somename@ｇｍａｉｌ.com',
        'foo@bar.co.uk.',
        'z@co.c',
        'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
        `${repeat('a', 64)}@${repeat('a', 251)}.com`,
        `${repeat('a', 65)}@${repeat('a', 250)}.com`,
        `${repeat('a', 64)}@${repeat('a', 64)}.com`,
        `${repeat('a', 64)}@${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 58)}.com`,
        'test1@invalid.co m',
        'test2@invalid.co m',
        'test3@invalid.co m',
        'test4@invalid.co m',
        'test5@invalid.co m',
        'test6@invalid.co m',
        'test7@invalid.co m',
        'test8@invalid.co m',
        'test9@invalid.co m',
        'test10@invalid.co m',
        'test11@invalid.co m',
        'test12@invalid.co　m',
        'test13@invalid.co　m',
        'multiple..dots@stillinvalid.com',
        'test123+invalid! sub_address@gmail.com',
        'gmail...ignores...dots...@gmail.com',
        'ends.with.dot.@gmail.com',
        'multiple..dots@gmail.com',
        'wrong()[]",:;<>@@gmail.com',
        '"wrong()[]",:;<>@@gmail.com',
        'username@domain.com�',
        'username@domain.com©',
    ];

    it('should validate correct E-Mail accessors', function() {
        for (const v of valid) {
            ee.email = v;
            assert.equal(v, ee.email);
        }
    });

    it('should validate correct E-Mail parameters', function() {
        for (const v of valid) {
            const result = ee.checkEmail(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ee.email = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ee.checkEmail(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validUTF8 = [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        '"foobar"@example.com',
        '"foo\\@bar"@example.com',
        '"  foo  bar  "@example.com',
    ];
    const invalidUTF8 = [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'somename@ｇｍａｉｌ.com',
        'hans.m端ller@test.com',
        'z@co.c',
        'tüst@invalid.com',
    ];

    it('should validate correct E-Mail UTF8 accessors', function() {
        for (const v of validUTF8) {
            ee.emailUTF8 = v;
            assert.equal(v, ee.emailUTF8);
        }
    });

    it('should validate correct E-Mail UTF8 parameters', function() {
        for (const v of validUTF8) {
            const result = ee.checkEmailUTF8(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail UTF8 accessors', function() {

        for (const iv of invalidUTF8) {
            let failed = false;
            try {
                ee.emailUTF8 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail UTF8 parameters', function() {

        for (const iv of invalidUTF8) {
            let failed = false;
            try {
                const result = ee.checkEmailUTF8(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validDN = [
        'foo@bar.com',
        'x@x.au',
        'foo@bar.com.au',
        'foo+bar@bar.com',
        'hans.m端ller@test.com',
        'hans@m端ller.com',
        'test|123@m端ller.com',
        'test123+ext@gmail.com',
        'some.name.midd.leNa.me+extension@GoogleMail.com',
        'Some Name <foo@bar.com>',
        'Some Name <x@x.au>',
        'Some Name <foo@bar.com.au>',
        'Some Name <foo+bar@bar.com>',
        'Some Name <hans.m端ller@test.com>',
        'Some Name <hans@m端ller.com>',
        'Some Name <test|123@m端ller.com>',
        'Some Name <test123+ext@gmail.com>',
        '\'Foo Bar, Esq\'<foo@bar.com>',
        'Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Name<some.name.midd.leNa.me+extension@GoogleMail.com>',
        'Some Name <foo@gmail.com>',
        'Name🍓With🍑Emoji🚴‍♀️🏆<test@aftership.com>',
        '🍇🍗🍑<only_emoji@aftership.com>',
        '"<displayNameInBrackets>"<jh@gmail.com>',
        '"\\"quotes\\""<jh@gmail.com>',
        '"name;"<jh@gmail.com>',
        '"name;" <jh@gmail.com>',
    ];
    const invalidDN = [
        'invalidemail@',
        'invalid.com',
        '@invalid.com',
        'foo@bar.com.',
        'foo@bar.co.uk.',
        'Some Name <invalidemail@>',
        'Some Name <invalid.com>',
        'Some Name <@invalid.com>',
        'Some Name <foo@bar.com.>',
        'Some Name <foo@bar.co.uk.>',
        'Some Name foo@bar.co.uk.>',
        'Some Name <foo@bar.co.uk.',
        'Some Name < foo@bar.co.uk >',
        'Name foo@bar.co.uk',
        'Some Name <some..name@gmail.com>',
        'Some Name<emoji_in_address🍈@aftership.com>',
        'invisibleCharacter\u001F<jh@gmail.com>',
        '<displayNameInBrackets><jh@gmail.com>',
        '\\"quotes\\"<jh@gmail.com>',
        '""quotes""<jh@gmail.com>',
        'name;<jh@gmail.com>',
        '    <jh@gmail.com>',
        '"    "<jh@gmail.com>',
    ];

    it('should validate correct E-Mail display name accessors', function() {
        for (const v of validDN) {
            ee.emailDN = v;
            assert.equal(v, ee.emailDN);
        }
    });

    it('should validate correct E-Mail display name parameters', function() {
        for (const v of validDN) {
            const result = ee.checkEmailDN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail display name accessors', function() {

        for (const iv of invalidDN) {
            let failed = false;
            try {
                ee.emailDN = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail display name parameters', function() {

        for (const iv of invalidDN) {
            let failed = false;
            try {
                const result = ee.checkEmailDN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validDNReq = [
      'Some Name <foo@bar.com>',
      'Some Name <x@x.au>',
      'Some Name <foo@bar.com.au>',
      'Some Name <foo+bar@bar.com>',
      'Some Name <hans.m端ller@test.com>',
      'Some Name <hans@m端ller.com>',
      'Some Name <test|123@m端ller.com>',
      'Some Name <test123+ext@gmail.com>',
      'Some Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
      'Some Middle Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
      'Name <some.name.midd.leNa.me+extension@GoogleMail.com>',
      'Name<some.name.midd.leNa.me+extension@GoogleMail.com>',
    ];
    const invalidDNReq = [
      'some.name.midd.leNa.me+extension@GoogleMail.com',
      'foo@bar.com',
      'x@x.au',
      'foo@bar.com.au',
      'foo+bar@bar.com',
      'hans.m端ller@test.com',
      'hans@m端ller.com',
      'test|123@m端ller.com',
      'test123+ext@gmail.com',
      'invalidemail@',
      'invalid.com',
      '@invalid.com',
      'foo@bar.com.',
      'foo@bar.co.uk.',
      'Some Name <invalidemail@>',
      'Some Name <invalid.com>',
      'Some Name <@invalid.com>',
      'Some Name <foo@bar.com.>',
      'Some Name <foo@bar.co.uk.>',
      'Some Name foo@bar.co.uk.>',
      'Some Name <foo@bar.co.uk.',
      'Some Name < foo@bar.co.uk >',
      'Name foo@bar.co.uk',
    ];

    it('should validate correct E-Mail display name required accessors', function() {
        for (const v of validDNReq) {
            ee.emailDNReq = v;
            assert.equal(v, ee.emailDNReq);
        }
    });

    it('should validate correct E-Mail display name rquired parameters', function() {
        for (const v of validDNReq) {
            const result = ee.checkEmailDNReq(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid E-Mail display name required accessors', function() {

        for (const iv of invalidDNReq) {
            let failed = false;
            try {
                ee.emailDNReq = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid E-Mail display name required parameters', function() {

        for (const iv of invalidDNReq) {
            let failed = false;
            try {
                const result = ee.checkEmailDNReq(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
});

describe('IPv4 IPv6 IP Range', function() {

    class IPExample {
        #ipany: string;
        #ipv4: string;
        #ipv6: string;
        #ipanyrange: string;
        #ipv4range: string;
        #ipv6range: string;


        @ValidateAccessor<string>()
        @IsIP()
        set ipany(nd: string) { this.#ipany = nd; }
        get ipany() { return this.#ipany; }

        @ValidateAccessor<string>()
        @IsIP(4)
        set ipv4(nd: string) { this.#ipv4 = nd; }
        get ipv4() { return this.#ipv4; }

        @ValidateAccessor<string>()
        @IsIP(6)
        set ipv6(nd: string) { this.#ipv6 = nd; }
        get ipv6() { return this.#ipv6; }

        @ValidateAccessor<string>()
        @IsIPRange()
        set ipvrangeany(nd: string) { this.#ipanyrange = nd; }
        get ipvrangeany() { return this.#ipanyrange; }

        @ValidateAccessor<string>()
        @IsIPRange(4)
        set ipvrange4(nd: string) { this.#ipv4range = nd; }
        get ipvrange4() { return this.#ipv4range; }

        @ValidateAccessor<string>()
        @IsIPRange(6)
        set ipvrange6(nd: string) { this.#ipv6range = nd; }
        get ipvrange6() { return this.#ipv6range; }

        @ValidateParams
        checkIPany(
            @IsIP() addr: string
        ) {
            return addr;
        }

        @ValidateParams
        checkIPv4(
            @IsIP(4) addr: string
        ) {
            return addr;
        }

        @ValidateParams
        checkIPv6(
            @IsIP(6) addr: string
        ) {
            return addr;
        }

        @ValidateParams
        checkIPanyRange(
            @IsIPRange() addr: string
        ) {
            return addr;
        }

        @ValidateParams
        checkIPv4Range(
            @IsIPRange(4) addr: string
        ) {
            return addr;
        }

        @ValidateParams
        checkIPv6Range(
            @IsIPRange(6) addr: string
        ) {
            return addr;
        }
    }

    const ipe = new IPExample();

    const validANY = [
        '127.0.0.1',
        '0.0.0.0',
        '255.255.255.255',
        '1.2.3.4',
        '::1',
        '2001:db8:0000:1:1:1:1:1',
        '2001:db8:3:4::192.0.2.33',
        '2001:41d0:2:a141::1',
        '::ffff:127.0.0.1',
        '::0000',
        '0000::',
        '1::',
        '1111:1:1:1:1:1:1:1',
        'fe80::a6db:30ff:fe98:e946',
        '::',
        '::8',
        '::ffff:127.0.0.1',
        '::ffff:255.255.255.255',
        '::ffff:0:255.255.255.255',
        '::2:3:4:5:6:7:8',
        '::255.255.255.255',
        '0:0:0:0:0:ffff:127.0.0.1',
        '1:2:3:4:5:6:7::',
        '1:2:3:4:5:6::8',
        '1::7:8',
        '1:2:3:4:5::7:8',
        '1:2:3:4:5::8',
        '1::6:7:8',
        '1:2:3:4::6:7:8',
        '1:2:3:4::8',
        '1::5:6:7:8',
        '1:2:3::5:6:7:8',
        '1:2:3::8',
        '1::4:5:6:7:8',
        '1:2::4:5:6:7:8',
        '1:2::8',
        '1::3:4:5:6:7:8',
        '1::8',
        'fe80::7:8%eth0',
        'fe80::7:8%1',
        '64:ff9b::192.0.2.33',
        '0:0:0:0:0:0:10.0.0.1',
    ];
    const invalidANY = [
        'abc',
        '256.0.0.0',
        '0.0.0.256',
        '26.0.0.256',
        '0200.200.200.200',
        '200.0200.200.200',
        '200.200.0200.200',
        '200.200.200.0200',
        '::banana',
        'banana::',
        '::1banana',
        '::1::',
        '1:',
        ':1',
        ':1:1:1::2',
        '1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1',
        '::11111',
        '11111:1:1:1:1:1:1:1',
        '2001:db8:0000:1:1:1:1::1',
        '0:0:0:0:0:0:ffff:127.0.0.1',
        '0:0:0:0:ffff:127.0.0.1',
    ];

    it('should validate correct IP ANY accessors', function() {
        for (const v of validANY) {
            ipe.ipany = v;
            assert.equal(v, ipe.ipany);
        }
    });

    it('should validate correct IP ANY parameters', function() {
        for (const v of validANY) {
            const result = ipe.checkIPany(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IP ANY accessors', function() {

        for (const iv of invalidANY) {
            let failed = false;
            try {
                ipe.ipany = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IP ANY parameters', function() {

        for (const iv of invalidANY) {
            let failed = false;
            try {
                const result = ipe.checkIPany(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validIPv4 = [
        '127.0.0.1',
        '0.0.0.0',
        '255.255.255.255',
        '1.2.3.4',
        '255.0.0.1',
        '0.0.1.1',
    ];
    const invalidIPv4 = [
        '::1',
        '2001:db8:0000:1:1:1:1:1',
        '::ffff:127.0.0.1',
        '137.132.10.01',
        '0.256.0.256',
        '255.256.255.256',
    ];

    it('should validate correct IPv4 accessors', function() {
        for (const v of validIPv4) {
            ipe.ipv4 = v;
            assert.equal(v, ipe.ipv4);
        }
    });

    it('should validate correct IPv4 parameters', function() {
        for (const v of validIPv4) {
            const result = ipe.checkIPv4(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IPv4 accessors', function() {

        for (const iv of invalidIPv4) {
            let failed = false;
            try {
                ipe.ipv4 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IPv4 parameters', function() {

        for (const iv of invalidIPv4) {
            let failed = false;
            try {
                const result = ipe.checkIPv4(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validIPv6 = [
        '::1',
        '2001:db8:0000:1:1:1:1:1',
        '::ffff:127.0.0.1',
        'fe80::1234%1',
        'ff08::9abc%10',
        'ff08::9abc%interface10',
        'ff02::5678%pvc1.3',
    ];
    const invalidIPv6 = [
        '127.0.0.1',
        '0.0.0.0',
        '255.255.255.255',
        '1.2.3.4',
        '::ffff:287.0.0.1',
        '%',
        'fe80::1234%',
        'fe80::1234%1%3%4',
        'fe80%fe80%',
    ];

    it('should validate correct IPv6 accessors', function() {
        for (const v of validIPv6) {
            ipe.ipv6 = v;
            assert.equal(v, ipe.ipv6);
        }
    });

    it('should validate correct IPv6 parameters', function() {
        for (const v of validIPv6) {
            const result = ipe.checkIPv6(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IPv6 accessors', function() {

        for (const iv of invalidIPv6) {
            let failed = false;
            try {
                ipe.ipv6 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IPv6 parameters', function() {

        for (const iv of invalidIPv6) {
            let failed = false;
            try {
                const result = ipe.checkIPv6(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validANYRange = [
        '127.0.0.1/24',
        '0.0.0.0/0',
        '255.255.255.0/32',
        '::/0',
        '::/128',
        '2001::/128',
        '2001:800::/128',
        '::ffff:127.0.0.1/128',
    ];
    const invalidANYRange = [
        'abc',
        '127.200.230.1/35',
        '127.200.230.1/-1',
        '1.1.1.1/011',
        '1.1.1/24.1',
        '1.1.1.1/01',
        '1.1.1.1/1.1',
        '1.1.1.1/1.',
        '1.1.1.1/1/1',
        '1.1.1.1',
        '::1',
        '::1/164',
        '2001::/240',
        '2001::/-1',
        '2001::/001',
        '2001::/24.1',
        '2001:db8:0000:1:1:1:1:1',
        '::ffff:127.0.0.1',
    ];

    it('should validate correct IP ANY Range accessors', function() {
        for (const v of validANYRange) {
            ipe.ipvrangeany = v;
            assert.equal(v, ipe.ipvrangeany);
        }
    });

    it('should validate correct IP ANY Range parameters', function() {
        for (const v of validANYRange) {
            const result = ipe.checkIPanyRange(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IP ANY Range accessors', function() {

        for (const iv of invalidANYRange) {
            let failed = false;
            try {
                ipe.ipvrangeany = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IP ANY Range parameters', function() {

        for (const iv of invalidANYRange) {
            let failed = false;
            try {
                const result = ipe.checkIPanyRange(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validIPv4Range = [
        '127.0.0.1/1',
        '0.0.0.0/1',
        '255.255.255.255/1',
        '1.2.3.4/1',
        '255.0.0.1/1',
        '0.0.1.1/1',
    ];
    const invalidIPv4Range = [
        'abc',
        '::1',
        '2001:db8:0000:1:1:1:1:1',
        '::ffff:127.0.0.1',
        '137.132.10.01',
        '0.256.0.256',
        '255.256.255.256',
    ];

    it('should validate correct IP v4 Range accessors', function() {
        for (const v of validIPv4Range) {
            ipe.ipvrange4 = v;
            assert.equal(v, ipe.ipvrange4);
        }
    });

    it('should validate correct IP v4 Range parameters', function() {
        for (const v of validIPv4Range) {
            const result = ipe.checkIPv4Range(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IP v4 Range accessors', function() {

        for (const iv of invalidIPv4Range) {
            let failed = false;
            try {
                ipe.ipvrange4 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IP v4 Range parameters', function() {

        for (const iv of invalidIPv4Range) {
            let failed = false;
            try {
                const result = ipe.checkIPanyRange(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validIPv6Range = [
        '::1/1',
        '2001:db8:0000:1:1:1:1:1/1',
        '::ffff:127.0.0.1/1',
    ];
    const invalidIPv6Range = [
        'abc',
        '127.0.0.1',
        '0.0.0.0',
        '255.255.255.255',
        '1.2.3.4',
        '::ffff:287.0.0.1',
        '::ffff:287.0.0.1/254',
        '%',
        'fe80::1234%',
        'fe80::1234%1%3%4',
        'fe80%fe80%',
    ];

    
    it('should validate correct IP v6 Range accessors', function() {
        for (const v of validIPv6Range) {
            ipe.ipvrange6 = v;
            assert.equal(v, ipe.ipvrange6);
        }
    });

    it('should validate correct IP v6 Range parameters', function() {
        for (const v of validIPv6Range) {
            const result = ipe.checkIPv6Range(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid IP v6 Range accessors', function() {

        for (const iv of invalidIPv6Range) {
            let failed = false;
            try {
                ipe.ipvrange6 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid IP v6 Range parameters', function() {

        for (const iv of invalidIPv6Range) {
            let failed = false;
            try {
                const result = ipe.checkIPv6Range(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('URL - URI - EAN - FQDN - Hash', function() {

    class URLURIExamples {
        #datauri: string;

        @ValidateAccessor<string>()
        @IsDataURI()
        set datauri(nd: string) { this.#datauri = nd; }
        get datauri() { return this.#datauri; }

        @ValidateParams
        checkDataURI(
            @IsDataURI() nd: string
        ) {
            return nd;
        }

        #ean: string;

        @ValidateAccessor<string>()
        @IsEAN()
        set ean(nd: string) { this.#ean = nd; }
        get ean() { return this.#ean; }

        @ValidateParams
        checkEAN(
            @IsEAN() nd: string
        ) {
            return nd;
        }

        #fqdn: string;

        @ValidateAccessor<string>()
        @IsFQDN()
        set fqdn(nd: string) { this.#fqdn = nd; }
        get fqdn() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ allow_trailing_dot: true })
        set fqdnDOT(nd: string) { this.#fqdn = nd; }
        get fqdnDOT() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ require_tld: false })
        set fqdnTLD(nd: string) { this.#fqdn = nd; }
        get fqdnTLD() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ allow_numeric_tld: true, require_tld: false })
        set fqdnNUMTLD(nd: string) { this.#fqdn = nd; }
        get fqdnNUMTLD() { return this.#fqdn; }

        @ValidateAccessor<string>()
        @IsFQDN({ allow_wildcard: true })
        set fqdnWILD(nd: string) { this.#fqdn = nd; }
        get fqdnWILD() { return this.#fqdn; }

        @ValidateParams
        checkFQDN(
            @IsFQDN() nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNDOT(
            @IsFQDN({ allow_trailing_dot: true }) nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNTLD(
            @IsFQDN({ require_tld: false }) nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNNUMTLD(
            @IsFQDN({ allow_numeric_tld: true, require_tld: false }) nd: string
        ) {
            return nd;
        }

        @ValidateParams
        checkFQDNWILD(
            @IsFQDN({ allow_wildcard: true }) nd: string
        ) {
            return nd;
        }

        #hash: string;

        @ValidateAccessor<string>()
        @IsHash('md5')
        set hashMD5(nd: string) { this.#hash = nd; }
        get hashMD5() { return this.#hash; }

        @ValidateParams
        checkHashMD5(
            @IsHash('md5') nd: string
        ) {
            return nd;
        }

        @ValidateAccessor<string>()
        @IsHash('md4')
        set hashMD4(nd: string) { this.#hash = nd; }
        get hashMD4() { return this.#hash; }

        @ValidateParams
        checkHashMD4(
            @IsHash('md4') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('ripemd128')
        set hashRIPEMD128(nd: string) { this.#hash = nd; }
        get hashRIPEMD128() { return this.#hash; }

        @ValidateParams
        checkHashRIPEMD128(
            @IsHash('ripemd128') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('ripemd160')
        set hashRIPEMD160(nd: string) { this.#hash = nd; }
        get hashRIPEMD160() { return this.#hash; }

        @ValidateParams
        checkHashRIPEMD160(
            @IsHash('ripemd160') nd: string
        ) {
            return nd;
        }



        @ValidateAccessor<string>()
        @IsHash('tiger160')
        set hashTIGER160(nd: string) { this.#hash = nd; }
        get hashTIGER160() { return this.#hash; }

        @ValidateParams
        checkHashTIGER160(
            @IsHash('tiger160') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('tiger192')
        set hashTIGER192(nd: string) { this.#hash = nd; }
        get hashTIGER192() { return this.#hash; }

        @ValidateParams
        checkHashTIGER192(
            @IsHash('tiger192') nd: string
        ) {
            return nd;
        }



        @ValidateAccessor<string>()
        @IsHash('sha1')
        set hashSHA1(nd: string) { this.#hash = nd; }
        get hashSHA1() { return this.#hash; }

        @ValidateParams
        checkHashSHA1(
            @IsHash('sha1') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('sha256')
        set hashSHA256(nd: string) { this.#hash = nd; }
        get hashSHA256() { return this.#hash; }

        @ValidateParams
        checkHashSHA256(
            @IsHash('sha256') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('sha384')
        set hashSHA384(nd: string) { this.#hash = nd; }
        get hashSHA384() { return this.#hash; }

        @ValidateParams
        checkHashSHA384(
            @IsHash('sha384') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('sha512')
        set hashSHA512(nd: string) { this.#hash = nd; }
        get hashSHA512() { return this.#hash; }

        @ValidateParams
        checkHashSHA512(
            @IsHash('sha512') nd: string
        ) {
            return nd;
        }






        @ValidateAccessor<string>()
        @IsHash('crc32')
        set hashCRC32(nd: string) { this.#hash = nd; }
        get hashCRC32() { return this.#hash; }

        @ValidateParams
        checkHashCRC32(
            @IsHash('crc32') nd: string
        ) {
            return nd;
        }


        @ValidateAccessor<string>()
        @IsHash('crc32b')
        set hashCRC32B(nd: string) { this.#hash = nd; }
        get hashCRC32B() { return this.#hash; }

        @ValidateParams
        checkHashCRC32B(
            @IsHash('crc32b') nd: string
        ) {
            return nd;
        }


        #md5hash: string;

        @ValidateAccessor<string>()
        @IsMD5()
        set md5hash(nd: string) { this.#md5hash = nd; }
        get md5hash() { return this.#md5hash; }

        @ValidateParams
        checkMD5Hash(
            @IsMD5() nd: string
        ) {
            return nd;
        }

    }

    const uue = new URLURIExamples();
    
    const validDataURI = [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
        '   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   ',
        'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2300B1FF%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3C%2Fsvg%3E',
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCBmaWxsPSIjMDBCMUZGIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjwvc3ZnPg==',
        ' data:,Hello%2C%20World!',
        ' data:,Hello World!',
        ' data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
        ' data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
        'data:,A%20brief%20note',
        'data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E',
    ];

    const invalidDataURI = [
        'dataxbase64',
        'data:HelloWorld',
        'data:,A%20brief%20invalid%20[note',
        'file:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
        'data:text/html;charset=,%3Ch1%3EHello!%3C%2Fh1%3E',
        'data:text/html;charset,%3Ch1%3EHello!%3C%2Fh1%3E', 'data:base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        '',
        'http://wikipedia.org',
        'base64',
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
    ];

    it('should validate correct Data URI accessors', function() {
        for (const v of validDataURI) {
            uue.datauri = v;
            assert.equal(v, uue.datauri);
        }
    });

    it('should validate correct Data URI parameters', function() {
        for (const v of validDataURI) {
            const result = uue.checkDataURI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Data URI accessors', function() {

        for (const iv of invalidDataURI) {
            let failed = false;
            try {
                uue.datauri = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Data URI parameters', function() {

        for (const iv of invalidDataURI) {
            let failed = false;
            try {
                const result = uue.checkDataURI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validEAN = [
        '9421023610112',
        '1234567890128',
        '4012345678901',
        '9771234567003',
        '9783161484100',
        '73513537',
        '00012345600012',
        '10012345678902',
        '20012345678909',
    ];
    const invalidEAN = [
        '5901234123451',
        '079777681629',
        '0705632085948',
    ];

    it('should validate correct EAN accessors', function() {
        for (const v of validEAN) {
            uue.ean = v;
            assert.equal(v, uue.ean);
        }
    });

    it('should validate correct EAN parameters', function() {
        for (const v of validEAN) {
            const result = uue.checkEAN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid EAN accessors', function() {

        for (const iv of invalidEAN) {
            let failed = false;
            try {
                uue.ean = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid EAN parameters', function() {

        for (const iv of invalidEAN) {
            let failed = false;
            try {
                const result = uue.checkEAN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validFQDN = [
        'domain.com',
        'dom.plato',
        'a.domain.co',
        'foo--bar.com',
        'xn--froschgrn-x9a.com',
        'rebecca.blackfriday',
        '1337.com',
    ];
    const invalidFQDN = [
        'abc',
        '256.0.0.0',
        '_.com',
        '*.some.com',
        's!ome.com',
        'domain.com/',
        '/more.com',
        'domain.com�',
        'domain.co\u00A0m',
        'domain.co\u1680m',
        'domain.co\u2006m',
        'domain.co\u2028m',
        'domain.co\u2029m',
        'domain.co\u202Fm',
        'domain.co\u205Fm',
        'domain.co\u3000m',
        'domain.com\uDC00',
        'domain.co\uEFFFm',
        'domain.co\uFDDAm',
        'domain.co\uFFF4m',
        'domain.com©',
        'example.0',
        '192.168.0.9999',
        '192.168.0',
    ];

    it('should validate correct FQDN accessors', function() {
        for (const v of validFQDN) {
            uue.fqdn = v;
            assert.equal(v, uue.fqdn);
        }
    });

    it('should validate correct FQDN parameters', function() {
        for (const v of validFQDN) {
            const result = uue.checkFQDN(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid FQDN accessors', function() {

        for (const iv of invalidFQDN) {
            let failed = false;
            try {
                uue.fqdn = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid FQDN parameters', function() {

        for (const iv of invalidFQDN) {
            let failed = false;
            try {
                const result = uue.checkFQDN(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('should validate correct FQDN trailing dot', function() {
        for (const v of [ 'example.com.' ]) {
            uue.fqdnDOT = v;
            assert.equal(v, uue.fqdnDOT);
            const result = uue.checkFQDNDOT(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid FQDN TLD accessors', function() {

        for (const iv of [ 'example.0',
                            '192.168.0',
                            '192.168.0.9999' ]) {
            let failed = false;
            try {
                uue.fqdnTLD = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);

            failed = false;
            try {
                const result = uue.checkFQDNTLD(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('should validate correct FQDN numeric TLD', function() {
        for (const v of [ 'example.0',
                        '192.168.0',
                        '192.168.0.9999' ]) {
            // console.log(`accessor ${v}`);
            uue.fqdnNUMTLD = v;
            assert.equal(v, uue.fqdnNUMTLD);
            // console.log(`parameter ${v}`);
            const result = uue.checkFQDNNUMTLD(v);
            assert.equal(v, result);
        }
    });

    it('should validate correct FQDN wildcards', function() {
        for (const v of [ '*.example.com',
                            '*.shop.example.com' ]) {
            // console.log(`accessor ${v}`);
            uue.fqdnWILD = v;
            assert.equal(v, uue.fqdnWILD);
            // console.log(`parameter ${v}`);
            const result = uue.checkFQDNWILD(v);
            assert.equal(v, result);
        }
    });


    for (const hash of ['md5', 'md4', 'ripemd128', 'tiger128']) {
        const valid = [
            'd94f3f016ae679c3008de268209132f2',
            '751adbc511ccbe8edf23d486fa4581cd',
            '88dae00e614d8f24cfd5a8b3f8002e93',
            '0bf1c35032a71a14c2f719e5a14c1e96',
            'd94f3F016Ae679C3008de268209132F2',
            '88DAE00e614d8f24cfd5a8b3f8002E93',
        ];
        const invalid = [
            'q94375dj93458w34',
            '39485729348',
            '%&FHKJFvk',
            'KYT0bf1c35032a71a14c2f719e5a1',
        ];
  
        it(`should validate correct ${hash} algorithm`, function() {
            for (const v of valid) {
                // console.log(`accessor ${v}`);
                if (hash === 'md5') {
                    uue.hashMD5 = v;
                    assert.equal(v, uue.hashMD5);
                    const result = uue.checkHashMD5(v);
                    assert.equal(v, result);
                } else if (hash === 'md4') {
                    uue.hashMD4 = v;
                    assert.equal(v, uue.hashMD4);
                    const result = uue.checkHashMD4(v);
                    assert.equal(v, result);
                } else if (hash === 'ripemd128') {
                    uue.hashRIPEMD128 = v;
                    assert.equal(v, uue.hashRIPEMD128);
                    const result = uue.checkHashRIPEMD128(v);
                    assert.equal(v, result);
                }
            }
        });

        it(`should reject invalid ${hash} algorithm`, function() {
            for (const iv of invalid) {
                let failed = false;
                if (hash === 'md5') {
                    failed = false;
                    try {
                        uue.hashMD5 = iv;
                        assert.equal(iv, uue.hashMD5);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashMD5(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'md4') {
                    failed = false;
                    try {
                        uue.hashMD4 = iv;
                        assert.equal(iv, uue.hashMD4);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashMD4(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'ripemd128') {
                    failed = false;
                    try {
                        uue.hashRIPEMD128 = iv;
                        assert.equal(iv, uue.hashRIPEMD128);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    
                    failed = false;
                    try {
                        const result = uue.checkHashRIPEMD128(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                }
            }
        });
    }

    for (const hash of ['crc32', 'crc32b']) {
        const valid = [
            'd94f3f01',
            '751adbc5',
            '88dae00e',
            '0bf1c350',
            '88DAE00e',
            '751aDBc5',
        ];
        const invalid = [
            'KYT0bf1c35032a71a14c2f719e5a14c1',
            'q94375dj93458w34',
            'q943',
            '39485729348',
            '%&FHKJFvk',
        ];
  
        it(`should validate correct ${hash} algorithm`, function() {
            for (const v of valid) {
                // console.log(`accessor ${v}`);
                if (hash === 'crc32') {
                    uue.hashCRC32 = v;
                    assert.equal(v, uue.hashCRC32);
                    const result = uue.checkHashCRC32(v);
                    assert.equal(v, result);
                } else if (hash === 'crc32b') {
                    uue.hashCRC32B = v;
                    assert.equal(v, uue.hashCRC32B);
                    const result = uue.checkHashCRC32B(v);
                    assert.equal(v, result);
                }
            }
        });


        it(`should reject invalid ${hash} algorithm`, function() {
            for (const iv of invalid) {
                let failed = false;
                if (hash === 'crc32') {
                    failed = false;
                    try {
                        uue.hashCRC32 = iv;
                        assert.equal(iv, uue.hashCRC32);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashCRC32(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'crc32b') {
                    failed = false;
                    try {
                        uue.hashCRC32B = iv;
                        assert.equal(iv, uue.hashCRC32B);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashCRC32B(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                }
            }
        });
    }

    for (const hash of ['sha1', 'tiger160', 'ripemd160']) {
        const valid = [
            '3ca25ae354e192b26879f651a51d92aa8a34d8d3',
            'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
            'beb8c3f30da46be179b8df5f5ecb5e4b10508230',
            'efd5d3b190e893ed317f38da2420d63b7ae0d5ed',
            'AAF4c61ddCC5e8a2dabede0f3b482cd9AEA9434D',
            '3ca25AE354e192b26879f651A51d92aa8a34d8D3',
        ];
        const invalid = [
            'KYT0bf1c35032a71a14c2f719e5a14c1',
            'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
            'q94375dj93458w34',
            '39485729348',
            '%&FHKJFvk',
        ];
  
        it(`should validate correct ${hash} algorithm`, function() {
            for (const v of valid) {
                // console.log(`accessor ${v}`);
                if (hash === 'sha1') {
                    uue.hashSHA1 = v;
                    assert.equal(v, uue.hashSHA1);
                    const result = uue.checkHashSHA1(v);
                    assert.equal(v, result);
                } else if (hash === 'tiger160') {
                    uue.hashTIGER160 = v;
                    assert.equal(v, uue.hashTIGER160);
                    const result = uue.checkHashTIGER160(v);
                    assert.equal(v, result);
                } else if (hash === 'ripemd160') {
                    uue.hashRIPEMD160 = v;
                    assert.equal(v, uue.hashRIPEMD160);
                    const result = uue.checkHashRIPEMD160(v);
                    assert.equal(v, result);
                }
            }
        });

        it(`should reject invalid ${hash} algorithm`, function() {
            for (const iv of invalid) {
                let failed = false;
                if (hash === 'sha1') {
                    failed = false;
                    try {
                        uue.hashSHA1 = iv;
                        assert.equal(iv, uue.hashSHA1);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashSHA1(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'tiger160') {
                    failed = false;
                    try {
                        uue.hashTIGER160 = iv;
                        assert.equal(iv, uue.hashTIGER160);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashTIGER160(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                } else if (hash === 'ripemd160') {
                    failed = false;
                    try {
                        uue.hashRIPEMD160 = iv;
                        assert.equal(iv, uue.hashRIPEMD160);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                    failed = false;
                    try {
                        const result = uue.checkHashRIPEMD160(iv);
                        assert.equal(iv, result);
                    } catch (e) { failed = true; }
                    assert.equal(failed, true);
                }
            }
        });
    }

    const validSHA256 = [
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        '1d996e033d612d9af2b44b70061ee0e868bfd14c2dd90b129e1edeb7953e7985',
        '80f70bfeaed5886e33536bcfa8c05c60afef5a0e48f699a7912d5e399cdcc441',
        '579282cfb65ca1f109b78536effaf621b853c9f7079664a3fbe2b519f435898c',
        '2CF24dba5FB0a30e26E83b2AC5b9E29E1b161e5C1fa7425E73043362938b9824',
        '80F70bFEAed5886e33536bcfa8c05c60aFEF5a0e48f699a7912d5e399cdCC441',
    ];
    const invalidSHA256 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct SHA256 algorithm`, function() {
        for (const v of validSHA256) {
            // console.log(`accessor ${v}`);
            uue.hashSHA256 = v;
            assert.equal(v, uue.hashSHA256);
            const result = uue.checkHashSHA256(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid SHA256 algorithm`, function() {
        for (const iv of invalidSHA256) {
            let failed = false;
            try {
                uue.hashSHA256 = iv;
                assert.equal(iv, uue.hashSHA256);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashSHA256(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validSHA348 = [
        '3fed1f814d28dc5d63e313f8a601ecc4836d1662a19365cbdcf6870f6b56388850b58043f7ebf2418abb8f39c3a42e31',
        'b330f4e575db6e73500bd3b805db1a84b5a034e5d21f0041d91eec85af1dfcb13e40bb1c4d36a72487e048ac6af74b58',
        'bf547c3fc5841a377eb1519c2890344dbab15c40ae4150b4b34443d2212e5b04aa9d58865bf03d8ae27840fef430b891',
        'fc09a3d11368386530f985dacddd026ae1e44e0e297c805c3429d50744e6237eb4417c20ffca8807b071823af13a3f65',
        '3fed1f814d28dc5d63e313f8A601ecc4836d1662a19365CBDCf6870f6b56388850b58043f7ebf2418abb8f39c3a42e31',
        'b330f4E575db6e73500bd3b805db1a84b5a034e5d21f0041d91EEC85af1dfcb13e40bb1c4d36a72487e048ac6af74b58',
    ];
    const invalidSHA348 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct SHA348 algorithm`, function() {
        for (const v of validSHA348) {
            // console.log(`accessor ${v}`);
            uue.hashSHA384 = v;
            assert.equal(v, uue.hashSHA384);
            const result = uue.checkHashSHA384(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid SHA348 algorithm`, function() {
        for (const iv of invalidSHA348) {
            let failed = false;
            try {
                uue.hashSHA384 = iv;
                assert.equal(iv, uue.hashSHA384);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashSHA384(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validSHA512 = [
        '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043',
        '83c586381bf5ba94c8d9ba8b6b92beb0997d76c257708742a6c26d1b7cbb9269af92d527419d5b8475f2bb6686d2f92a6649b7f174c1d8306eb335e585ab5049',
        '45bc5fa8cb45ee408c04b6269e9f1e1c17090c5ce26ffeeda2af097735b29953ce547e40ff3ad0d120e5361cc5f9cee35ea91ecd4077f3f589b4d439168f91b9',
        '432ac3d29e4f18c7f604f7c3c96369a6c5c61fc09bf77880548239baffd61636d42ed374f41c261e424d20d98e320e812a6d52865be059745fdb2cb20acff0ab',
        '9B71D224bd62f3785D96d46ad3ea3d73319bFBC2890CAAdae2dff72519673CA72323C3d99ba5c11d7c7ACC6e14b8c5DA0c4663475c2E5c3adef46f73bcDEC043',
        '432AC3d29E4f18c7F604f7c3c96369A6C5c61fC09Bf77880548239baffd61636d42ed374f41c261e424d20d98e320e812a6d52865be059745fdb2cb20acff0ab',
    ];
    const invalidSHA512 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];
    
    it(`should validate correct SHA512 algorithm`, function() {
        for (const v of validSHA512) {
            // console.log(`accessor ${v}`);
            uue.hashSHA512 = v;
            assert.equal(v, uue.hashSHA512);
            const result = uue.checkHashSHA512(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid SHA512 algorithm`, function() {
        for (const iv of invalidSHA512) {
            let failed = false;
            try {
                uue.hashSHA512 = iv;
                assert.equal(iv, uue.hashSHA512);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashSHA512(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validTIGER192 = [
        '6281a1f098c5e7290927ed09150d43ff3990a0fe1a48267c',
        '56268f7bc269cf1bc83d3ce42e07a85632394737918f4760',
        '46fc0125a148788a3ac1d649566fc04eb84a746f1a6e4fa7',
        '7731ea1621ae99ea3197b94583d034fdbaa4dce31a67404a',
        '6281A1f098c5e7290927ed09150d43ff3990a0fe1a48267C',
        '46FC0125a148788a3AC1d649566fc04eb84A746f1a6E4fa7',
    ];
    const invalidTIGER192 = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct TIGER192 algorithm`, function() {
        for (const v of validTIGER192) {
            // console.log(`accessor ${v}`);
            uue.hashTIGER192 = v;
            assert.equal(v, uue.hashTIGER192);
            const result = uue.checkHashTIGER192(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid TIGER192 algorithm`, function() {
        for (const iv of invalidTIGER192) {
            let failed = false;
            try {
                uue.hashTIGER192 = iv;
                assert.equal(iv, uue.hashTIGER192);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkHashTIGER192(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
    const validmd5hash = [
        'd94f3f016ae679c3008de268209132f2',
        '751adbc511ccbe8edf23d486fa4581cd',
        '88dae00e614d8f24cfd5a8b3f8002e93',
        '0bf1c35032a71a14c2f719e5a14c1e96',
    ];
    const invalidmd5hash = [
        'KYT0bf1c35032a71a14c2f719e5a14c1',
        'q94375dj93458w34',
        '39485729348',
        '%&FHKJFvk',
    ];

    it(`should validate correct isMD5 hash`, function() {
        for (const v of validmd5hash) {
            // console.log(`accessor ${v}`);
            uue.md5hash = v;
            assert.equal(v, uue.md5hash);
            const result = uue.checkMD5Hash(v);
            assert.equal(v, result);
        }
    });

    it(`should reject invalid isMD5 hash`, function() {
        for (const iv of invalidmd5hash) {
            let failed = false;
            try {
                uue.md5hash = iv;
                assert.equal(iv, uue.hashTIGER192);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
            failed = false;
            try {
                const result = uue.checkMD5Hash(iv);
                assert.equal(iv, result);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });
    
});

describe('IsISO31661Alpha2 - IsISO31661Alpha3', function() {

    class ISOCCExample {
        #isoalpha2: string;
        #isoalpha3: string;

        @ValidateAccessor<string>()
        @IsISO31661Alpha2()
        set isoalpha2(nd: string) { this.#isoalpha2 = nd; }
        get isoalpha2() { return this.#isoalpha2; }

        @ValidateAccessor<string>()
        @IsISO31661Alpha3()
        set isoalpha3(nd: string) { this.#isoalpha3 = nd; }
        get isoalpha3() { return this.#isoalpha3; }

        @ValidateParams
        checkISOAlpha2(
            @IsISO31661Alpha2() addr: string
        ) {
            return addr;
        }

        @ValidateParams
        checkISOAlpha3(
            @IsISO31661Alpha3() addr: string
        ) {
            return addr;
        }

    }

    const icce = new ISOCCExample();

    const validA2 = [
        'FR',
        'fR',
        'GB',
        'PT',
        'CM',
        'JP',
        'PM',
        'ZW',
        'MM',
        'cc',
        'GG',
    ];
    const invalidA2 = [
        '',
        'FRA',
        'AA',
        'PI',
        'RP',
        'WV',
        'WL',
        'UK',
        'ZZ',
    ];

    it('should validate correct ISO31661 alpha-2 accessors', function() {
        for (const v of validA2) {
            icce.isoalpha2 = v;
            assert.equal(v, icce.isoalpha2);
        }
    });

    it('should validate correct ISO31661 alpha-2 parameters', function() {
        for (const v of validA2) {
            const result = icce.checkISOAlpha2(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISO31661 alpha-2 accessors', function() {

        for (const iv of invalidA2) {
            let failed = false;
            try {
                icce.isoalpha2 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISO31661 alpha-2 parameters', function() {

        for (const iv of invalidA2) {
            let failed = false;
            try {
                const result = icce.checkISOAlpha2(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validA3 = [
        'ABW',
        'HND',
        'KHM',
        'RWA',
    ];
    const invalidA3 = [
        '',
        'FR',
        'fR',
        'GB',
        'PT',
        'CM',
        'JP',
        'PM',
        'ZW',
    ];

    it('should validate correct ISO31661 alpha-3 accessors', function() {
        for (const v of validA3) {
            icce.isoalpha3 = v;
            assert.equal(v, icce.isoalpha3);
        }
    });

    it('should validate correct ISO31661 alpha-3 parameters', function() {
        for (const v of validA3) {
            const result = icce.checkISOAlpha3(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISO31661 alpha-3 accessors', function() {

        for (const iv of invalidA3) {
            let failed = false;
            try {
                icce.isoalpha3 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISO31661 alpha-3 parameters', function() {

        for (const iv of invalidA3) {
            let failed = false;
            try {
                const result = icce.checkISOAlpha3(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('ISO3901 International Standard Recording Code', function() {

    class ISRCExample {

        #isrc: string;

        @ValidateAccessor<string>()
        @IsISRC()
        set isrc(nd: string) { this.#isrc = nd; }
        get isrc() { return this.#isrc; }

        @ValidateParams
        checkISRC(
            @IsISRC() addr: string
        ) {
            return addr;
        }
    }

    const ie = new ISRCExample();
    
    const valid = [
        'USAT29900609',
        'GBAYE6800011',
        'USRC15705223',
        'USCA29500702',
    ];
    const invalid = [
        'USAT2990060',
        'SRC15705223',
        'US-CA29500702',
        'USARC15705223',
    ];

    it('should validate correct ISRC accessors', function() {
        for (const v of valid) {
            ie.isrc = v;
            assert.equal(v, ie.isrc);
        }
    });

    it('should validate correct ISRC parameters', function() {
        for (const v of valid) {
            const result = ie.checkISRC(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid ISRC accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                ie.isrc = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid ISRC parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = ie.checkISRC(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('JWT', function() {

    class JWTExample {

        #jwt: string;

        @ValidateAccessor<string>()
        @IsJWT()
        set jwt(nd: string) { this.#jwt = nd; }
        get jwt() { return this.#jwt; }

        @ValidateParams
        checkJWT(
            @IsJWT() addr: string
        ) {
            return addr;
        }
    }

    const jwt = new JWTExample();
    
    const valid = [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb3JlbSI6Imlwc3VtIn0.ymiJSsMJXR6tMSr8G9usjQ15_8hKPDv_CArLhxw28MI',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2xvciI6InNpdCIsImFtZXQiOlsibG9yZW0iLCJpcHN1bSJdfQ.rRpe04zbWbbJjwM43VnHzAboDzszJtGrNsUxaqQ-GQ8',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', // No signature
    ];
    const invalid = [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        '$Zs.ewu.su84',
        'ks64$S/9.dy$§kz.3sd73b',
    ];

    it('should validate correct JWT accessors', function() {
        for (const v of valid) {
            jwt.jwt = v;
            assert.equal(v, jwt.jwt);
        }
    });

    it('should validate correct JWT parameters', function() {
        for (const v of valid) {
            const result = jwt.checkJWT(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid JWT accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                jwt.jwt = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid JWT parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = jwt.checkJWT(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('Magnet URI', function() {
    class MagnetURIExample {

        #magnet: string;

        @ValidateAccessor<string>()
        @IsMagnetURI()
        set magnet(nd: string) { this.#magnet = nd; }
        get magnet() { return this.#magnet; }

        @ValidateParams
        checkURI(
            @IsMagnetURI() addr: string
        ) {
            return addr;
        }

    }

    const mue = new MagnetURIExample();
    
    const valid = [
        'magnet:?xt.1=urn:sha1:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456&xt.2=urn:sha1:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
        'magnet:?xt=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234&dn=helloword2000&tr=udp://helloworld:1337/announce',
        'magnet:?xt=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234&dn=foo',
        'magnet:?xt=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234&dn=&tr=&nonexisting=hello world',
        'magnet:?xt=urn:md5:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
        'magnet:?xt=urn:tree:tiger:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
        'magnet:?xt=urn:ed2k:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
    ];
    const invalid = [
        ':?xt=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
        'xt=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
        'magneta:?xt=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
        'magnet:?xt=uarn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
        'magnet:?xt=urn:btihz',
        'magnet::?xt=urn:btih:UHWY2892JNEJ2GTEYOMDNU67E8ICGICYE92JDUGH',
        'magnet:?xt:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'magnet:?xt:urn:nonexisting:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
        'magnet:?xt.2=urn:btih:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234',
        'magnet:?xt=urn:ed2k:ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890123456789ABCD',
    ];

    it('should validate correct Magnet URI accessors', function() {
        for (const v of valid) {
            mue.magnet = v;
            assert.equal(v, mue.magnet);
        }
    });

    it('should validate correct Magnet URI parameters', function() {
        for (const v of valid) {
            const result = mue.checkURI(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid Magnet URI accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                mue.magnet = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid Magnet URI parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = mue.checkURI(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

});

describe('MAC Address', function() {

    // NOTE - the released version of validator.js does not support
    // isMACAddress with { eui: '64' }
    //
    // Instead, support for that feature is seemingly in development.
    // The test data shown here is from the main branch, not from
    // their releases branch.

    class MACAddressExample {

        #mac: string;

        @ValidateAccessor<string>()
        @IsMACAddress()
        set mac(nd: string) { this.#mac = nd; }
        get mac() { return this.#mac; }

        @ValidateParams
        checkMAC(
            @IsMACAddress() addr: string
        ) {
            return addr;
        }

        #mac48: string;

        @ValidateAccessor<string>()
        @IsMACAddress({ eui: '48' })
        set mac48(nd: string) { this.#mac48 = nd; }
        get mac48() { return this.#mac48; }

        @ValidateParams
        checkMAC48(
            @IsMACAddress({ eui: '48' }) addr: string
        ) {
            return addr;
        }

        /* #mac64: string;

        @ValidateAccessor<string>()
        @IsMACAddress({ eui: '64' })
        set mac64(nd: string) { this.#mac64 = nd; }
        get mac64() { return this.#mac64; }

        @ValidateParams
        checkMAC64(
            @IsMACAddress({ eui: '64' }) addr: string
        ) {
            return addr;
        } */

        #macsep: string;

        @ValidateAccessor<string>()
        @IsMACAddress({ no_separators: true })
        set macsep(nd: string) { this.#macsep = nd; }
        get macsep() { return this.#macsep; }

        @ValidateParams
        checkMACSEP(
            @IsMACAddress({ no_separators: true }) addr: string
        ) {
            return addr;
        }

        #macsep48: string;

        @ValidateAccessor<string>()
        @IsMACAddress({ no_separators: true, eui: '48' })
        set macsep48(nd: string) { this.#macsep48 = nd; }
        get macsep48() { return this.#macsep48; }

        @ValidateParams
        checkMACSEP48(
            @IsMACAddress({ no_separators: true, eui: '48' }) addr: string
        ) {
            return addr;
        }

        /* #macsep64: string;

        @ValidateAccessor<string>()
        @IsMACAddress({ no_separators: true, eui: '64' })
        set macsep64(nd: string) { this.#macsep64 = nd; }
        get macsep64() { return this.#macsep64; }

        @ValidateParams
        checkMACSEP64(
            @IsMACAddress({ no_separators: true, eui: '64' }) addr: string
        ) {
            return addr;
        } */

    }

    const mae = new MACAddressExample();

    const valid = [
        'ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:ab',
        '01:AB:03:04:05:06',
        'A9 C5 D4 9F EB D3',
        '01 02 03 04 05 ab',
        '01-02-03-04-05-ab',
        '0102.0304.05ab',
        // These caused failures
        // 'ab:ab:ab:ab:ab:ab:ab:ab',
        // 'FF:FF:FF:FF:FF:FF:FF:FF',
        // '01:02:03:04:05:06:07:ab',
        // '01:AB:03:04:05:06:07:08',
        // 'A9 C5 D4 9F EB D3 B6 65',
        // '01 02 03 04 05 06 07 ab',
        // '01-02-03-04-05-06-07-ab',
        // '0102.0304.0506.07ab',
    ];
    const invalid = [
        'abc',
        '01:02:03:04:05',
        '01:02:03:04:05:z0',
        '01:02:03:04::ab',
        '1:2:3:4:5:6',
        'AB:CD:EF:GH:01:02',
        'A9C5 D4 9F EB D3',
        '01-02 03:04 05 ab',
        '0102.03:04.05ab',
        '900f/dffs/sdea',
        '01:02:03:04:05:06:07',
        '01:02:03:04:05:06:07:z0',
        '01:02:03:04:05:06::ab',
        '1:2:3:4:5:6:7:8',
        'AB:CD:EF:GH:01:02:03:04',
        'A9C5 D4 9F EB D3 B6 65',
        '01-02 03:04 05 06 07 ab',
        '0102.03:04.0506.07ab',
        '900f/dffs/sdea/54gh',
    ];

    it('should validate correct MAC accessors', function() {
        for (const v of valid) {
            mae.mac = v;
            assert.equal(v, mae.mac);
        }
    });

    it('should validate correct MAC parameters', function() {
        for (const v of valid) {
            const result = mae.checkMAC(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid MAC accessors', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                mae.mac = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid MAC parameters', function() {

        for (const iv of invalid) {
            let failed = false;
            try {
                const result = mae.checkMAC(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const valid48 = [
        'ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:ab',
        '01:AB:03:04:05:06',
        'A9 C5 D4 9F EB D3',
        '01 02 03 04 05 ab',
        '01-02-03-04-05-ab',
        '0102.0304.05ab',
    ];
    const invalid48 = [
        'ab:ab:ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:06:07:ab',
        '01:AB:03:04:05:06:07:08',
        'A9 C5 D4 9F EB D3 B6 65',
        '01 02 03 04 05 06 07 ab',
        '01-02-03-04-05-06-07-ab',
        '0102.0304.0506.07ab',
    ];

    it('should validate correct MAC 48 accessors', function() {
        for (const v of valid48) {
            mae.mac48 = v;
            assert.equal(v, mae.mac48);
        }
    });

    it('should validate correct MAC 48 parameters', function() {
        for (const v of valid48) {
            const result = mae.checkMAC48(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid MAC 48 accessors', function() {

        for (const iv of invalid48) {
            let failed = false;
            try {
                mae.mac48 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid MAC 48 parameters', function() {

        for (const iv of invalid48) {
            let failed = false;
            try {
                const result = mae.checkMAC48(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    /* const valid64 = [
        'ab:ab:ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:06:07:ab',
        '01:AB:03:04:05:06:07:08',
        'A9 C5 D4 9F EB D3 B6 65',
        '01 02 03 04 05 06 07 ab',
        '01-02-03-04-05-06-07-ab',
        '0102.0304.0506.07ab',
    ];
    const invalid64 = [
        'ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:ab',
        '01:AB:03:04:05:06',
        'A9 C5 D4 9F EB D3',
        '01 02 03 04 05 ab',
        '01-02-03-04-05-ab',
        '0102.0304.05ab',
    ];


    it('should validate correct MAC 64 accessors', function() {
        for (const v of valid64) {
            mae.mac64 = v;
            assert.equal(v, mae.mac64);
        }
    });

    it('should validate correct MAC 64 parameters', function() {
        for (const v of valid64) {
            const result = mae.checkMAC64(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid MAC 64 accessors', function() {

        for (const iv of invalid64) {
            let failed = false;
            try {
                mae.mac64 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid MAC 64 parameters', function() {

        for (const iv of invalid64) {
            let failed = false;
            try {
                const result = mae.checkMAC64(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    }); */

    const validSEP = [
        'abababababab',
        'FFFFFFFFFFFF',
        '0102030405ab',
        '01AB03040506',
        // 'abababababababab',
        // 'FFFFFFFFFFFFFFFF',
        // '01020304050607ab',
        // '01AB030405060708',
    ];
    const invalidSEP = [
        'abc',
        '01:02:03:04:05',
        '01:02:03:04::ab',
        '1:2:3:4:5:6',
        'AB:CD:EF:GH:01:02',
        'ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:ab',
        '01:AB:03:04:05:06',
        '0102030405',
        '01020304ab',
        '123456',
        'ABCDEFGH0102',
        '01:02:03:04:05:06:07',
        '01:02:03:04:05:06::ab',
        '1:2:3:4:5:6:7:8',
        'AB:CD:EF:GH:01:02:03:04',
        'ab:ab:ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:06:07:ab',
        '01:AB:03:04:05:06:07:08',
        '01020304050607',
        '010203040506ab',
        '12345678',
        'ABCDEFGH01020304',
    ];

    it('should validate correct MAC SEP accessors', function() {
        for (const v of validSEP) {
            mae.macsep = v;
            assert.equal(v, mae.macsep);
        }
    });

    it('should validate correct MAC SEP parameters', function() {
        for (const v of validSEP) {
            const result = mae.checkMACSEP(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid MAC SEP accessors', function() {

        for (const iv of invalidSEP) {
            let failed = false;
            try {
                mae.macsep = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid MAC SEP parameters', function() {

        for (const iv of invalidSEP) {
            let failed = false;
            try {
                const result = mae.checkMACSEP(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    const validSEP48 = [
        'abababababab',
        'FFFFFFFFFFFF',
        '0102030405ab',
        '01AB03040506',
    ];
    const invalidSEP48 = [
        'abababababababab',
        'FFFFFFFFFFFFFFFF',
        '01020304050607ab',
        '01AB030405060708',
    ];

    it('should validate correct MAC SEP 48 accessors', function() {
        for (const v of validSEP48) {
            mae.macsep48 = v;
            assert.equal(v, mae.macsep48);
        }
    });

    it('should validate correct MAC SEP 48 parameters', function() {
        for (const v of validSEP48) {
            const result = mae.checkMACSEP48(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid MAC SEP 48 accessors', function() {

        for (const iv of invalidSEP48) {
            let failed = false;
            try {
                mae.macsep48 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid MAC SEP 48 parameters', function() {

        for (const iv of invalidSEP48) {
            let failed = false;
            try {
                const result = mae.checkMACSEP48(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    /* const validSEP64 = [
        'abababababababab',
        'FFFFFFFFFFFFFFFF',
        '01020304050607ab',
        '01AB030405060708',
    ];
    const invalidSEP64 = [
        'abababababab',
        'FFFFFFFFFFFF',
        '0102030405ab',
        '01AB03040506',
    ];

    it('should validate correct MAC SEP 64 accessors', function() {
        for (const v of validSEP64) {
            mae.macsep64 = v;
            assert.equal(v, mae.macsep64);
        }
    });

    it('should validate correct MAC SEP 64 parameters', function() {
        for (const v of validSEP64) {
            const result = mae.checkMACSEP64(v);
            assert.equal(v, result);
        }
    });

    it('Should reject invalid MAC SEP 64 accessors', function() {

        for (const iv of invalidSEP64) {
            let failed = false;
            try {
                mae.macsep64 = iv;
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    });

    it('Should reject invalid MAC SEP 64 parameters', function() {

        for (const iv of invalidSEP64) {
            let failed = false;
            try {
                const result = mae.checkMACSEP64(iv);
            } catch (e) { failed = true; }
            assert.equal(failed, true);
        }
    }); */

});
