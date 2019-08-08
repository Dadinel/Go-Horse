import { config } from "../config/amqp.config";
import { amqpFactory } from "../factory/amqp.factory";
import { Amqp } from "../class/Amqp";
import { TestCase } from "../class/TestCase";
import { putDataOnExchange } from "../utils/amqp.put.data";
import { Replies } from "amqplib";
import { controllerTestCase } from "../utils/controller.testcase";
import { Types, typeOfTestCase } from "../enum/Types";

export async function putAllTestCases(testCases?: TestCase[]): Promise<void> {
    if (testCases) {
        const amqp = await amqpFactory(config.fullAddress);

        amqp.channel.assertExchange(config.direct, "direct", {durable: false});

        await assertBindQueue(amqp, Types.server);
        await assertBindQueue(amqp, Types.database);
        await assertBindQueue(amqp, Types.environment);

        await publishOnExchange(testCases, amqp);

        controllerTestCase.setFinish(true);
    } else {
        throw new Error("Nenhum caso de teste encontrado");
    }
}

async function assertBindQueue(amqp: Amqp, type: typeOfTestCase): Promise<void> {
    const okQueue: Replies.AssertQueue = await amqp.createQueue(type, {exclusive: false, durable: false});
    amqp.channel.bindQueue(okQueue.queue, config.direct, type);
}

async function publishOnExchange(testCases: TestCase[], amqp: Amqp): Promise<void> {
    for (const testCase of testCases) {
        amqp.channel.publish(config.direct, testCase.type, Buffer.from(testCase.name));
    }

    await putDataOnExchange(config.controller, "fanout", "", [config.ok]);
}