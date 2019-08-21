import * as amqp from 'amqplib/callback_api';
import { Replies } from 'amqplib/callback_api';

export class Amqp {
    private _connection: amqp.Connection;
    private _channel: amqp.Channel;
    private _url: string;
    private _port: string;

    constructor(url: string, port: number) {
        this._url = url;
        this._port = port.toString();
    }

    private getFullAddress(): string {
        return `amqp://${this._url}:${this._port}`;
    }

    public async connect(): Promise<amqp.Connection> {
        return new Promise( (resolve, reject) => {
            amqp.connect(this.getFullAddress(), (err: any, connection: amqp.Connection) => {
                if (err) {
                    reject(err);
                } else {
                    this._connection = connection;
                    resolve(connection);
                }
            });
        });
    }

    public async createChannel(connect?: amqp.Connection): Promise<amqp.Channel> {
        connect = connect || this._connection;

        return new Promise( (resolve, reject) => {
            connect.createChannel( (err: any, channel: amqp.Channel) => {
                if (err) {
                    reject(err);
                } else {
                    this._channel = channel;
                    resolve(channel);
                }
            });
        });
    }

    public async createQueue(queue: string, options?: any, channel?: amqp.Channel): Promise<Replies.AssertQueue> {
        channel = channel || this._channel;
        options = options || {};

        return new Promise( (resolve, reject) => {
            channel.assertQueue(queue, options, (err: any, ok: Replies.AssertQueue) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(ok);
                }
            });
        });
    }

    public async closeChannel(closeConnect: boolean = false): Promise<void> {
        if (this.hasChannel()) {
            return new Promise( (resolve, reject) => {
                this._channel.close( (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        this._channel = null;
                    }

                    if (closeConnect) {
                        resolve( this.closeConnection() );
                    } else {
                        resolve();
                    }
                });
            });
        }
    }

    public async closeConnection(): Promise<void> {
        if (this.isConnected()) {
            return new Promise( (resolve, reject) => {
                if (this.hasChannel()) {
                    resolve(this.closeChannel(true));
                } else {
                    try {
                        this._connection.close();
                    } catch {
                        //
                    }

                    this._connection = null;
                    resolve();
                }
            });
        }
    }

    public hasChannel(): boolean {
        return this._channel != null;
    }

    public isConnected(): boolean {
        return this._connection != null;
    }

    get connection(): amqp.Connection {
        return this._connection;
    }

    get channel(): amqp.Channel {
        return this._channel;
    }

}
