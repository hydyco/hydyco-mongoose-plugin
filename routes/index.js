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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extending Express Class
 */
var express_1 = require("express");
var parser_1 = require("../parser");
var ERestApiMethods;
(function (ERestApiMethods) {
    ERestApiMethods["default"] = "default";
    ERestApiMethods["list"] = "list";
    ERestApiMethods["create"] = "create";
    ERestApiMethods["read"] = "read";
    ERestApiMethods["update"] = "update";
    ERestApiMethods["delete"] = "delete";
    ERestApiMethods["deleteAll"] = "deleteAll";
})(ERestApiMethods || (ERestApiMethods = {}));
var ExpressRoutes = /** @class */ (function () {
    function ExpressRoutes(modelName, restApiPaths) {
        this.modelName = modelName;
        this._router = express_1.Router();
        this._parser = new parser_1.default(modelName);
        this.mongooseModel = this._parser.mongooseModel;
        var defaultPath = "/" + modelName.toLowerCase();
        this.restApiPaths = restApiPaths
            ? restApiPaths
            : {
                default: defaultPath,
                list: "" + defaultPath,
                create: "" + defaultPath,
                read: defaultPath + "/:id",
                update: defaultPath + "/:id",
                delete: defaultPath + "/:id",
                deleteAll: "" + defaultPath,
            };
    }
    Object.defineProperty(ExpressRoutes.prototype, "Routes", {
        /**
         * Get all registered express routes
         * @return {Router} - Express Router Object
         */
        get: function () {
            return this._init();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res, returnResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._parser.mongooseModel().find({})];
                    case 1:
                        res = _a.sent();
                        returnResponse = this.after(res, request, response);
                        return [2 /*return*/, response.send(returnResponse.res)];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, res, returnResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body;
                        return [4 /*yield*/, this._parser.mongooseModel().create(body)];
                    case 1:
                        res = _a.sent();
                        returnResponse = this.after(res, request, response);
                        return [2 /*return*/, response.send(returnResponse.res)];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.read = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var params, id, res, returnResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = request.params;
                        id = params.id;
                        return [4 /*yield*/, this._parser.mongooseModel().findById(id)];
                    case 1:
                        res = _a.sent();
                        returnResponse = this.after(res, request, response);
                        return [2 /*return*/, response.send(returnResponse.res)];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var body, params, id, res, returnResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = request.body, params = request.params;
                        id = params.id;
                        return [4 /*yield*/, this._parser.mongooseModel().findByIdAndUpdate(id, body)];
                    case 1:
                        res = _a.sent();
                        returnResponse = this.after(res, request, response);
                        return [2 /*return*/, response.send(returnResponse.res)];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var params, id, res, returnResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = request.params;
                        id = params.id;
                        return [4 /*yield*/, this._parser.mongooseModel().findByIdAndDelete(id)];
                    case 1:
                        res = _a.sent();
                        returnResponse = this.after(res, request, response);
                        return [2 /*return*/, response.send(returnResponse.res)];
                }
            });
        });
    };
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.deleteAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res, returnResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._parser.mongooseModel().remove({})];
                    case 1:
                        res = _a.sent();
                        returnResponse = this.after(res, request, response);
                        return [2 /*return*/, response.send(returnResponse.res)];
                }
            });
        });
    };
    /**
     * Gets called before every api call
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.before = function (request, response, next) {
        console.log("before");
        next();
    };
    /**
     * Gets called after every api call
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    ExpressRoutes.prototype.after = function (res, request, response) {
        console.log("before :: " + request.path + " :: " + request.methodCall);
        return { res: res, request: request, response: response };
    };
    ExpressRoutes.prototype._init = function () {
        var _this = this;
        this._router.get(this.restApiPaths.list, function (request, response, next) {
            request.methodCall = ERestApiMethods.list;
            next();
        }, this.before, function (request, response) {
            return _this.list(request, response);
        });
        this._router.post(this.restApiPaths.create, function (request, response, next) {
            request.methodCall = ERestApiMethods.create;
            next();
        }, this.before, function (request, response) {
            return _this.create(request, response);
        });
        this._router.get(this.restApiPaths.read, function (request, response, next) {
            request.methodCall = ERestApiMethods.read;
            next();
        }, this.before, function (request, response) {
            return _this.read(request, response);
        });
        this._router.put(this.restApiPaths.update, function (request, response, next) {
            request.methodCall = ERestApiMethods.update;
            next();
        }, this.before, function (request, response) {
            return _this.update(request, response);
        });
        this._router.delete(this.restApiPaths.delete, function (request, response, next) {
            request.methodCall = ERestApiMethods.delete;
            next();
        }, this.before, function (request, response) {
            return _this.delete(request, response);
        });
        this._router.delete(this.restApiPaths.deleteAll, function (request, response, next) {
            request.methodCall = ERestApiMethods.deleteAll;
            next();
        }, this.before, function (request, response) {
            return _this.deleteAll(request, response);
        });
        return this._router;
    };
    return ExpressRoutes;
}());
exports.default = ExpressRoutes;
//# sourceMappingURL=index.js.map