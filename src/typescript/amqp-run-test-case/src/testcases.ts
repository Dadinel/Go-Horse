import { getAllTestCases } from "./utils/testcases.list";
import { putAllTestCases } from "./queues/amqp.testcase";
import server from "./server/server.express";
import postTestCase from "./server/server.testcase";
import { getTestCases, setTestCases } from "./utils/testcases.status";

let pathTestCase: any;

if (process.argv.length >= 2) {
    pathTestCase = process.argv[2];
}

server.post("/testcase", postTestCase);

setTestCases(getAllTestCases(pathTestCase));

putAllTestCases(getTestCases());