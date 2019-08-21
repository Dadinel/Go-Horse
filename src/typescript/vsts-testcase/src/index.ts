import * as commander from "commander";
import { prepareCommander } from "./command/prepare.commander";
import { validArguments } from "./command/valid.arguments";
import { sendAllTypes } from "./testcase/send.types";

prepareCommander(commander);

if (validArguments(commander)) {
    sendAllTypes(commander);
}
