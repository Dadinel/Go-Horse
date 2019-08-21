import { TestCase } from "../model/TestCase";
import * as commander from "commander";
import { ClientRequest, request, IncomingMessage } from "http";

export function postTestCases(testCases: TestCase[], type: string, commands: commander.CommanderStatic) {
    return new Promise( (resolve, reject) => {
        try {
            const post: ClientRequest = request( { host: commands.url, path: commands.path + type,
                method: "POST", port: commands.port,
                headers: { "Content-Type" : "application/json" } }
            , (response: IncomingMessage) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve();
                } else {
                    reject();
                }
            });

            post.write(JSON.stringify(testCases), "utf-8");
            post.end();
        } catch {
            reject();
        }
    });
}