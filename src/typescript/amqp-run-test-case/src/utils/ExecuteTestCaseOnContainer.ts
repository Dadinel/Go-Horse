import { exec } from 'child_process';

export class ExecuteTestCase {
    private containerName: string;
    private readonly stdoutKillerAll: string = '\nValidating the parameters...\n';
    private _testCase: string = "";

    constructor(containerName: string) {
        this.containerName = 'co-stst' + containerName;
    }

    set testCase(testCase: string) {
        this._testCase = testCase;
    }

    get testCase(): string {
        return this._testCase;
    }

    public stopContainer(): void {
        exec('docker stop ' + this.containerName);
    }

    public prepareContainer(): void {
        this.stopContainer();
        exec('docker container rm ' + this.containerName);
        exec('docker run -d --name ' + this.containerName + ' lib-tst');
        exec('docker exec ' + this.containerName + ' /usr/local/applyPatch.sh');
        exec('docker exec ' + this.containerName + ' /usr/local/compTests.sh');
    }
    
    public executeTestCase(): Promise<string> {
        return new Promise( (resolve, reject) => {
            exec("docker exec " + this.containerName + " " + this._testCase, function(err, stdout, stderr) {
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
}

export function ExecuteTestCaseFactory(idContainer: string): ExecuteTestCase {
    let executeTestCase: ExecuteTestCase;

    executeTestCase = new ExecuteTestCase(idContainer);
    executeTestCase.prepareContainer();

    return executeTestCase;
}