import { Table, Column, Model, HasMany, PrimaryKey } from 'sequelize-typescript';
import { CoverageLines } from './lines.entity';

@Table( {tableName: 'testcaseCoverage'} )
export class Coverage extends Model<Coverage> {
    @PrimaryKey
    @Column
    public id: string;

    @PrimaryKey
    @Column
    public source: string;

    @HasMany(() => CoverageLines)
    public lines: CoverageLines[];

    public async saveAll(): Promise<void> {
        await this.save();

        if (this.lines) {
            for (const line of this.lines) {
                await line.save();
            }
        }
    }
}
