import {
    ValidateAccessor, ValidateParams,
    IsURL,
    IsFQDN
} from 'runtime-data-validation';

class ImgRef {
    #src: URL;

    @ValidateAccessor<string>()
    @IsURL()
    set src(nurl: string) { this.#src = new URL(nurl); }
    get src() { return this.#src?.toString(); }

    url()  { return this.#src; }
    toString() { return this.#src?.toString(); }
    get protocol() { return this.#src?.protocol; }
    get pathname() { return this.#src?.pathname; }

    @ValidateAccessor<string>()
    @IsFQDN()
    set host(nh: string) { this.#src.host = nh; }
    get host() { return this.#src?.host; }
}

const ir = new ImgRef();

ir.src = 'https://example.com/logo.jpg';
console.log(ir.toString());
console.log(ir.url());

ir.host = 'foo.bar';
console.log(ir.toString());

// https://xn--diplomatic-qgb.ro/logo.jpg
ir.host = 'diplomatică.ro';
console.log(ir.toString());

// Error: Value 'diplomaticăîntrsurpriză' is not a fully qualified domain name
// ir.host = 'diplomaticăîntrsurpriză';
// console.log(ir.toString());
