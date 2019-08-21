import * as path from "path";
import * as commander from "commander";

export function validArguments(commands: commander.CommanderStatic) {
    // commands.id = "master_69_13";
    // commands.directory = "/home/danielmendes/totvs/framework/AdvplFramework/test/tests";
    // commands.url = "localhost";

    if (!commands.id) {
        throw new Error("É obrigatório informar o id da build (--id)");
    }

    if (!commands.directory) {
        throw new Error("É obrigatório informar o directório (--directory)");
    }

    if (!commands.url) {
        throw new Error("É obrigatório informar a URL do REST (--url)]");
    }

    commands.directory = putSeparator(commands.directory, path.sep);
    commands.path = putSeparator(commands.path, "/");

    return true;
}

function putSeparator(address: string, sep: string) {
    if (address.substring(address.length - 1) !== sep) {
        return address + sep;
    }

    return address;
}
