import { config } from "../config/amqp.config";
import { getAmqpConnect } from "./amqp.channel";
import { Amqp } from "../class/Amqp";
import { Replies } from "amqplib";

export function putDataOnExchange(exchange: string, type:string, key: string, data: Array<string>): void {
    getAmqpConnect(config.fullAddress, (amqp: Amqp) => {
        amqp.channel.assertExchange(exchange, type, {durable: false});

        amqp.channel.assertQueue(exchange, {exclusive: false, durable: false}, (err: any, ok: Replies.AssertQueue) => {
            amqp.channel.bindQueue(ok.queue, exchange, key);

            for(let i:number = 0; i < data.length; i++) {
                amqp.channel.publish(exchange, key, Buffer.from(data[i]));
            }
        });

        setTimeout(amqp.closeConnection.bind(amqp), 1500);
    });
}