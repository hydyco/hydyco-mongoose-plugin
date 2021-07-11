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

type TMiddlewareRoute = Router | Array<Router> | [];
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
   * @param {Router} - Express Router object
   * @param {string} - default path string
   * @param {Model} - mongoose model
   */
  public customRoutes(
    router: Router,
    defaultPath: string,
    model: Model<Document<any, any>, {}, {}>
  ): Router {
    return router;
  } // todo : add options for custom routes

  public middleware(): IMiddleware {
    return {
      list: [],
      create: [],
      read: [],
      update: [],
      delete: [],
      deleteAll: [],
    };
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
    model: Model<Document<any, any>, {}, {}>
  ) {
    const res = await model.find({});
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
    model: Model<Document<any, any>, {}, {}>
  ) {
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
    model: Model<Document<any, any>, {}, {}>
  ) {
    const { params } = request;
    const { id } = params;
    const res = await model.findById(id);
    this.after(res, request, response);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async update(
    request: MongooseRequest,
    response: Response,
    model: Model<Document<any, any>, {}, {}>
  ) {
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
    model: Model<Document<any, any>, {}, {}>
  ) {
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
    model: Model<Document<any, any>, {}, {}>
  ) {
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
    next: NextFunction
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
      this._model
    );

    if (!this._router) {
      throw new Error("Custom Routes should always return Router object");
    }

    this._router.get(
      this.curdPaths().list,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        this.methodCallMiddleware(
          request,
          response,
          next,
          ERestApiMethods.list
        );
      },
      this.before,

      this.middleware().list,
      (request: MongooseRequest, response: Response) =>
        this.list(request, response, this._model)
    );
    this._router.post(
      this.curdPaths().create,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        this.methodCallMiddleware(
          request,
          response,
          next,
          ERestApiMethods.create
        );
      },
      this.before,
      this.middleware().create,

      (request: MongooseRequest, response: Response) =>
        this.create(request, response, this._model)
    );
    this._router.get(
      this.curdPaths().read,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        this.methodCallMiddleware(
          request,
          response,
          next,
          ERestApiMethods.read
        );
      },
      this.before,
      this.middleware().read,
      (request: MongooseRequest, response: Response) =>
        this.read(request, response, this._model)
    );
    this._router.put(
      this.curdPaths().update,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        this.methodCallMiddleware(
          request,
          response,
          next,
          ERestApiMethods.update
        );
      },
      this.before,
      this.middleware().update,

      (request: MongooseRequest, response: Response) =>
        this.update(request, response, this._model)
    );
    this._router.delete(
      this.curdPaths().delete,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        this.methodCallMiddleware(
          request,
          response,
          next,
          ERestApiMethods.delete
        );
      },
      this.before,
      this.middleware().delete,

      (request: MongooseRequest, response: Response) =>
        this.delete(request, response, this._model)
    );
    this._router.delete(
      this.curdPaths().deleteAll,
      (request: MongooseRequest, response: Response, next: NextFunction) => {
        this.methodCallMiddleware(
          request,
          response,
          next,
          ERestApiMethods.deleteAll
        );
      },
      this.before,
      this.middleware().deleteAll,
      (request: MongooseRequest, response: Response) =>
        this.deleteAll(request, response, this._model)
    );
    return this._router;
  }
}
