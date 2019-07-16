import * as amqp from "amqplib/callback_api";
import { config } from "../config/testcase.queue";

export function writeOnQueue(testCases?: string[]): void {
    if (testCases) {
        amqp.connect(config.fullAddress, function(err, conn) {
            if (err) {
                console.error(err);
                throw err;
            }

            conn.createChannel(function(err, ch) {
                if (err) {
                    console.error(err);
                    throw err;
                }

                let queue: string;
                queue = config.name;

                //ch.purgeQueue(config.name);
                //ch.deleteQueue(queue);
                ch.assertQueue(queue, { durable: true});

                testCases.forEach( function(testCase: string) {
                    ch.sendToQueue(queue, Buffer.from(testCase), { persistent: true} );
                });
            });
        });
    }
    else {
        throw "Nenhum caso de teste encontrado";
    }
}