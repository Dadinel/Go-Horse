import { config } from "../config/amqp.config";
import { amqpFactory } from "../factory/amqp.factory";
import { Amqp } from "../class/Amqp";
import { Worker } from "../class/Worker";
import * as amqpAPI from "amqplib/callback_api";
import { Replies } from "amqplib";
import { putDataOnExchange } from "../utils/amqp.put.data";
import { executeTestCaseFactory } from "../factory/exectestcase.factory";

const woker: Worker = new Worker();

export async function workQueue(id: string, key: string): Promise<void> {
    const amqp: Amqp = await amqpFactory(config.fullAddress);

    amqp.channel.assertExchange(config.direct, "direct", {durable: false});

    const okQueue: Replies.AssertQueue = await amqp.createQueue(key, {exclusive: false, durable: false});

    woker.keyType = key;
    woker.amqpExchange = amqp;

    amqp.channel.bindQueue(okQueue.queue, config.direct, woker.keyType);
    woker.executorTestCase = executeTestCaseFactory(id, key);
    consume();
}

function consume(): any {
    if (woker.amqpExchange.hasChannel()) {
        woker.amqpExchange.channel.get(woker.keyType, {noAck: false}, onConsume );
    } else {
        finish();
    }
}

function onConsume(err: any, msg: any): void {
    if (err) {
        throw err;
    } else if (msg) {
        woker.executorTestCase.testCase = Buffer.from(msg.content).toString();
        console.log(Buffer.from(msg.content).toString());

        const jsonTestCase: string = woker.executorTestCase.runTestCase();

        try {
            console.log(JSON.parse(jsonTestCase));
        } catch {
            console.log(jsonTestCase);
        }

        woker.amqpExchange.channel.ack(msg);

        setTimeout( () => {
            consume();
            }
            , config.consumeTime
        );
    } else {
        if (!woker.exit) {
            controller();
            setTimeout(consume, config.controllerTime);
        } else {
            woker.amqpExchange.closeConnection();
            finish();
        }
    }
}

async function controller(): Promise<void> {
    const amqp: Amqp = await amqpFactory(config.fullAddress);

    amqp.channel.assertExchange(config.controller, "fanout", {durable: false});

    const okQueue = await amqp.createQueue(config.controller, {exclusive: false, durable: false});

    amqp.channel.bindQueue(okQueue.queue, config.controller, "");

    try {
        amqp.channel.consume(okQueue.queue, (msg: amqpAPI.Message) => {
                if (amqp.hasChannel) {
                    if (msg) {
                        woker.exit = Buffer.from(msg.content).toString() === config.ok;
                        console.log(Buffer.from(msg.content).toString());

                        if (woker.exit) {
                            putDataOnExchange(config.controller, "fanout", "", [config.ok]);
                        }
                    }

                    // amqp.channel.deleteQueue(ok.queue);
                    amqp.closeConnection();
                }
            }
            , {noAck: true}
        );
    } catch {}

    setTimeout( () => {
        try {
            // amqp.channel.deleteQueue(ok.queue);
            // amqp.channel.cancel(okQueue.queue);
            amqp.closeConnection();
        } catch {}
    }, 15000 );
}

function finish(): void {
    woker.executorTestCase.killContainer();
    process.exit(0);
}