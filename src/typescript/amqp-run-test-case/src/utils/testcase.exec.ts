import { exec } from 'child_process';
import { ExecuteTestCase, ExecuteTestCaseFactory } from './ExecuteTestCaseOnContainer';

const containerName: string = 'co-stst';

export function runTestCase(testCase: string): Promise<string> {
    const command: string = "docker exec " + containerName + " " + testCase;

    return new Promise( function(resolve, reject) {
        exec("echo " + testCase, function(err, stdout, stderr) {
            if(err) {
                reject(err.message);
            }
    
            if(stdout) {
                resolve(stdout);
            } else if(stderr) {
                resolve(stderr)
            }
            else {
                resolve("");
            }
        });
    });
}