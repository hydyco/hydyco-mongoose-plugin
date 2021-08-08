/**
 * Extending Express Class
 */
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
  IRouter,
} from "express";
import { Model, Document } from "mongoose";
import { makeAuth } from "@hydyco/auth";
const mquery = require("express-mquery"); // ts-types not found

import Parser from "../parser";

type MongooseRequest = Request & { methodCall?: string; mquery?: any };

type MongooseModel = Model<Document<any, any>, {}, {}>;
interface IRestApiPaths {
  list: string;
  create: string;
  read: string;
  update: string;
  delete: string;
  deleteAll: string;
}

interface IAllowedMethods {
  list: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  deleteAll: boolean;
}

type TMiddlewareRoute = Array<RequestHandler> | Array<IRouter>;
interface IMiddleware {
  list: TMiddlewareRoute;
  create: TMiddlewareRoute;
  read: TMiddlewareRoute;
  update: TMiddlewareRoute;
  delete: TMiddlewareRoute;
  deleteAll: TMiddlewareRoute;
}

enum ERestApiMethods {
  default = "default",
  list = "list",
  create = "create",
  read = "read",
  update = "update",
  delete = "delete",
  deleteAll = "deleteAll",
}

/**
 * Function - Make Mongoose Data query using mquery parsed object
 * @param {Object} query - mquery parsed req object
 * @param {Object} Model - Mongoose Model
 * @return {Promise}
 */
export const HydycoQuery = (query: any, Model: MongooseModel) => {
  if (query) {
    query = {
      filter: query.filter || {},
      paginate: query.paginate || { limit: 10, skip: 0, page: 1 },
      select: query.select || {},
      sort: query.sort || {},
    };
    return Model.find(query.filter)
      .select(query.select)
      .sort(query.sort)
      .limit(query.paginate.limit)
      .skip((query.paginate.page - 1) * query.paginate.limit);
  } else {
    return Model.find({});
  }
};

/**
 * Class - ExpressRoutes - Auto Generate express routes for mongoose model
 * @param {string} modelName - Name of the Model
 * @param {Array[string]} helperModels - Helpers Model list
 */

export default class ExpressRoutes {
  private _model: MongooseModel;
  private _router = Router();
  private _defaultPath: string;
  private _helperModels: Array<MongooseModel>;
  private _modelHelper: Parser;
  private _middleware: IMiddleware = {
    list: [],
    create: [],
    read: [],
    update: [],
    delete: [],
    deleteAll: [],
  };

  constructor(modelName: string, helperModels: Array<string> = []) {
    this._model = new Parser(modelName).mongooseModel();
    this._modelHelper = new Parser(modelName);
    this._defaultPath = `/${modelName.toLowerCase()}`;
    this._helperModels = helperModels.map((model) =>
      new Parser(model).mongooseModel()
    );
  }

  /**
   * Get all registered express routes
   * @return {Router} - Express Router Object
   */
  public Routes(): Router {
    return this._boot();
  }

  /**
   * Set Allowed methods
   * @return {IAllowedMethods} allowedMethods
   */
  private allowedMethods(): IAllowedMethods {
    const { operations }: any = this._modelHelper.raw();
    return {
      ...operations,
    };
  }

  /**
   * Get all route paths for the model
   * @return {IRestApiPaths} restApiPaths
   */
  private curdPaths(): IRestApiPaths {
    return {
      list: `${this._defaultPath}`,
      create: `${this._defaultPath}`,
      read: `${this._defaultPath}/:id`,
      update: `${this._defaultPath}/:id`,
      delete: `${this._defaultPath}/:id`,
      deleteAll: `${this._defaultPath}`,
    };
  }

