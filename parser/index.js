"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse json to mongoose schema object
 */
var core_1 = require("@hydyco/core");
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var HydycoModel = /** @class */ (function () {
    function HydycoModel(fileName, _helperModels) {
        if (_helperModels === void 0) { _helperModels = []; }
        this._helperModels = _helperModels;
        this._singleton = false;
        this._file = new core_1.HydycoFile();
        this._parser = new core_1.HydycoParser();
        if (!fileName)
            throw new Error("Model name is required");
        if (this._singleton)
            throw new Error("Class is already initialized");
        this._singleton = true;
        this._fileName = this._file.getFileName(fileName);
        this._schema = this.mongooseSchema();
    }
    HydycoModel.prototype.raw = function () {
        return this._getRawJson();
    };
    HydycoModel.prototype.rawSchema = function () {
        return this._getSchemaJson();
    };
    HydycoModel.prototype.parsedSchema = function () {
        return this._getSchemaParseData();
    };
    HydycoModel.prototype.mongooseSchema = function () {
        return this._getMongooseSchema();
    };
    HydycoModel.prototype.setMongooseSchema = function (schema) {
        this._schema = schema;
        this.updateMongooseModel();
    };
    HydycoModel.prototype.mongooseModel = function () {
        return this._getMongooseModel();
    };
    HydycoModel.prototype.helperModels = function () {
        return this._helperModels.map(function (model) { return new HydycoModel(model); });
    };
    HydycoModel.prototype._getRawJson = function () {
        return this._file.readMappingFile(this._fileName);
    };
    /**
     * Get Schema json from mapping file
     *
     */
    HydycoModel.prototype._getSchemaJson = function () {
        var jsonData = this._file.readMappingFile(this._fileName);
        return jsonData["schema"];
    };
    /**
     * Get Schema json from mapping file
     *
     */
    HydycoModel.prototype._getSchemaParseData = function () {
        var jsonData = this._getSchemaJson();
        jsonData = _sanitizeJsonData(jsonData);
        jsonData = _parseTypeData(jsonData);
        return jsonData;
    };
    /**
     * Get Mongoose Schema
     */
    HydycoModel.prototype._getMongooseSchema = function () {
        var jsonData = this._getSchemaParseData();
        var schema = new mongoose_1.Schema(jsonData);
        schema.plugin(function (schema) {
            var populates = Object.keys(schema.obj).filter(function (key) { return schema.obj[key].autopopulate; });
            // plugin to auto populate
            schema.pre("find", function () {
                this.populate(populates);
            });
            schema.pre("findOne", function () {
                this.populate(populates);
            });
            schema.pre("findById", function () {
                this.populate(populates);
            });
        });
        return schema;
    };
    /**
     * Get Mongoose Model
     */
    HydycoModel.prototype._getMongooseModel = function () {
        var modelName = this._parser.getModelName(this._fileName);
        if (mongoose.models[modelName]) {
            return mongoose.models[modelName];
        }
        return mongoose_1.model(modelName, this._schema);
    };
    /**
     * Update Mongoose model
     */
    HydycoModel.prototype.updateMongooseModel = function () {
        var modelName = this._parser.getModelName(this._fileName);
        if (mongoose.models[modelName]) {
            delete mongoose.models[modelName];
        }
        return mongoose_1.model(modelName, this._schema);
    };
    return HydycoModel;
}());
exports.default = HydycoModel;
/**
 * Remove unwanted data from json file
 * @param {Object} - Json data from json file
 * @return {Object} - sanitized json data
 */
var _sanitizeJsonData = function (jsonData) {
    Object.keys(jsonData).forEach(function (fieldKey) {
        Object.keys(jsonData[fieldKey]).forEach(function (fieldDataKey) {
            if (typeof jsonData[fieldKey][fieldDataKey] === "boolean" &&
                jsonData[fieldKey][fieldDataKey] === false) {
                delete jsonData[fieldKey][fieldDataKey];
            }
            if (typeof jsonData[fieldKey][fieldDataKey] == "string" &&
                jsonData[fieldKey][fieldDataKey].length === 0) {
                delete jsonData[fieldKey][fieldDataKey];
            }
            if (typeof jsonData[fieldKey][fieldDataKey] == "number" &&
                jsonData[fieldKey][fieldDataKey] === 0) {
                delete jsonData[fieldKey][fieldDataKey];
            }
            if (fieldDataKey === "enum" &&
                jsonData[fieldKey][fieldDataKey].length === 0) {
                delete jsonData[fieldKey][fieldDataKey];
            }
            if (fieldDataKey === "ref" &&
                jsonData[fieldKey][fieldDataKey] === "none") {
                delete jsonData[fieldKey]["relationship"];
                delete jsonData[fieldKey]["ref"];
                delete jsonData[fieldKey]["autopopulate"];
            }
            delete jsonData[fieldKey]["name"];
        });
    });
    return jsonData;
};
var _parseTypeData = function (jsonData) {
    var schemaJson = {};
    Object.keys(jsonData).forEach(function (fieldKey) {
        var fieldData = jsonData[fieldKey];
        switch (jsonData[fieldKey]["type"]) {
            case "string":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { type: _typeHandler("string") });
                break;
            case "boolean":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { type: _typeHandler("boolean") });
                break;
            case "number":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { type: _typeHandler("number") });
                break;
            case "boolean":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { type: _typeHandler("boolean") });
                break;
            case "date":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { type: _typeHandler("date") });
                break;
            case "ref":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { ref: getModelName(fieldData["ref"]), type: fieldData["relationship"] === "hasmany"
                        ? [_typeHandler("ref")]
                        : _typeHandler("ref") });
                delete schemaJson[fieldKey]["relationship"];
                break;
            case "file":
                schemaJson[fieldKey] = __assign(__assign({}, fieldData), { ref: getModelName(fieldData["ref"]), type: fieldData["relationship"] === "hasmany"
                        ? [_typeHandler("ref")]
                        : _typeHandler("ref") });
                delete schemaJson[fieldKey]["relationship"];
                break;
            default:
                throw new Error("Unable to parse type data for " + jsonData[fieldKey]["type"]);
        }
    });
    return schemaJson;
};
var getModelName = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Returns mongoose type on the basis of json data type
 * @param {string} - Type from json file
 * @return {mongoose.Types}
 */
var _typeHandler = function (type) {
    switch (type) {
        case "string":
            return mongoose_1.Schema.Types.String;
        case "boolean":
            return mongoose_1.Schema.Types.Boolean;
        case "number":
            return mongoose_1.Schema.Types.Number;
        case "date":
            return mongoose_1.Schema.Types.Date;
        case "ref":
            return mongoose_1.Schema.Types.ObjectId;
        default:
            throw new Error("Unable to determine data type of given argument : " + type);
    }
};
//# sourceMappingURL=index.js.map