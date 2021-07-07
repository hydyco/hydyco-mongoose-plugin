/**
 * Extending Express Class
 */
import { Router, Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import Parser from "../parser";

type MongooseRequest = Request & { methodCall?: string };

interface IRestApiPaths {
  list: string;
  create: string;
  read: string;
  update: string;
  delete: string;
  deleteAll: string;
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

export default class ExpressRoutes {
  private _model: Model<Document<any, any>, {}, {}>;
  private _router = Router();
  private _defaultPath: string;

  constructor(private modelName: string) {
    this._model = new Parser(modelName).mongooseModel();
    this._defaultPath = `/${modelName.toLowerCase()}`;
  }

  /**
   * Get all registered express routes
   * @return {Router} - Express Router Object
   */
  public Routes(): Router {
    return this._boot();
  }

  /**
   * Get all route paths for the model
   */
  public curdPaths(): IRestApiPaths {
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
   */
  public customRoutes(
    router: Router,
    defaultPath: string,
    model: Model<Document<any, any>, {}, {}>
  ): Router {
    return router;
  } // todo : add options for custom routes

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async list(request: MongooseRequest, response: Response) {
    const res = await this._model.find({});
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async create(request: MongooseRequest, response: Response) {
    const { body } = request;
    const res = await this._model.create(body);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async read(request: MongooseRequest, response: Response) {
    const { params } = request;
    const { id } = params;
    const res = await this._model.findById(id);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async update(request: MongooseRequest, response: Response) {
    const { body, params } = request;
    const { id } = params;
    const res = await this._model.findByIdAndUpdate(id, body);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async delete(request: MongooseRequest, response: Response) {
    const { params } = request;
    const { id } = params;
    const res: any = await this._model.findByIdAndDelete(id);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async deleteAll(request: MongooseRequest, response: Response) {
    const res = await this._model.remove({});
    this.after(res, request, response);
  }

  /**
   * Gets called before every api call
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public before(
    request: MongooseRequest,
    response: Response,
    next: NextFunction
  ) {
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
      this._model
    );

    if (!this._router) {
      throw new Error("Custom Routes should always return Router object");
    }

    this._router.get(
      this.curdPaths().list,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        request.methodCall = ERestApiMethods.list;
        next();
      },
      this.before,
      (request: MongooseRequest, response: Response) =>
        this.list(request, response)
    );
    this._router.post(
      this.curdPaths().create,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        request.methodCall = ERestApiMethods.create;
        next();
      },
      this.before,
      (request: MongooseRequest, response: Response) =>
        this.create(request, response)
    );
    this._router.get(
      this.curdPaths().read,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        request.methodCall = ERestApiMethods.read;
        next();
      },
      this.before,
      (request: MongooseRequest, response: Response) =>
        this.read(request, response)
    );
    this._router.put(
      this.curdPaths().update,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        request.methodCall = ERestApiMethods.update;
        next();
      },
      this.before,
      (request: MongooseRequest, response: Response) =>
        this.update(request, response)
    );
    this._router.delete(
      this.curdPaths().delete,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        request.methodCall = ERestApiMethods.delete;
        next();
      },
      this.before,
      (request: MongooseRequest, response: Response) =>
        this.delete(request, response)
    );
    this._router.delete(
      this.curdPaths().deleteAll,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        request.methodCall = ERestApiMethods.deleteAll;
        next();
      },
      this.before,
      (request: MongooseRequest, response: Response) =>
        this.deleteAll(request, response)
    );
    return this._router;
  }
}
