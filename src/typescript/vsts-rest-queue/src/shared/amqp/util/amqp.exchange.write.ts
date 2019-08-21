import { amqpFactory } from '../factory/amqp.factory';
import { Amqp } from '../class/Amqp';
import { Replies } from 'amqplib';
import { TestCase } from '../../model/TestCase';

export async function putDataOnExchange(url: string, port: number, exchange: string, type: string, key: string, data: TestCase[]): Promise<void> {
    const amqp: Amqp = await amqpFactory(url, port);

    amqp.channel.assertExchange(exchange, type, {durable: false});

    const okQueue: Replies.AssertQueue = await amqp.createQueue(key, {exclusive: false, durable: false});

    amqp.channel.bindQueue(okQueue.queue, exchange, key);

    for (const simgleData of data) {
        amqp.channel.publish(exchange, key, Buffer.from(JSON.stringify(simgleData)));
    }

    setTimeout(amqp.closeConnection.bind(amqp), 5000);
}
