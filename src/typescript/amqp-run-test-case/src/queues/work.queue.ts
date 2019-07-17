import * as amqp from "amqplib/callback_api";
import { config } from "../config/testcase.queue";
import { ExecuteTestCase, ExecuteTestCaseFactory } from "../utils/ExecuteTestCaseOnContainer";
import { logMessage } from "../utils/log.message";

export async function workQueue(id: number = 0): Promise<void>{
    amqp.connect(config.fullAddress, function(err1, conn) {
        if (err1) {
            console.error(err1);
            throw err1;
        }

        conn.createChannel(function(err2, ch) {
            if (err2) {
                console.error(err2);
                throw err2;
            }

            let queue: string;
            let executorTestCase: ExecuteTestCase;

            queue = config.name;
            executorTestCase = ExecuteTestCaseFactory(id.toString());

            logMessage("queue:reading:"+queue);
            ch.assertQueue(queue, { durable: true });
            ch.prefetch(1);
            logMessage("queue:working:"+queue+":"+id.toString());

            ch.consume(queue, function(msg) {
                logMessage("queue:consume");

                if(msg) {
                    let testCase: string;

                    testCase = Buffer.from(msg.content).toString();
                    logMessage(testCase);

                    executorTestCase.testCase = testCase;

                    let jsonTestCase: string;

                    jsonTestCase = executorTestCase.runTestCase();

                    logMessage(JSON.parse(jsonTestCase));
                    ch.ack(msg);
                }

                //Se necessário fechar a conexão
                //conn.close();
            }, { noAck: false});
        });
    });
}