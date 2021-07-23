"use strict";
// express router to handle file uploads
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
var core_1 = require("@hydyco/core");
var express_1 = require("express");
var path = require("path");
var multer = require("multer");
var parser_1 = require("../parser");
var data = require("./file.json");
var file = new core_1.HydycoFile();
file.writeMappingFile("file", data); // create file json for admin to view it
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
var upload = multer({ storage: storage });
/**
 * Express router to handle file upload
 * @param {string} uploadDir - Directory for uploading files from root folder
 * @return {Router} router - Express router
 */
var fileUpload = function (uploadDir) {
    if (uploadDir === void 0) { uploadDir = "uploads"; }
    var router = express_1.Router();
    var File = new parser_1.default("file").mongooseModel();
    router.get("/file/get/:fileName", function (req, res) {
        var fileName = req.params.fileName;
        return res.sendFile(path.join(file.rootPath, uploadDir, fileName));
    });
    router.post("/file/:field", function (req, res, next) {
        var field = req.params.field;
        upload.single(field)(req, res, next);
    }, function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var field, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        field = req.params.field;
                        req.file.fieldname = field;
                        return [4 /*yield*/, File.create(__assign(__assign({}, req.file), { path: "/admin/file/get/" + req.file.filename }))];
                    case 1:
                        file = _a.sent();
                        return [2 /*return*/, res.send(file._id)];
                }
            });
        });
    });
    return router;
};
exports.default = fileUpload;
//# sourceMappingURL=index.js.map