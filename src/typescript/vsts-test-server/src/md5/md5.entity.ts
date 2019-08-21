export class MD5 {
    public md5: string;
    public source: string;

    constructor(source: string, md5: string) {
        this.source = source;
        this.md5 = md5;
    }
}
