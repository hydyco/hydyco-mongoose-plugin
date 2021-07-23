"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoRoutes = exports.MongooseExpressRoutes = exports.MongooseExpress = exports.HydycoMongoose = exports.HydycoModel = void 0;
var parser_1 = require("./parser");
exports.HydycoModel = parser_1.default;
var plugin_1 = require("./plugin");
exports.HydycoMongoose = plugin_1.default;
var routes_1 = require("./routes");
exports.MongooseExpress = routes_1.default;
var core_1 = require("@hydyco/core");
var files = new core_1.HydycoFile().readAllMappingFiles();
var MongooseExpressRoutes = {};
exports.MongooseExpressRoutes = MongooseExpressRoutes;
// create mongoose model for every json file present in project
files.forEach(function (file) {
    MongooseExpressRoutes[file.name] = new routes_1.default(file.name).Routes();
});
/**
 * Get all mongoose express routes
 */
var HydycoRoutes = function (mongooseExpressRoutes) {
    if (mongooseExpressRoutes) {
        return Object.values(mongooseExpressRoutes);
    }
    return Object.values(MongooseExpressRoutes);
};
exports.HydycoRoutes = HydycoRoutes;
//# sourceMappingURL=index.js.map