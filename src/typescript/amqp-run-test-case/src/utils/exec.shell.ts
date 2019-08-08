import { execSync } from "child_process";
import { logMessage } from "./log.message";

export function executeProcess(commandToExec: string): string {
    let stdReturn: string = "";

    try {
        logMessage(commandToExec);

        const stdBytes: Buffer = execSync(commandToExec, {timeout: 300000});

        if (stdBytes) {
            stdReturn = stdBytes.toString();
        }
    } catch (err) {
        stdReturn = err.message;
    }

    return stdReturn;
}