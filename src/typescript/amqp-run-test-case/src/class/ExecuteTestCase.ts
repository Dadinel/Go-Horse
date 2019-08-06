import { executeProcess } from "../utils/exec.shell";
import { sleep } from "../utils/sleep";
import { Base64 } from "js-base64";
import { port } from '../config/server.config';

export class ExecuteTestCase {
    private containerName: string;
    private readonly stdoutKillerAll: string = "\nValidating the parameters...\n";
    private readonly sizeOfKillerAll: number = this.stdoutKillerAll.length;
    private _testCase: string = "";
    private _ip: string = "localhost";

    constructor(private id: string, private image: string) {
        process.env.appserver_id = "serverId" + this.id;
        this.containerName = "serverId" + this.id;
    }

    set testCase(testCase: string) {
        this._testCase = testCase;
    }

    get testCase(): string {
        return this._testCase;
    }

    private stopContainer(): void {
        executeProcess("docker-compose -f ./src/docker/" + this.image + ".yml stop");
    }

    public killContainer(): void {
        this.stopContainer();
    }

    public prepareContainer(): void {
        this.stopContainer();
        this.dockerStart();
    }
    
    private removeStringFromJSON(json: string) : string {
        let indexOfKillerAll: number;

        indexOfKillerAll = json.indexOf(this.stdoutKillerAll);

        if(indexOfKillerAll > 0) {
            let sizeJson: number;
            sizeJson = json.length - ( indexOfKillerAll + this.sizeOfKillerAll + 4); //Magic Number, palavra END, quebra de linhas etc...
            json = json.substr(indexOfKillerAll + this.sizeOfKillerAll, sizeJson);
        }

        return json;
    }

    private dockerStart(): void {
        executeProcess("docker-compose -f ./src/docker/" + this.image + ".yml up -d --force-recreate");
        sleep(8);
        this._ip = executeProcess("docker inspect serverId1 | grep Gateway | awk '/Gateway/ {print $2}'");
        this._ip = this._ip.replace(/["]?[,]?/g, "").trim()
    }

    public runTestCase(): string {
        this.stopContainer();
        this.dockerStart();

        let jsonTestCase: string;

        jsonTestCase = executeProcess("docker exec " + this.containerName + " /usr/local/runTest.sh " + Base64.encode(this._testCase + "|" + "http://" + this._ip + ":" + port.toString() + "/testcase"));

        return this.removeStringFromJSON(jsonTestCase);
    }
}