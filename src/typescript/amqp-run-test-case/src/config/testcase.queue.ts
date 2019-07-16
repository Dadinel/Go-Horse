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
    name: "TestCase",
    address: getAddress(),
    port: getPort(),
    fullAddress: getFullAddress()
}