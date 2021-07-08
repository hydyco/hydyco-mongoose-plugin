"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseExpressRoutes = exports.MongooseExpress = exports.HydycoMongoose = exports.HydycoModel = void 0;
var core_1 = require("@hydyco/core");
var parser_1 = require("./parser");
exports.HydycoModel = parser_1.default;
var plugin_1 = require("./plugin");
exports.HydycoMongoose = plugin_1.default;
var routes_1 = require("./routes");
exports.MongooseExpress = routes_1.default;
var files = new core_1.HydycoFile().readAllMappingFiles();
var MongooseExpressRoutes = files.map(function (file) {
    return new routes_1.default(file.name).Routes();
});
exports.MongooseExpressRoutes = MongooseExpressRoutes;
//# sourceMappingURL=index.js.map