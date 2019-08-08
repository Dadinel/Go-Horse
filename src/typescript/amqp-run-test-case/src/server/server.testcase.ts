import { controllerTestCase } from "../utils/controller.testcase";

export default function postTestCase(req: any, resp: any) {
    console.log(req.body);
    resp.sendStatus(200);
}