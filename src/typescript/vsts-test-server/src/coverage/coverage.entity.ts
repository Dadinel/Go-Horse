import { Table, Column, Model } from 'sequelize-typescript';

@Table( {tableName: 'coverageSources'} )
export class Coverage extends Model<Coverage> {
    @Column
    public source: string;

    @Column
    public md5: string;

    @Column
    public directory: string;

    @Column
    public lines: number[];

    @Column
    public coverageTime: number;
}
