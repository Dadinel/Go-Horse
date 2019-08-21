import * as commander from 'commander';
import { CommanderStatic } from 'commander';

function prepareCommander(command: CommanderStatic) {
    command
        .version('0.0.1', '-v --version', 'Exibe a versão da aplicação')
        .option('-a, --address <string>', 'Endereço do AMQP')
        .option('-p, --port <number>', 'Porta do AMQP', 5672)
        .option('-r, --rest <number>', 'Porta do REST', 3101)
        .parse(process.argv);
}

function validArguments(command: CommanderStatic) {
    command.address = 'localhost';

    if (!command.address) {
        throw new Error('É obrigatório informar o endereço do AMQP');
    }

    return true;
}

export function commands(): CommanderStatic {
    prepareCommander(commander);

    if (validArguments(commander)) {
        return commander;
    }
}
