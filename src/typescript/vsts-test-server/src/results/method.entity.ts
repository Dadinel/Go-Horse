import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { ClassTest } from './class.entity';

@Table( {tableName: 'testcaseMethodsClass'} )
export class ClassTestMethods extends Model<ClassTestMethods> {
    @PrimaryKey
    @ForeignKey(() => ClassTest)
    @Column
    public id: string;

    @PrimaryKey
    @ForeignKey(() => ClassTest)
    @Column
    public source: string;

    @PrimaryKey
    @Column
    public method: string;

    @Column
    public success: boolean = false;

    @Column
    public message: string = '';

    @BelongsTo(() => ClassTest)
    classTest: ClassTest;

    public setClass(classTest: ClassTest, method: string, success: boolean, message: string = ''): void {
        this.id = classTest.id;
        this.source = classTest.source;
        this.classTest = classTest;
        this.method = method;

        if (success) {
            this.success = success;
        }

        if (message) {
            this.message = message;
        }
    }
}
