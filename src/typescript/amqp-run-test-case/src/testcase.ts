import { writeOnQueue } from './queues/writer.queue';
import { getAllTestCases }  from './utils/testcases.list';

let pathTestCase: any;

if(process.argv.length >= 2) {
    pathTestCase = process.argv[2];
}

// writeOnQueue(getAllTestCases(pathTestCase));

//Teste...
// writeOnQueue(["FWCloseAreaTestCase"]); //Envia apenas um...
writeOnQueue(["FWCloseAreaTestCase","FWGetAreaTestCase"]); //Envia apenas dois...
// writeOnQueue([getAllTestCases(pathTestCase)[1],getAllTestCases(pathTestCase)[2],getAllTestCases(pathTestCase)[3]]); //Envia apenas três...