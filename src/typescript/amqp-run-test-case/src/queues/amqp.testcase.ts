import { config } from "../config/amqp.config";
import { getAmqpConnect } from "../utils/amqp.channel";
import { Amqp } from "../class/Amqp";
import { putDataOnExchange } from "../utils/amqp.put.data";
import { Replies } from "amqplib";

let binds: number = 0;

export function putAllTestCases(testCases?: string[]): void {
    if (testCases) {
        getAmqpConnect(config.fullAddress, (amqp: Amqp) => {
            let binds: number = 0;

            amqp.channel.assertExchange(config.direct, "direct", {durable: false});

            assertBindQueue(amqp, config.withDatabase);
            assertBindQueue(amqp, config.withServer);
            assertBindQueue(amqp, config.withEnvironemt);

            publishOnExchange(testCases, amqp);
        });
    }
    else {
        throw "Nenhum caso de teste encontrado";
    }
}

function assertBindQueue(amqp: Amqp, type: string) {
    amqp.channel.assertQueue(type, {exclusive: false, durable: false}, (err: any, ok: Replies.AssertQueue) => {
        if(err) {
            console.error(err);
            throw err;
        }

        amqp.channel.bindQueue(ok.queue, config.direct, type);
        binds++;
    });   
}

function publishOnExchange(testCases: Array<string>, amqp: Amqp) {
    if(binds == 3 ) {
        for(let i:number = 0; i < testCases.length; i++) {
            //Colocar a lógica de chave aqui...
            //let key: string = config.withServer; //Essa linha deve ser condicional
            let key: string = config.withEnvironemt; //Essa linha deve ser condicional
            amqp.channel.publish(config.direct, key, Buffer.from(testCases[i]));
        }

        putDataOnExchange(config.controller, "fanout", "", [config.ok]);
    }
    else {
        setTimeout( publishOnExchange, 1500, testCases, amqp);
    }
}