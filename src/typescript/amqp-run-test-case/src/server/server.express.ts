import * as express from "express";
import { port } from "../config/server.config";

const server: any = express();

server.listen(port, () => {
});

server.use(express.json());

export default server;