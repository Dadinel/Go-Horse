import * as express from "express";
import * as bodyParser from "body-parser";

import { port } from "../config/server.config";

const server: any = express();

server.listen(port, () => {
});

server.use(express.json({limit: 100000 } ));

server.use(
    bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: "50mb",
        extended: true
    })
);

export default server;