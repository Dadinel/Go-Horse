import { workQueue } from '../queues/work.queue';
import { qtdThreads } from '../config/testcase.worker';

export async function callWorkers(): Promise<void> {
    for( let i: number = 1; i <= qtdThreads; i++) {
        (async () => {   
            workQueue(i);
        }
        )()
    }
}