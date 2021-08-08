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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@hydyco/core");
var mongoose = __importStar(require("mongoose"));
var Model = /** @class */ (function () {
    function Model() {
        this._file = new core_1.HydycoFile();
    }
    /**
     * Create model from json data
     * @param {string} modelName
     * @param {map} jsonData
     *
     */
    Model.prototype.createModel = function (modelName, jsonData) {
        modelName = modelName.toLowerCase();
        this._file.writeMappingFile(modelName, jsonData);
        if (mongoose.models[modelName])
            delete mongoose.models[modelName];
    };
    /**
     * Get all model list
     */
    Model.prototype.getModelList = function () {
        var modelNames = this._file.readAllMappingFiles();
        return modelNames;
    };
    /**
     * Delete Model
     * @param {string} modelName
     */
    Model.prototype.deleteModel = function (modelName) {
        modelName = modelName.toLowerCase();
        this._file.deleteMappingFile(modelName);
        if (mongoose.models[modelName])
            delete mongoose.models[modelName];
    };
    return Model;
}());
exports.default = Model;
//# sourceMappingURL=index.js.map