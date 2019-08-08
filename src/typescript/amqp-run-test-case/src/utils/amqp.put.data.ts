import { config } from "../config/amqp.config";
import { amqpFactory } from "../factory/amqp.factory";
import { Amqp } from "../class/Amqp";
import { Replies } from "amqplib";

export async function putDataOnExchange(exchange: string, type: string, key: string, data: string[]): Promise<void> {
    const amqp: Amqp = await amqpFactory(config.fullAddress);

    amqp.channel.assertExchange(exchange, type, {durable: false});

    const okQueue: Replies.AssertQueue = await amqp.createQueue(exchange, {exclusive: false, durable: false});

    amqp.channel.bindQueue(okQueue.queue, exchange, key);

    for (const simgleData of data) {
        amqp.channel.publish(exchange, key, Buffer.from(simgleData));
    }

    setTimeout(amqp.closeConnection.bind(amqp), 5000);
}