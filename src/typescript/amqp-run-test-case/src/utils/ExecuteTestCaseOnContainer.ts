import { executeProcess } from './exec.shell';

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
        executeProcess('docker stop ' + this.containerName);
    }

    public prepareContainer(): void {
        this.stopContainer();
        executeProcess('docker container rm ' + this.containerName);
        executeProcess('docker run -d --name ' + this.containerName + ' lib-tst');
        executeProcess('sleep 2'); //Foi a maneira que encontrei por enquanto...
        executeProcess('docker exec ' + this.containerName + ' /usr/local/applyPatch.sh');
        executeProcess('docker exec ' + this.containerName + ' /usr/local/compTests.sh');
    }
    
    private removeStringFromJSON(json: string) : string {
        let indexOfKillerAll: number;

        indexOfKillerAll = json.indexOf(this.stdoutKillerAll);

        if(indexOfKillerAll > 0) {
            let sizeJson: number;
            sizeJson = json.length - ( indexOfKillerAll + this.sizeOfKillerAll + 4); //Magic Number, quebra de linhas etc...
            json = json.substr(indexOfKillerAll + this.sizeOfKillerAll, sizeJson);
        }

        return json;
    }

    public executeTestCase(): string {
        this.stopContainer()
        executeProcess("docker start " + this.containerName);

        let jsonTestCase: string;

        jsonTestCase = executeProcess("docker exec " + this.containerName + " /usr/local/runTest.sh " + this._testCase);

        return this.removeStringFromJSON(jsonTestCase);
    }
}

export function ExecuteTestCaseFactory(idContainer: string): ExecuteTestCase {
    let executeTestCase: ExecuteTestCase;

    executeTestCase = new ExecuteTestCase(idContainer);
    executeTestCase.prepareContainer();

    return executeTestCase;
}