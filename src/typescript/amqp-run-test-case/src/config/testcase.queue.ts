function getAddress(): string {
    return "amqp://localhost";
}

function getPort(): string {
    return "5672";
}

function getFullAddress(): string {
    return getAddress() + ":" + getPort()
}

export const config = {
    queue: "TestCase",
    exchange: "TestCaseController",
    address: getAddress(),
    port: getPort(),
    consumeTime: 3e3,
    controllerTime: 8e3,
    fullAddress: getFullAddress()
}