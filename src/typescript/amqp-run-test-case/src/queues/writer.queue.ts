import * as amqp from "amqplib/callback_api";
import { config } from "../config/testcase.queue";
import { logMessage } from "../utils/log.message";
import { sleep } from "../utils/sleep";

export function writeOnQueue(testCases?: string[]): void {
    if (testCases) {
        amqp.connect(config.fullAddress, function(err1, conn) {
            if (err1) {
                console.error(err1);
                throw err1;
            }

            logMessage("amqp:connected:queue");

            conn.createChannel(function(err2, ch) {
                if (err2) {
                    console.error(err2);
                    throw err2;
                }

                logMessage("channel:created:queue");

                ch.assertQueue(config.queue, { durable: true });

                logMessage("queue:assert:"+config.queue);

                for(let i:number = 0; i < testCases.length; i++) {
                    ch.sendToQueue(config.queue, Buffer.from(testCases[i]), { persistent: true} );
                }

                sleep(4);
                logMessage("queue:messages:OK");
                createExchange();
            });
        });
    }
    else {
        throw "Nenhum caso de teste encontrado";
    }
}

function createExchange(): void {
    amqp.connect(config.fullAddress, function(err1: any, conn: amqp.Connection) {
        if (err1) {
            console.error(err1);
            throw err1;
        }

        logMessage("amqp:connected:exchange");

        conn.createChannel(function(err2: any, ch: amqp.Channel) {
            if (err2) {
                console.error(err2);
                throw err2;
            }

            logMessage("channel:created:exchange");

            ch.assertExchange(config.exchange, 'fanout', { durable: false });

            logMessage("exchange:assert:"+config.exchange);

            ch.publish(config.exchange, '', Buffer.from("OK"));
            logMessage("exchange:messages:OK");
        });
    });
}