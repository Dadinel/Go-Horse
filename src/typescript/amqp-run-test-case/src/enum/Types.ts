export enum Types {
    server = "server",
    database = "database",
    integration = "integration",
    environment = "environment"
}

export type typeOfTestCase = keyof typeof Types;

export type typeOfDocker = keyof typeof Types;