import { workQueue } from './queues/work.queue';
import { writeOnQueue } from './queues/writer.queue';
import { getAllTestCases }  from './utils/testcases.list';
import { qtdThreads } from './config/testcase.worker';

let pathTestCase: any;

if(process.argv.length >= 3) {
    pathTestCase = process.argv[3];
}

writeOnQueue(getAllTestCases(pathTestCase));

for(let i=1; i <= qtdThreads; i++) {
    workQueue(i);
}