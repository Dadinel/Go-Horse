import * as amqp from "amqplib/callback_api";
import { config } from "./config/testcase.queue";
import { runTestCase } from "./utils/testcase.exec";

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

            let queue: string
            queue = config.name;

            ch.assertQueue(queue, { durable: true});
            ch.prefetch(1);

            ch.consume(queue, function(msg) {

                if(msg) {
                    let testCase: string;

                    testCase = Buffer.from(msg.content).toString();

                    runTestCase(testCase)
                        .then( function(result) {
                            ch.ack(msg);
                            console.log("O ID " + id.toString() + " testou o " + testCase);
                        })
                        .catch( function(error) {
                            console.error(error);
                        });
                    //ch.ack(msg);
                    //console.log(testCase);
                }

                //Se necessário fechar a conexão
                //conn.close();
            }, { noAck: false});
        });
    });
}