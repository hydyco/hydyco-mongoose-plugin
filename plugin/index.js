"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var core_1 = require("@hydyco/core");
var parser_1 = require("../parser");
var model_1 = require("../model");
var app = express_1.Router();
var model = new model_1.default();
var file = new core_1.HydycoFile();
var parser = new core_1.HydycoParser();
var EOperations;
(function (EOperations) {
    EOperations["list"] = "list";
    EOperations["create"] = "create";
    EOperations["update"] = "update";
    EOperations["delete"] = "delete";
    EOperations["deleteAll"] = "deleteAll";
    EOperations["ref"] = "ref";
})(EOperations || (EOperations = {}));
/**
 * Get list of all registered mongoose models
 * @param {Request} request
 * @param {Response} response
 * @path /model/list
 * @method GET
 */
app.get("/model/list", listModelsRoute);
function listModelsRoute(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var models;
        return __generator(this, function (_a) {
            models = model.getModelList();
            models.sort();
            return [2 /*return*/, response.json(models)];
        });
    });
}
/**
 * Get schema of mongoose model
 * @param {Request} request
 * @param {Response} response
 * @path /model/get/:modelName
 * @method GET
 */
app.get("/model/get/:modelName", getModelRoute);
function getModelRoute(request, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var modelName, model_2;
        return __generator(this, function (_b) {
            modelName = (_a = request.params) === null || _a === void 0 ? void 0 : _a.modelName;
            if (modelName) {
                model_2 = {
                    name: { type: String, default: "Rahul" },
                };
                return [2 /*return*/, response.json(model_2)];
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Create mongoose model from json data
 * @param {Request} request
 * @param {Response} response
 * @path /model/create/:modelName
 * @method POST
 */
app.post("/model/create/:modelName", createModelRoute);
function createModelRoute(request, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var modelName, body;
        return __generator(this, function (_b) {
            modelName = (_a = request.params) === null || _a === void 0 ? void 0 : _a.modelName;
            body = request.body;
            try {
                if (modelName) {
                    model.createModel(modelName, body);
                    file.readAllMappingFiles(true).forEach(function (file) {
                        new parser_1.default(file).updateMongooseModel();
                    });
                    return [2 /*return*/, response.json(body)];
                }
            }
            catch (error) {
                console.log(error);
                return [2 /*return*/, response.json(error).status(500)];
            }
            return [2 /*return*/];
        });
    });
}
/**
 * Delete mongoose model from json data
 * @params {Request} request
 * @params {Response} response
 * @path /model/delete/:modelName
 * @method DELETE
 */
app.delete("/model/delete/:modelName", deleteModelRoute);
function deleteModelRoute(request, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var modelName;
        return __generator(this, function (_b) {
            modelName = (_a = request.params) === null || _a === void 0 ? void 0 : _a.modelName;
            if (modelName) {
                try {
                    model.deleteModel(modelName);
                    file.readAllMappingFiles(true).forEach(function (file) {
                        new parser_1.default(file).updateMongooseModel();
                    });
                    return [2 /*return*/, response.json({ status: true, message: "Collection Deleted" })];
                }
                catch (error) {
                    return [2 /*return*/, response
                            .json({ status: false, message: error.message })
                            .status(500)];
                }
            }
            return [2 /*return*/];
        });
    });
}
/**
 * CRUD dashboard data
 * @params {Request} request
 * @params {Response} response
 * @path /model/crud/
 * @method POST
 */
app.post("/model/crud", crud);
function crud(request, response) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var body, Model, operationModel, operationSchema, operationRaw, _c, current, pageSize, find, list, column, total, expectedResult, create, update, deleteO, deleteAll, or_1, findRef, searchValues_1, refList, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    body = request.body;
                    Model = new parser_1.default(parser.getModelName(body.model));
                    operationModel = Model.mongooseModel();
                    operationSchema = Model.parsed();
                    operationRaw = Model.raw();
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 16, , 17]);
                    _c = body.operations;
                    switch (_c) {
                        case EOperations.list: return [3 /*break*/, 2];
                        case EOperations.create: return [3 /*break*/, 5];
                        case EOperations.update: return [3 /*break*/, 7];
                        case EOperations.delete: return [3 /*break*/, 9];
                        case EOperations.deleteAll: return [3 /*break*/, 11];
                        case EOperations.ref: return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 15];
                case 2:
                    current = ((_a = body.data.query.pagination) === null || _a === void 0 ? void 0 : _a.current) || 1;
                    pageSize = ((_b = body.data.query.pagination) === null || _b === void 0 ? void 0 : _b.pageSize) || 10;
                    find = body.data.query.find || {};
                    return [4 /*yield*/, operationModel
                            .find(find)
                            .skip((current - 1) * pageSize)
                            .limit(pageSize)
                            .lean()];
                case 3:
                    list = _d.sent();
                    column = Object.keys(operationSchema).map(function (key) { return ({
                        name: key,
                        type: operationSchema[key].ref
                            ? Array.isArray(operationSchema[key].type)
                                ? "hasmany"
                                : "hasone"
                            : operationSchema[key].type.schemaName.toLowerCase(),
                    }); });
                    return [4 /*yield*/, operationModel.count()];
                case 4:
                    total = _d.sent();
                    expectedResult = current * pageSize;
                    return [2 /*return*/, response.end(JSON.stringify({
                            list: list,
                            pagination: {
                                current: current,
                                pageSize: pageSize,
                                total: total,
                            },
                            column: __spreadArray([{ name: "_id", type: "objectId" }], column),
                        }))];
                case 5: return [4 /*yield*/, operationModel.create(body.data.body)];
                case 6:
                    create = _d.sent();
                    return [2 /*return*/, response.end(JSON.stringify(create))];
                case 7: return [4 /*yield*/, operationModel.findByIdAndUpdate(body.data.id, body.data.body)];
                case 8:
                    update = _d.sent();
                    return [2 /*return*/, response.end(JSON.stringify(update))];
                case 9: return [4 /*yield*/, operationModel.findByIdAndDelete(body.data.id, body.data.body)];
                case 10:
                    deleteO = _d.sent();
                    return [2 /*return*/, response.end(JSON.stringify(deleteO))];
                case 11: return [4 /*yield*/, operationModel.deleteMany({
                        _id: body.data.id,
                    })];
                case 12:
                    deleteAll = _d.sent();
                    return [2 /*return*/, response.end(JSON.stringify(deleteAll))];
                case 13:
                    or_1 = [];
                    findRef = {};
                    searchValues_1 = [];
                    Object.keys(operationRaw).forEach(function (key) {
                        var _a;
                        var find = {};
                        if (operationRaw[key].type === "string") {
                            searchValues_1.push(operationRaw[key].name);
                            find[operationRaw[key].name] = {
                                $regex: (_a = body.data.query) === null || _a === void 0 ? void 0 : _a.search,
                                $options: "i",
                            };
                            or_1.push(find);
                        }
                    });
                    if (or_1.length) {
                        findRef["$or"] = or_1;
                    }
                    return [4 /*yield*/, operationModel.find(findRef).lean()];
                case 14:
                    refList = _d.sent();
                    return [2 /*return*/, response.json({ list: refList, searchValues: searchValues_1 })];
                case 15: return [3 /*break*/, 17];
                case 16:
                    error_1 = _d.sent();
                    return [2 /*return*/, response.json(error_1.message)];
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map