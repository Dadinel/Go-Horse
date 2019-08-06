import { config } from "../config/amqp.config";
import { getAmqpConnect } from "../utils/amqp.channel";
import { Amqp } from "../class/Amqp";
import { Replies } from "amqplib";
import { putDataOnExchange } from "../utils/amqp.put.data";
import { ExecuteTestCase } from "../class/ExecuteTestCase";
import { ExecuteTestCaseFactory } from "../utils/exec.testcase.factory";

let exit: boolean = false;
//let queueName: string;
let amqpExchange: Amqp
let keyType: string;
let executorTestCase: ExecuteTestCase;

export function workQueue(id: string, key: string): void {
    getAmqpConnect(config.fullAddress, (amqp: Amqp) => {
        amqp.channel.assertExchange(config.direct, "direct", {durable: false});
        amqp.channel.assertQueue(key, {exclusive: false, durable: false}, function(err: any, ok: Replies.AssertQueue) {
            if(err) {
                console.error(err);
                throw err;
            }

            keyType = key;
            amqpExchange = amqp;

            amqp.channel.bindQueue(ok.queue, config.direct, keyType);
            executorTestCase = ExecuteTestCaseFactory(id, key);
            consume();
        });
    });
}

function consume(): any {
    try {
        if(amqpExchange.hasChannel()) {
            amqpExchange.channel.get(keyType, {noAck: false}, onConsume );
        }
        else {
            finish();
        }
    }
    catch(e) {
        console.log(e);
    }
}

function onConsume(err: any, msg: any) {
    if(err) {
        console.error(err);
        throw err;
    }
    else if(msg) {
        executorTestCase.testCase = Buffer.from(msg.content).toString();
        console.log(Buffer.from(msg.content).toString());

        let jsonTestCase: string = executorTestCase.runTestCase();

        try {
            console.log(JSON.parse(jsonTestCase));
        }
        catch {
            console.log(jsonTestCase);
        }

        amqpExchange.channel.ack(msg);

        setTimeout(function() {
            consume();
            }
            , config.consumeTime
        );
    }
    else {
        if(!exit) {
            controller();
        }

        amqpExchange.closeConnection();

        if(!exit) {
            setTimeout(consume, config.controllerTime);
        }
        else {
            finish();
        }
    }
}

function controller(): void {
    getAmqpConnect(config.fullAddress, (amqp: Amqp) => {
        amqp.channel.assertExchange(config.controller, "fanout", {durable: false});
        
        amqp.channel.assertQueue(config.controller, {exclusive: false, durable: false}, function(err: any, ok: Replies.AssertQueue) {
            if(err) {
                console.error(err);
                throw err;
            }

            amqp.channel.bindQueue(ok.queue, config.controller, "");

            amqp.channel.consume(ok.queue, function(msg) {                    
                    if(msg) {
                        exit = Buffer.from(msg.content).toString() == config.ok;
                        console.log(Buffer.from(msg.content).toString());

                        if(exit) {
                            putDataOnExchange(config.controller, "fanout", "", [config.ok]);
                        }
                    }

                    // amqp.channel.deleteQueue(ok.queue);
                    amqp.closeConnection();
                }
                , {noAck: true}
            );

            setTimeout( () => {
                try {
                    // amqp.channel.deleteQueue(ok.queue);
                    amqp.closeConnection();
                }
                catch{}
            }, 15000 );
        });        
    });
}

function finish() {
    executorTestCase.killContainer();
    process.exit(0);   
}