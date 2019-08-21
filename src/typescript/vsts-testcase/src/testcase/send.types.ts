import * as commander from "commander";
import { getTypes } from "./get.types";
import { postTestCases } from "./post.testcase";
import { getAllTestCases } from "./get.testcase";

export async function sendAllTypes(command: commander.CommanderStatic) {
    const types: string[] = getTypes();

    for (const type of types) {
        await postTestCases(getAllTestCases(type, command.directory, command.id), type, command);
    }
}
