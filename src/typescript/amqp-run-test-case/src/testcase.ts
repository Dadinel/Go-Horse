import { getAllTestCases }  from './utils/testcases.list';
import { putAllTestCases } from './queues/amqp.testcase';
import server from './server/server.express';
import postTestCase from './server/server.testcase';

let pathTestCase: any;

if(process.argv.length >= 2) {
    pathTestCase = process.argv[2];
}

server.post("/testcase", postTestCase);

// putAllTestCases(getAllTestCases(pathTestCase));

// putAllTestCases(["FWCloseAreaTestCase"]); //Envia apenas um...

//Teste...
// putAllTestCases(["FWCloseAreaTestCase"]); //Envia apenas um...
// putAllTestCases(["FWCloseAreaTestCase","FWGetAreaTestCase"]); //Envia apenas dois...
// putAllTestCases([getAllTestCases(pathTestCase)[1],getAllTestCases(pathTestCase)[2],getAllTestCases(pathTestCase)[3]]); //Envia apenas três...
// putAllTestCases(["FWCloseAreaTestCase","FWGetAreaTestCase","RadTestCase","IsAlNumTestCase","I18NTestCase","GetCountryListTestCase","FwCountCharTestCase"]); //Somente testes sem ambiente

//putAllTestCases(["FWTemporaryTableTestCase", "FWAliasInDicTestCase"]);
//putAllTestCases(["FWCloseAreaTestCase","FWGetAreaTestCase","RadTestCase","IsAlNumTestCase","I18NTestCase","GetCountryListTestCase","FwCountCharTestCase","FWTemporaryTableTestCase", "FWAliasInDicTestCase"]);