  /**
   * Custom Routes
   * @param {Router} - Express Router object
   * @param {string} - default path string
   * @param {Model} - mongoose model
   */
  public customRoutes(
    router: Router,
    defaultPath: string,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Router {
    return router;
  }

  /**
   * Add routes methods
   * @param {IMiddleware} method - Name of the method
   * @param {Function}  middleware - Express Middleware
   */
  public addMiddleware(method: string, middleware: any): void {
    switch (method) {
      case "list":
        if (Array.isArray(middleware))
          this._middleware.list.push(...middleware);
        else this._middleware.list.push(middleware);
        break;
      case "create":
        if (Array.isArray(middleware))
          this._middleware.create.push(...middleware);
        else this._middleware.create.push(middleware);
        break;
      case "update":
        if (Array.isArray(middleware))
          this._middleware.update.push(...middleware);
        else this._middleware.update.push(middleware);
        break;
      case "read":
        if (Array.isArray(middleware))
          this._middleware.read.push(...middleware);
        else this._middleware.read.push(middleware);
        break;
      case "delete":
        if (Array.isArray(middleware))
          this._middleware.delete.push(...middleware);
        else this._middleware.delete.push(middleware);
        break;
      case "deleteAll":
        if (Array.isArray(middleware))
          this._middleware.deleteAll.push(...middleware);
        else this._middleware.deleteAll.push(middleware);
        break;
      default:
        throw new Error(`${method} not allowed`);
    }
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   * @param {model} - Current Mongoose Model
   */
  public async list(
    request: MongooseRequest,
    response: Response,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Promise<any> {
    const res = await HydycoQuery(request.mquery, model);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public async create(
    request: MongooseRequest,
    response: Response,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Promise<any> {
    const { body } = request;
    const res = await model.create(body);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public async read(
    request: MongooseRequest,
    response: Response,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Promise<any> {
    const { params } = request;
    const { id } = params;
    const res = await model.findById(id);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   *
   */
  public async update(
    request: MongooseRequest,
    response: Response,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Promise<any> {
    const { body, params } = request;
    const { id } = params;
    const res = await model.findByIdAndUpdate(id, body);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public async delete(
    request: MongooseRequest,
    response: Response,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Promise<any> {
    const { params } = request;
    const { id } = params;
    const res: any = await model.findByIdAndDelete(id);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public async deleteAll(
    request: MongooseRequest,
    response: Response,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ): Promise<any> {
    const res = await model.remove({});
    this.after(res, request, response);
  }

  /**
   * Gets called before every api call
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   * @return {MongooseRequest,Response} - Return MongooseRequest and Response
   */
  public before(
    request: MongooseRequest,
    response: Response,
    next: NextFunction,
    model: MongooseModel,
    helperModels: Array<MongooseModel>
  ) {
    next();
  }

  /**
   * Method Call Middleware
   */
  private methodCallMiddleware(
    request: MongooseRequest,
    response: Response,
    next: NextFunction,
    call: string
  ) {
    request.methodCall = call;
    next();
  }

  /**
   * Gets called after every api call
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public after(res: any, request: MongooseRequest, response: Response) {
    return response.send(res);
  }

  private _boot() {
    this._router = this.customRoutes(
      this._router,
      this._defaultPath,
      this._model,
      this._helperModels
    );

    if (!this._router) {
      throw new Error("Custom Routes should always return Router object");
    }

    const allowedMethods = this.allowedMethods();
    this._applyMiddleware();

    if (allowedMethods.list)
      this._router.get(
        this.curdPaths().list,
        this._middleware.list,
        (request: MongooseRequest, response: Response) =>
          this.list(request, response, this._model, this._helperModels)
      );

    if (allowedMethods.create)
      this._router.post(
        this.curdPaths().create,
        this._middleware.create,
        (request: MongooseRequest, response: Response) =>
          this.create(request, response, this._model, this._helperModels)
      );

    if (allowedMethods.read)
      this._router.get(
        this.curdPaths().read,
        this._middleware.read,
        (request: MongooseRequest, response: Response) =>
          this.read(request, response, this._model, this._helperModels)
      );

    if (allowedMethods.update)
      this._router.put(
        this.curdPaths().update,
        this._middleware.update,
        (request: MongooseRequest, response: Response) =>
          this.update(request, response, this._model, this._helperModels)
      );

    if (allowedMethods.delete)
      this._router.delete(
        this.curdPaths().delete,
        this._middleware.delete,
        (request: MongooseRequest, response: Response) =>
          this.delete(request, response, this._model, this._helperModels)
      );

    if (allowedMethods.deleteAll)
      this._router.delete(
        this.curdPaths().deleteAll,
        this._middleware.deleteAll,
        (request: MongooseRequest, response: Response) =>
          this.deleteAll(request, response, this._model, this._helperModels)
      );
    return this._router;
  }

  /**
   * Apply Middleware to methods
   */
  private _applyMiddleware() {
    // make routes authenticated
    // if route is not public then it is treated as authenticated route
    const modelJsonData: any = this._modelHelper.raw();

    ["list", "create", "update", "delete", "read", "deleteAll"].forEach(
      (method: any) => {
        const publicMethods = modelJsonData["publicMethods"];
        if (modelJsonData.status && !publicMethods[method]) {
          this.addMiddleware(method, makeAuth);
        }
        if (method === "list") {
          this.addMiddleware(method, mquery({ limit: 10 }));
        }
        this.addMiddleware(method, [
          (
            request: MongooseRequest,
            response: Response,
            next: NextFunction
          ) => {
            this.methodCallMiddleware(request, response, next, method);
          },
          (
            request: MongooseRequest,
            response: Response,
            next: NextFunction
          ) => {
            this.before(
              request,
              response,
              next,
              this._model,
              this._helperModels
            );
          },
        ]);
      }
    );
  }
}
