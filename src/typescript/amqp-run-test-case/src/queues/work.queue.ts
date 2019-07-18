import * as amqp from "amqplib/callback_api";
import { config } from "../config/testcase.queue";
import { ExecuteTestCase, ExecuteTestCaseFactory } from "../utils/ExecuteTestCaseOnContainer";
import { logMessage } from "../utils/log.message";
import { sleep } from "../utils/sleep";

let exit: boolean = false;

export function workQueue(id: number = 0): void {
    worker(id);
}

function worker(id: number): void {
    amqp.connect(config.fullAddress, function(err1: any, conn: amqp.Connection) {
        if (err1) {
            console.error(err1);
            throw err1;
        }

        conn.createChannel(function(err2, ch) {
            if (err2) {
                console.error(err2);
                throw err2;
            }

            let executorTestCase: ExecuteTestCase;

            executorTestCase = ExecuteTestCaseFactory(id.toString());

            logMessage("queue:reading:"+config.queue);
            ch.assertQueue(config.queue, { durable: true });
            ch.prefetch(1);
            logMessage("queue:working:"+config.queue+":"+id.toString());

            consume();

            function consume(): any {
                ch.get(config.queue, {}, onConsume )
            }

            function onConsume(err3: any, msg: any) {
                if(err3) {
                    console.error(err3);
                }
                else if(msg) {
                    logMessage("queue:message:receive");
                    ch.ack(msg);

                    let testCase: string;
        
                    testCase = Buffer.from(msg.content).toString();
                    logMessage(testCase);
        
                    executorTestCase.testCase = testCase;
        
                    let jsonTestCase: string;
        
                    jsonTestCase = executorTestCase.runTestCase();
        
                    try {
                        logMessage(JSON.parse(jsonTestCase));
                    }
                    catch{}

                    setTimeout(function() {
                        // ch.ack(msg); //Verificar se ao receber já é necessário aceitar...
                        consume();
                        }
                        , config.consumeTime
                    );
                }
                else {
                    logMessage("consume:No_Message");
                    controller();

                    ch.close(function(err4: any) {
                        if(err4) {
                            console.error(err4);
                        }

                        conn.close();

                        controller();

                        if(!exit) {
                            setTimeout(worker, config.controllerTime, id);
                        }
                        else {
                            logMessage("worker:die");
                            process.exit(0);
                        }
                    });
                }
            }
        });
    });
}

function controller(): void {
    amqp.connect(config.fullAddress, function(err1: any, conn: amqp.Connection) {
        if (err1) {
            console.error(err1);
            throw err1;
        }

        conn.createChannel(function(err2, chnl) {
            if(err2) {
                console.error(err2);
                throw err2;
            }

            chnl.assertExchange(config.exchange, 'fanout', {durable: false});

            chnl.assertQueue('', {exclusive: true}, function(err3, queue) {
                if(err3) {
                    console.error(err3);
                    throw err3;
                }

                logMessage("exchange:"+config.exchange);
                logMessage("queue:exchange:"+queue.queue);

                chnl.bindQueue(queue.queue, config.exchange, '');

                chnl.consume(queue.queue, function(msgCtrl) {
                        logMessage("exchange:message:receive")
                        
                        if(msgCtrl && msgCtrl.content) {
                            logMessage(msgCtrl.content);
                            exit = msgCtrl.content.toString() == "OK" || Buffer.from(msgCtrl.content).toString() == "OK";
                            console.log(exit);
                        }

                        chnl.close(function(err4) {
                            if(err4) {
                                console.error(err4);
                            }

                            conn.close();
                        });
                    }
                    , {noAck: true}
                );
            });

        });
    });
}