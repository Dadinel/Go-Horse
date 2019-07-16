import * as util from 'util';
import { exec } from 'child_process';

export function runTestCase(testCase: string): Promise<string> {
    return new Promise( function(resolve, reject) {
        exec("echo " + testCase, function(err, stdout, stderr) {
            console.log(stdout);
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