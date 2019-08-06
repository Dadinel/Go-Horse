import { ExecuteTestCase } from "../class/ExecuteTestCase";

export function ExecuteTestCaseFactory(idContainer: string, image: string): ExecuteTestCase {
    let executeTestCase: ExecuteTestCase;

    executeTestCase = new ExecuteTestCase(idContainer, image);
    executeTestCase.prepareContainer();

    return executeTestCase;
}