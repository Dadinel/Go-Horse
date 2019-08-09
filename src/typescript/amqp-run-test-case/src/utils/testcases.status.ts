import { TestCase } from "../class/TestCase";
import { TestCaseStatus } from "../class/TestCaseStatus";

let testCasesStatus: TestCaseStatus;

export function setTestCases(testCases: TestCase[]): void {
    testCasesStatus = new TestCaseStatus(testCases);
}

export function getTestCases(): TestCase[] {
    return testCasesStatus.testCases;
}

export function getTestsStatus(): TestCaseStatus {
    return testCasesStatus;
}