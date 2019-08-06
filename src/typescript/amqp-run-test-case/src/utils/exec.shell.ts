import { execSync } from 'child_process';
import { logMessage } from './log.message';

export function executeProcess(commandToExec: string): string {
    let stdReturn: string;

    stdReturn = "";

    let stdBytes: Buffer;

    try {
        logMessage(commandToExec);
        stdBytes = execSync(commandToExec, {timeout: 300000});

        if(stdBytes) {
            stdReturn = stdBytes.toString();
        }
    }
    catch(err) {
        stdReturn = err.message;
    }

    return stdReturn;
}