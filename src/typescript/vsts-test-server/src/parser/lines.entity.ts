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
    @ForeignKey(() => Parser)
    @Column
    public md5: string;

    @PrimaryKey
    @Column
    public line: number;

    @BelongsTo(() => Parser)
    parser: Parser;
}
