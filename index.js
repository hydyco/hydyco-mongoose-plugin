"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@hydyco/core");
var plugin_1 = require("./plugin");
var server = new core_1.HydycoServer();
server.registerPlugins([plugin_1.default]);
server.start();
//# sourceMappingURL=index.js.map