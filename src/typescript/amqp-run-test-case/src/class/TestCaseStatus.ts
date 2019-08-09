import { TestCase } from "./TestCase";

export class TestCaseStatus {
    private _testCases: TestCase[];

    constructor(testCases: TestCase[]) {
        this._testCases = testCases;
    }

    get testCases(): TestCase[] {
        return this._testCases;
    }

    public setTested(testCaseName: string) {
        const testCaseUpdate: TestCase = this._testCases.find( (testcase: TestCase) => testcase.name === testCaseName);

        if (testCaseUpdate) {
            console.log("Testado:" + testCaseName);
            testCaseUpdate.tested = true;
        }
    }

    public finish(): boolean {
        return this._testCases.some( (testCase: TestCase) => !testCase.isTested );
    }
}