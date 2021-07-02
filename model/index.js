"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@hydyco/core");
var mongoose = require("mongoose");
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