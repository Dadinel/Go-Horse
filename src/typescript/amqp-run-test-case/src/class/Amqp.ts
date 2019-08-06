import * as amqp from "amqplib/callback_api";

export class Amqp {
    private _connection: amqp.Connection;
    private _channel: amqp.Channel;
    private _url: string;
    private _makeChannel: boolean;

    constructor(url: string) {
        this._url = url;
    }

    async promiseConnect(): Promise<amqp.Connection> {
        return new Promise( (resolve, reject) => {
            amqp.connect(this._url, (err: any, connection: amqp.Connection) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }

    async promiseCreateChannel(connect: amqp.Connection): Promise<amqp.Channel> {
        return new Promise( (resolve, reject) => {
            connect.createChannel( (err: any, channel: amqp.Channel) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(channel);
                }
            });
        });
    }

    connect(): void {
        if(!this.isConnected()) {
            amqp.connect(this._url, (err: any, connection: amqp.Connection) => {
                if(err) {
                    console.error(err);
                    throw err;
                }

                // console.log("conectado");
                this._connection = connection;
            });
        }
    }

    createChannel(): void {
        if(this.isConnected()) {
            if(!this.hasChannel()) {
                this._makeChannel = true;

                this._connection.createChannel((err: any, channel: amqp.Channel) => {
                    if(err) {
                        console.error(err);
                        throw err;
                    }

                    // console.log("canal criado");
                    this._channel = channel;
                    this._makeChannel = false;
                });
            }
        }
        else {
            if(!this._makeChannel) {
                setTimeout(this.createChannel.bind(this), 1500);
            }
        }
    }

    hasChannel(): boolean {
        return this._channel != null;
    }

    isConnected(): boolean {
        return this._connection != null;
    }

    closeChannel(closeConnect: boolean = false): void {
        if(this.hasChannel()) {
            this._channel.close( (err) => {
                if(err) {
                    console.error(err);
                    throw err;
                }

                this._channel = null;
                if(closeConnect) {
                    this._connection.close();
                }
            });
        }
    }

    closeConnection(): void {
        if(this.isConnected()) {
            if(this.hasChannel()) {
                this.closeChannel(true);
            }
            else {
                this._connection.close();
                this._connection = null;
            }
        }
    }

    get connection(): amqp.Connection {
        return this._connection;
    }

    get channel(): amqp.Channel {
        return this._channel;
    }

}