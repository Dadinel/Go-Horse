import * as fs from "fs";
import * as path from "path";
import * as testCasesPath from "../config/testcase.path";
import { TestCase } from "../class/TestCase";
import { typeOfTestCase, Types } from "../enum/Types";

function readDir(dir: string, filelist: string[]): string[] {
    const files: string[] = fs.readdirSync(dir);

    for (const file of files) {
        let fullFileName: string;

        fullFileName = path.join(dir, file);

        if (fs.statSync(fullFileName).isDirectory()) {
            filelist = readDir(fullFileName, filelist);
        } else {
            if (fullFileName.toUpperCase().indexOf(".PR") > 0) {
                filelist.push(fullFileName);
            }
        }
    }

    return filelist;
}

function getTestsByType(dir: string, type: typeOfTestCase): TestCase[] {
    return readDir(dir, []).map( (file: string) => {
        let testCase: string;
        let extname: string;

        extname = path.extname(file);
        testCase = path.basename(file);
        testCase = testCase.replace(extname, "");

        return new TestCase(testCase, type);
    });
}

export function getAllTestCases(type: typeOfTestCase, dir?: string): TestCase[] {
    dir = dir || testCasesPath.pathTestCases;

    let testCases: TestCase[] = [];

    testCases = testCases.concat(getTestsByType(dir + Types.server + path.sep, Types.server));
    testCases = testCases.concat(getTestsByType(dir + Types.database + path.sep, Types.database));
    testCases = testCases.concat(getTestsByType(dir + Types.environment + path.sep, Types.environment));

    return testCases;
}