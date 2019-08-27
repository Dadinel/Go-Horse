import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Parser } from './parser.entity';

@Table( {tableName: 'parsedLinesSources'} )
export class ParserLines extends Model<ParserLines> {
    @PrimaryKey
    @ForeignKey(() => Parser)
    @Column
    public id: string;

    @PrimaryKey
    @ForeignKey(() => Parser)
    @Column
    public source: string;

    @PrimaryKey
    @Column
    public line: number;

    @BelongsTo(() => Parser)
    parser: Parser;

    public setParser(parser: Parser, line: number): void {
        this.id = parser.id;
        this.source = parser.source;
        this.parser = parser;
        this.line = line;
    }
}
