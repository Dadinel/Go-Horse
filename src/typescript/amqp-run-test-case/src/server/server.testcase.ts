import { controllerTestCase } from "../utils/controller.testcase";
import { getTestsStatus } from "../utils/testcases.status";

export default function postTestCase(req: any, resp: any) {
    resp.sendStatus(200);
    gameOver(req);
}

async function gameOver(req: any): Promise<void> {
    if (req.body && req.body.tests && req.body.tests.classname) {
        getTestsStatus().setTested(req.body.tests.classname);

        if (getTestsStatus().finish()) {
            process.exit(0);
        }
    }
}