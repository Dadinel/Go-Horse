import { Amqp } from "../class/Amqp";

export function getAmqpConnect(url: string, callback: (amqp: Amqp) => void) {
    let amqp: Amqp;

    amqp =  new Amqp(url);
    amqp.connect();
    amqp.createChannel();

    timeOutCallBack(amqp, callback);
}

function timeOutCallBack(amqp: Amqp, callback: (amqp: Amqp) => void) {
    if(amqp.hasChannel()) {
        callback(amqp);
    }
    else {
        setTimeout(timeOutCallBack, 1000, amqp, callback);
    }
}