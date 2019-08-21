import { TestCase } from "../model/TestCase";
import { getTestsByType } from "../directory/get.testcase.type";
import * as path from "path";

export function getAllTestCases(type: string, dir: string, id: string): TestCase[] {
    let testCases: TestCase[] = [];

    testCases = testCases.concat(getTestsByType(dir + type + path.sep, type, id));

    return testCases;
}
