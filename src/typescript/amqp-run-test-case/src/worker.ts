import { workQueue } from './queues/amqp.work';
//import { workQueue } from './queues/totvs.work';
import { getDefaultParam } from  './utils/param.default';
import { config } from './config/amqp.config';

//workQueue(getDefaultParam(2), getDefaultParam(3, config.withServer));

workQueue(getDefaultParam(2, '1'), getDefaultParam(3, config.withEnvironemt));