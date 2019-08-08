import { ExecuteTestCase } from "./ExecuteTestCase";
import { Amqp } from "./Amqp";

export class Worker {
    private _exit: boolean = false;
    private _amqpExchange: Amqp;
    private _keyType: string;
    private _executorTestCase: ExecuteTestCase;

    get exit(): boolean {
        return this._exit;
    }

    set exit(exit: boolean) {
        this._exit = exit;
    }

    get amqpExchange(): Amqp {
        return this._amqpExchange;
    }

    set amqpExchange(amqpExchange: Amqp) {
        this._amqpExchange = amqpExchange;
    }

    get keyType(): string {
        return this._keyType;
    }

    set keyType(keyType: string) {
        this._keyType = keyType;
    }

    get executorTestCase(): ExecuteTestCase {
        return this._executorTestCase;
    }

    set executorTestCase(executorTestCase: ExecuteTestCase) {
        this._executorTestCase = executorTestCase;
    }
}