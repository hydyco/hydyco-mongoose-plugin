"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydycoQuery = exports.HydycoRoutes = exports.MongooseExpressRoutes = exports.MongooseExpress = exports.HydycoMongoose = exports.HydycoModel = void 0;
var parser_1 = __importDefault(require("./parser"));
exports.HydycoModel = parser_1.default;
var plugin_1 = __importDefault(require("./plugin"));
exports.HydycoMongoose = plugin_1.default;
var routes_1 = __importStar(require("./routes"));
exports.MongooseExpress = routes_1.default;
Object.defineProperty(exports, "HydycoQuery", { enumerable: true, get: function () { return routes_1.HydycoQuery; } });
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