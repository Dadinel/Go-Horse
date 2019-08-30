import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Coverage } from './coverage.entity';

@Table( {tableName: 'testcaseLinesCoverage'} )
export class CoverageLines extends Model<CoverageLines> {
    @PrimaryKey
    @ForeignKey(() => Coverage)
    @Column
    public id: string;

    @PrimaryKey
    @ForeignKey(() => Coverage)
    @Column
    public source: string;

    @PrimaryKey
    @Column
    public line: number;

    @BelongsTo(() => Coverage)
    coverage: Coverage;

    public setCoverage(coverage: Coverage, line: number): void {
        this.id = coverage.id;
        this.source = coverage.source;
        this.coverage = coverage;
        this.line = line;
    }
}
