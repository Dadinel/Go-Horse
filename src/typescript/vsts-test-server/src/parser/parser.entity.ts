import { Table, Column, Model, HasMany, PrimaryKey} from 'sequelize-typescript';
import { ParserLines } from './lines.entity';

@Table( {tableName: 'parsedSources'} )
export class Parser extends Model<Parser> {
    @PrimaryKey
    @Column
    public id: string;

    @PrimaryKey
    @Column
    public source: string;

    @PrimaryKey
    @Column
    public md5: string;

    @Column
    public directory: string;

    @HasMany(() => ParserLines)
    public lines: ParserLines[];

    @Column
    public parserTime: number;
}
