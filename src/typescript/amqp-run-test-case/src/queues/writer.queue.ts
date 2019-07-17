import * as amqp from "amqplib/callback_api";
import { config } from "../config/testcase.queue";
import { callWorkers } from "../utils/exec.workers";
import { logMessage } from "../utils/log.message";

export async function writeOnQueue(testCases?: string[]): Promise<void> {
    if (testCases) {
        amqp.connect(config.fullAddress, function(err1, conn) {
            if (err1) {
                console.error(err1);
                throw err1;
            }

            logMessage("amqp:connected");
            conn.createChannel(function(err2, ch) {
                if (err2) {
                    console.error(err2);
                    throw err2;
                }

                logMessage("channel:created");

                let queue: string;
                queue = config.name;

                //ch.purgeQueue(config.name);
                //ch.deleteQueue(queue);
                ch.assertQueue(queue, { durable: true });

                logMessage("queue:assert:"+queue);

                for(let i:number = 0; i < testCases.length; i++) {
                    ch.sendToQueue(queue, Buffer.from(testCases[i]), { persistent: true} );
                }

                callWorkers();
            });
        });
    }
    else {
        throw "Nenhum caso de teste encontrado";
    }
}