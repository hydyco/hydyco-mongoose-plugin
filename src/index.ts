import { HydycoServer } from "@hydyco/core";
import MongoosePlugin from "./plugin";
const server = new HydycoServer();

server.registerPlugins([MongoosePlugin]);

server.start();
