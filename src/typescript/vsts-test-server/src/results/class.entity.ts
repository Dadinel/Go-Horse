import { Table, Column, Model, HasMany, PrimaryKey } from 'sequelize-typescript';
import { ClassTestMethods } from './method.entity';

@Table( {tableName: 'testcaseClass'} )
export class ClassTest extends Model<ClassTest> {
    @PrimaryKey
    @Column
    public id: string;

    @PrimaryKey
    @Column
    public source: string;

    @HasMany(() => ClassTestMethods)
    public methods: ClassTestMethods[];

    public async saveAll(): Promise<void> {
        await this.save();

        if (this.methods) {
            for (const method of this.methods) {
                await method.save();
            }
        }
    }
}
