import { exec, ExecException } from 'child_process';
import { execSync} from 'child_process';

export function executeProcess(commandToExec: string): string {
    let executing: boolean;
    let stdReturn: string;

    executing = true;
    stdReturn = "";

    let stdBytes: Buffer;

    try {
        stdBytes = execSync(commandToExec);

        if(stdBytes) {
            stdReturn = stdBytes.toString();
        }
    }
    catch(err) {
        stdReturn = err.message;
    }

    return stdReturn;
}