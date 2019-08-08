import { workQueue } from "./queues/amqp.work";
import { getDefaultParam } from "./utils/param.default";
import { Types } from "./enum/Types";

workQueue(getDefaultParam(2, "1"), getDefaultParam(3, Types.environment));