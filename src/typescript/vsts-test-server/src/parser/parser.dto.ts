export class ParserDTO {
    public readonly id: string;
    public readonly source: string;
    public readonly md5: string;
    public readonly directory: string;
    public readonly lines: number[] = [];
    public readonly parserTime: number;
}
