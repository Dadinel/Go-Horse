import { TestCase } from "../model/TestCase";
import * as path from "path";
import { readDir } from "./read.dir";

export function getTestsByType(dir: string, type: string, id: string): TestCase[] {
    return readDir(dir, []).map( (file: string) => {
        let testCase: string;
        let extname: string;

        extname = path.extname(file);
        testCase = path.basename(file);
        testCase = testCase.replace(extname, "");

        return new TestCase(testCase, id);
    });
}
