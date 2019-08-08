import { ExecuteTestCase } from "../class/ExecuteTestCase";

export function executeTestCaseFactory(idContainer: string, image: string): ExecuteTestCase {
    const executeTestCase: ExecuteTestCase = new ExecuteTestCase(idContainer, image);

    executeTestCase.prepareContainer();

    return executeTestCase;
}