import { Injectable } from '@nestjs/common';
import { putTestCaseOnExchange } from '../shared/testcase/testcase.amqp';
import { TestCase } from '../shared/model/TestCase';
import { TypeTestCase } from '../shared/model/TypeTestCase';

@Injectable()
export class TestCaseService {
    private testCases: TypeTestCase[] = [];

    private async setTestCases(testCases: TestCase[], type: string) {
        testCases.forEach( (testCase: TestCase) => {
            this.testCases.push( new TypeTestCase(testCase, type) );
        });
    }

    async addTestCases(testCases: TestCase[], type: string) {
        await this.setTestCases(testCases, type);
        await putTestCaseOnExchange('testcase', 'direct', type, testCases);
    }

    async getTestCases(type: string): Promise<TestCase[]> {
        const testCasesType: TestCase[] =
            await this.testCases.filter( (testCase: TypeTestCase) => testCase.type === type).
                map((testCase: TypeTestCase) => testCase.testcase);
        return testCasesType;
    }
}
