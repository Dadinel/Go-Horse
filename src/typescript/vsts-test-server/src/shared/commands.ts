import * as commander from 'commander';
import { CommanderStatic } from 'commander';

function prepareCommander(command: CommanderStatic) {
    command
        .version('0.0.1', '-v --version', 'Exibe a versão da aplicação')
        .option('-r, --rest <number>', 'Porta do REST', 3202)
        .parse(process.argv);
}

export function commands(): CommanderStatic {
    prepareCommander(commander);
    return commander;
}
