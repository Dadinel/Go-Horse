import { Table, Column, Model, HasMany, PrimaryKey } from 'sequelize-typescript';
import { ParserLines } from './lines.entity';
import { ParserDTO } from './parser.dto';

@Table( {tableName: 'parsedSources'} )
export class Parser extends Model<Parser> {
    @PrimaryKey
    @Column
    public id: string;

    @PrimaryKey
    @Column
    public source: string;

    @Column
    public md5: string;

    @Column
    public directory: string;

    @HasMany(() => ParserLines)
    public lines: ParserLines[];

    @Column
    public parserTime: number;

    public setDTO(parser: ParserDTO): void {
        this.id = parser.id;
        this.source = parser.source.toLocaleUpperCase();
        this.md5 = parser.md5;
        this.directory = parser.directory;
        this.parserTime = parser.parserTime;
        this.setLines(parser.lines);
    }

    public setLines(lines: number[]): void {
        if (lines) {
            if (!this.lines) {
                this.lines = [];
            }

            for ( const line of lines) {
                const parserdLines = new ParserLines();
                parserdLines.setParser(this, line);
                this.lines.push(parserdLines);
            }
        }
    }

    public async saveAll(): Promise<void> {
        await this.save();

        if (this.lines) {
            for (const line of this.lines) {
                await line.save();
            }
        }
    }
}
