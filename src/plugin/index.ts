import { Router, Request, Response } from "express";
import { HydycoFile, HydycoParser } from "@hydyco/core";
import mongoose, { Schema } from "mongoose";
import Parser from "../parser";
import Model from "../model";

const app = Router();
const model = new Model();
const file = new HydycoFile();
const parser = new HydycoParser();

enum EOperations {
  list = "list",
  create = "create",
  update = "update",
  delete = "delete",
  deleteAll = "deleteAll",
  ref = "ref",
}

interface ICurdData {
  id?: Schema.Types.ObjectId | Array<Schema.Types.ObjectId>;
  query: {
    pagination?: {
      current: number;
      pageSize: number;
    };
    find?: {};
    search?: string;
  };
  body?: {};
}

export interface ICurdBody {
  model: string;
  operations: EOperations;
  data: ICurdData;
}

/**
 * Get list of all registered mongoose models
 * @param {Request} request
 * @param {Response} response
 * @path /model/list
 * @method GET
 */
app.get("/model/list", listModelsRoute);
async function listModelsRoute(request: Request, response: Response) {
  const models = model.getModelList();
  models.sort();
  return response.json(models);
}

/**
 * Get schema of mongoose model
 * @param {Request} request
 * @param {Response} response
 * @path /model/get/:modelName
 * @method GET
 */

app.get("/model/get/:modelName", getModelRoute);
async function getModelRoute(request: Request, response: Response) {
  const modelName = request.params?.modelName;

  if (modelName) {
    const model = {
      name: { type: String, default: "Rahul" },
    };

    return response.json(model);
  }
}

/**
 * Create mongoose model from json data
 * @param {Request} request
 * @param {Response} response
 * @path /model/create/:modelName
 * @method POST
 */

app.post("/model/create/:modelName", createModelRoute);
async function createModelRoute(request: Request, response: Response) {
  const modelName = request.params?.modelName;
  const body = request.body;
  try {
    if (modelName) {
      model.createModel(modelName, body);
      file.readAllMappingFiles(true).forEach((file: any) => {
        new Parser(file).updateMongooseModel();
      });
      return response.json(body);
    }
  } catch (error) {
    console.log(error);
    return response.json(error).status(500);
  }
}
/**
 * Delete mongoose model from json data
 * @params {Request} request
 * @params {Response} response
 * @path /model/delete/:modelName
 * @method DELETE
 */

app.delete("/model/delete/:modelName", deleteModelRoute);
async function deleteModelRoute(request: Request, response: Response) {
  const modelName = request.params?.modelName;
  if (modelName) {
    try {
      model.deleteModel(modelName);
      file.readAllMappingFiles(true).forEach((file: any) => {
        new Parser(file).updateMongooseModel();
      });
      return response.json({ status: true, message: "Collection Deleted" });
    } catch (error: any) {
      return response
        .json({ status: false, message: error.message })
        .status(500);
    }
  }
}

/**
 * CRUD dashboard data
 * @params {Request} request
 * @params {Response} response
 * @path /model/crud/
 * @method POST
 */
app.post("/model/crud", crud);
async function crud(request: Request, response: Response) {
  const body: ICurdBody = request.body;
  const Model = new Parser(parser.getModelName(body.model));
  const operationModel = Model.mongooseModel();
  const operationSchema = Model.parsedSchema();
  const operationRaw: any = Model.rawSchema();

  try {
    switch (body.operations) {
      case EOperations.list:
        const current = body.data.query.pagination?.current || 1;
        const pageSize = body.data.query.pagination?.pageSize || 10;
        const find = body.data.query.find || {};

        const list = await operationModel
          .find(find)
          .skip((current - 1) * pageSize)
          .limit(pageSize)
          .lean();

        const column = Object.keys(operationSchema).map((key) => ({
          name: key,
          type: operationSchema[key].ref
            ? Array.isArray(operationSchema[key].type)
              ? "hasmany"
              : "hasone"
            : operationSchema[key].type.schemaName.toLowerCase(),
          file: operationSchema[key].ref === "File",
        }));
        const total = await operationModel.count();
        const expectedResult = current * pageSize;
        return response.end(
          JSON.stringify({
            list,
            pagination: {
              current: current,
              pageSize: pageSize,
              total,
            },
            column: [{ name: "_id", type: "objectId" }, ...column],
          })
        );
      case EOperations.create:
        const create = await operationModel.create(body.data.body);
        return response.end(JSON.stringify(create));
      case EOperations.update:
        const update = await operationModel.findByIdAndUpdate(
          body.data.id,
          body.data.body
        );
        return response.end(JSON.stringify(update));
      case EOperations.delete:
        const deleteO = await operationModel.findByIdAndDelete(
          body.data.id,
          body.data.body
        );
        return response.end(JSON.stringify(deleteO));
      case EOperations.deleteAll:
        const deleteAll = await operationModel.deleteMany({
          _id: body.data.id,
        });
        return response.end(JSON.stringify(deleteAll));
      case EOperations.ref:
        const or: any = [];
        const findRef: any = {};
        const searchValues: any = [];
        Object.keys(operationRaw).forEach((key: any) => {
          const find: any = {};
          if (operationRaw[key].type === "string") {
            searchValues.push(operationRaw[key].name);
            find[operationRaw[key].name] = {
              $regex: body.data.query?.search,
              $options: "i",
            };
            or.push(find);
          }
        });
        if (or.length) {
          findRef["$or"] = or;
        }
        const refList = await operationModel.find(findRef).lean();
        return response.json({ list: refList, searchValues });
    }
  } catch (error: any) {
    return response.json({ status: false, message: error.message }).status(500);
  }
}

const connectDatabase = (connectionString: string, options: object) => {
  mongoose.connect(connectionString, {
    ...options,
  });

  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection is open ");
  });

  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occurred " + err + " error");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection is disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};

export interface IMongooseConfig {
  connectionString: string;
  options: {};
}

/**
 * Function - Config Mongoose to be used by Hydyco Core
 * @param {IMongooseConfig} config - Configuration object for mongoose
 * @return {IRouter} - express router that will be used by Hydyco core
 */

const HydycoMongoose = ({
  connectionString,
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}: IMongooseConfig) => {
  connectDatabase(connectionString, options);
  return app;
};

export default HydycoMongoose;
