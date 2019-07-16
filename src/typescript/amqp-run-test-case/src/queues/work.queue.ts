import * as amqp from "amqplib/callback_api";
import { config } from "../config/testcase.queue";
import { ExecuteTestCase, ExecuteTestCaseFactory } from "../utils/ExecuteTestCaseOnContainer";

export function workQueue(id: number = 0): void{
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
            let executorTestCase: ExecuteTestCase;

            queue = config.name;
            executorTestCase = ExecuteTestCaseFactory(id.toString());

            ch.assertQueue(queue, { durable: true});
            ch.prefetch(1);

            ch.consume(queue, function(msg) {

                if(msg) {
                    let testCase: string;

                    testCase = Buffer.from(msg.content).toString();

                    executorTestCase.testCase = testCase;

                    let jsonTestCase: string;

                    jsonTestCase = executorTestCase.executeTestCase();

                    ch.ack(msg);
                }

                //Se necessário fechar a conexão
                //conn.close();
            }, { noAck: false});
        });
    });
}