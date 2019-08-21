import { amqpFactory } from '../amqp/factory/amqp.factory';
import { Amqp } from '../amqp/class/Amqp';
import { putDataOnExchange } from '../amqp/util/amqp.exchange.write';
import { TestCase } from '../model/TestCase';

let portAmqp: number;
let urlAmqp: string;

export async function createTestCaseExchange(url: string, port: number): Promise<void> {
    const amqp: Amqp = await amqpFactory(url, port);
    const exchangeName: string = 'testcase';

    amqp.channel.assertExchange(exchangeName, 'direct', {durable: false});

    portAmqp = port;
    urlAmqp = url;
}

export async function putTestCaseOnExchange(exchange: string, type: string, key: string, data: TestCase[]) {

    if (!urlAmqp || !portAmqp) {
        throw new Error('A função createTestCaseExchange deve ser chamada antes da putTestCaseOnExchange');
    }

    putDataOnExchange(urlAmqp, portAmqp, exchange, type, key, data);
}
