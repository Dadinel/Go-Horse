import { request, ClientRequest, IncomingMessage } from "http";
import { port as serverPort } from "../config/server.config";

export class PostTestCase {
    public static async forceFinish(adress: string, testcase: string): Promise<void> {
        const fakeTestCase: any = { tests: { classname : testcase } };

        const post: ClientRequest = request( { host: adress, path: "/testcase",  method: "POST", port: serverPort,
            headers: { "Content-Type" : "application/json" } }
            , (response: IncomingMessage) => {
                if (response.statusCode !== 200) {
                    console.log(response.statusMessage);
                }
            }
        );

        post.write(JSON.stringify(fakeTestCase), "utf-8");
        post.end();
    }
}