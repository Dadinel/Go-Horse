import { Amqp } from "../class/Amqp";
import * as amqpAPI from "amqplib/callback_api";

export async function amqpFactory(url: string): Promise<Amqp> {
    return new Promise( (resolve, reject) => {
        const amqp: Amqp = new Amqp(url);

        amqp.connect()
            .then( async (connect: amqpAPI.Connection) => {
                await amqp.createChannel(connect);
            })
            .then(
                () => resolve(amqp)
            )
            .catch(
                (error: any) => reject( error )
            );
    });
}