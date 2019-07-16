import { exec } from 'child_process';

export class ExecuteTestCase {
    private containerName: string;
    private readonly stdoutKillerAll: string = '\nValidating the parameters...\n';
    private readonly sizeOfKillerAll: number = this.stdoutKillerAll.length;
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
    
    private removeStringFromJSON(json: string) : string {
        let indexOfKillerAll: number;

        indexOfKillerAll = json.indexOf(this.stdoutKillerAll);

        if(indexOfKillerAll > 0) {
            let sizeJson: number;
            sizeJson = json.length - 4; //Magic Number, quebra de linhas etc...
            json = json.substr(indexOfKillerAll + this.sizeOfKillerAll, sizeJson);
        }

        return json;
    }

    public executeTestCase(): Promise<string> {
        return new Promise( (resolve, reject) => {
            exec("docker exec " + this.containerName + " " + this._testCase, (err, stdout, stderr) => {
                if(err) {
                    reject(err.message);
                }
        
                if(stdout) {
                    resolve(this.removeStringFromJSON(stdout));
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