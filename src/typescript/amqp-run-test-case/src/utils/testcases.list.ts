import * as fs from 'fs';
import * as path from 'path';
import * as testCasesPath from '../config/testcase.path';

function readDir(dir: string, filelist: string[]): string[] {
    let files: string[]

    files = fs.readdirSync(dir);

    files.forEach( function(file: string) {
        let fullFileName: string;

        fullFileName = path.join(dir, file);

        if (fs.statSync(fullFileName).isDirectory()) {
            filelist = readDir(fullFileName, filelist);
        }
        else {
            if (fullFileName.toUpperCase().indexOf('.PR') > 0) {
                filelist.push(fullFileName);
            }
        }
    });
    return filelist;
}

export function getAllTestCases(dir?: string): string[] {
    let filesTestCases: string[];

    dir = dir || testCasesPath.pathTestCases;
    filesTestCases = readDir(dir, []);

    let testCases: string[];

    testCases = filesTestCases.map( function(file: string) {
        let testCase: string;
        let extname: string;

        extname = path.extname(file);
        testCase = path.basename(file);
        testCase = testCase.replace(extname, '');
        return testCase;
    });

    return testCases;
}