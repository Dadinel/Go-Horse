import { workQueue } from './queues/work.queue';

let id: string;

if(process.argv.length >= 2) {
    id = process.argv[2];
    console.log(id);
}
else {
    id = "1";
}

workQueue(parseInt(id));