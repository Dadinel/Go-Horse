import { executeProcess } from "../utils/exec.shell";
import { sleep } from "../utils/sleep";
import { Base64 } from "js-base64";
import { port } from "../config/server.config";
import { Images } from "../enum/Images";
import { ContainerName } from "../enum/ContainerName";
import { PostTestCase } from "../class/PostTestCase";

export class ExecuteTestCase {
    private containerName: string;
    private readonly stdoutKillerAll: string = "\nValidating the parameters...\n";
    private readonly sizeOfKillerAll: number = this.stdoutKillerAll.length;
    private _testCase: string;
    private _ip: string;

    constructor(private id: string, private compose: string) {
        const idContainer = this.compose + "0".repeat(3) + this.id;
        const serverId = Images.appserver + idContainer;

        process.env[this.compose + ContainerName.appserver] = serverId;
        process.env[this.compose + ContainerName.dbaccess] = Images.dbaccess + idContainer;
        process.env[this.compose + ContainerName.license] = Images.license + idContainer;
        process.env[this.compose + ContainerName.postgres] = Images.postgres + idContainer;

        this.containerName = serverId;
    }

    set testCase(testCase: string) {
        this._testCase = testCase;
    }

    private stopContainer(): void {
        executeProcess("docker-compose -f ./src/docker/" + this.compose + "/docker.compose.yml stop");
    }

    public killContainer(): void {
        this.stopContainer();
    }

    public prepareContainer(): void {
        this.stopContainer();
        this.dockerStart();
    }
    
    private removeStringFromJSON(json: string): string {
        const indexOfKillerAll: number = json.indexOf(this.stdoutKillerAll);

        if (indexOfKillerAll > 0) {
            // Magic Number, palavra END, quebra de linhas etc...
            const sizeJson: number = json.length - ( indexOfKillerAll + this.sizeOfKillerAll + 4);
            json = json.substr(indexOfKillerAll + this.sizeOfKillerAll, sizeJson);
        }

        return json;
    }

    private dockerStart(): void {
        executeProcess("docker-compose -f ./src/docker/" + this.compose + "/docker.compose.yml up -d --force-recreate");

        sleep(6);
        this._ip = executeProcess("docker inspect " + this.containerName +
            " | grep Gateway | awk '/Gateway/ {print $2}'");
        this._ip = this._ip.replace(/["]?[,]?/g, "").trim();
    }

    public runTestCase(): string {
        this.stopContainer();
        this.dockerStart();

        let jsonTestCase: string = executeProcess("docker exec " + this.containerName + " /usr/local/runTest.sh " +
            Base64.encode(this._testCase + "|" + "http://" + this._ip + ":" + port.toString() + "/testcase"));

        jsonTestCase = this.removeStringFromJSON(jsonTestCase);

        this.postFinisedTestCase(jsonTestCase);

        return jsonTestCase;
    }

    private async postFinisedTestCase(jsonTestCase: string): Promise<void> {
        let postResult: boolean = false;

        if (jsonTestCase.trim() === "") {
            postResult = true;
        } else {
            try {
                const parsedJsonTestCase = JSON.parse(jsonTestCase);
                postResult = !parsedJsonTestCase.ok;
            } catch { }
        }

        if (postResult) {
            PostTestCase.forceFinish(this._ip, this._testCase);
        }
    }
}