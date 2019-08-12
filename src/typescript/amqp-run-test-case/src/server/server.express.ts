import * as express from "express";
import * as bodyParser from "body-parser";

import { port } from "../config/server.config";

const server: any = express();
const maxSize: number = 999999999;

server.listen(port, () => {
});

server.use(express.json({limit: maxSize}));

server.use(
    bodyParser.urlencoded({
        parameterLimit: maxSize,
        limit: maxSize,
        extended: true
    })
);

export default server;