import * as commander from "commander";

export function prepareCommander(commands: commander.CommanderStatic) {
    commands
        .version("0.0.1", "-v --version", "Exibe a versão da aplicação")
        .option("-i, --id <string>", "ID da build")
        .option("-d, --directory <string>", "Diretório dos casos de teste")
        .option("-u, --url <string>", "URL onde os casos de testes serão enviados (POST)")
        .option("-t, --path <string>", "Path para acesso a URL", "/testcase")
        .option("-p, --port <number>", "Porta para acesso a URL", 3000)
        .parse(process.argv);
}
