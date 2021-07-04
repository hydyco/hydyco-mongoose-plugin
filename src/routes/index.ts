/**
 * Extending Express Class
 */
import { Router, Request, Response, NextFunction } from "express";
import Parser from "../parser";

type MongooseRequest = Request & { methodCall?: string };

interface IRestApiPaths {
  default: string;
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
  private _parser: Parser;
  private _router = Router();
  public restApiPaths: IRestApiPaths;

  constructor(private modelName: string, restApiPaths?: IRestApiPaths) {
    this._parser = new Parser(modelName);
    const defaultPath = `/${modelName.toLowerCase()}`;
    this.restApiPaths = restApiPaths
      ? restApiPaths
      : {
          default: defaultPath,
          list: `${defaultPath}`,
          create: `${defaultPath}`,
          read: `${defaultPath}/:id`,
          update: `${defaultPath}/:id`,
          delete: `${defaultPath}/:id`,
          deleteAll: `${defaultPath}`,
        };
  }

  /**
   * Get all registered express routes
   * @return {Router} - Express Router Object
   */
  get Routes(): Router {
    return this._init();
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async list(request: MongooseRequest, response: Response) {
    const res = await this._parser.mongooseModel().find({});
    const returnResponse = this.after(res, request, response);
    return response.send(returnResponse.res);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async create(request: MongooseRequest, response: Response) {
    const { body } = request;
    const res = await this._parser.mongooseModel().create(body);
    const returnResponse = this.after(res, request, response);
    return response.send(returnResponse.res);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async read(request: MongooseRequest, response: Response) {
    const { params } = request;
    const { id } = params;
    const res = await this._parser.mongooseModel().findById(id);
    const returnResponse = this.after(res, request, response);
    return response.send(returnResponse.res);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async update(request: MongooseRequest, response: Response) {
    const { body, params } = request;
    const { id } = params;
    const res = await this._parser.mongooseModel().findByIdAndUpdate(id, body);
    const returnResponse = this.after(res, request, response);
    return response.send(returnResponse.res);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async delete(request: MongooseRequest, response: Response) {
    const { params } = request;
    const { id } = params;
    const res: any = await this._parser.mongooseModel().findByIdAndDelete(id);
    const returnResponse = this.after(res, request, response);
    return response.send(returnResponse.res);
  }

  /**
   * Get all mongoose model data
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */

  public async deleteAll(request: MongooseRequest, response: Response) {
    const res = await this._parser.mongooseModel().remove({});
    const returnResponse = this.after(res, request, response);
    return response.send(returnResponse.res);
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
    console.log("before");
    next();
  }

  /**
   * Gets called after every api call
   * @param {MongooseRequest} - Express MongooseRequest object
   * @param {Response} - Express Response object
   */
  public after(
    res: any,
    request: MongooseRequest,
    response: Response
  ): {
    res: any;
    request: MongooseRequest;
    response: Response;
  } {
    console.log("after");
    return { res, request, response };
  }

  private _init() {
    this._router.use(this.before); // call before middleware
    this._router.get(
      this.restApiPaths.list,
      (request: MongooseRequest, response: Response) => {
        request.methodCall = ERestApiMethods.list;
        return this.list(request, response);
      }
    );
    this._router.post(
      this.restApiPaths.create,
      (request: MongooseRequest, response: Response) => {
        request.methodCall = ERestApiMethods.create;
        return this.create(request, response);
      }
    );
    this._router.get(
      this.restApiPaths.read,
      (request: MongooseRequest, response: Response) => {
        request.methodCall = ERestApiMethods.read;
        return this.read(request, response);
      }
    );
    this._router.put(
      this.restApiPaths.update,
      (request: MongooseRequest, response: Response) => {
        request.methodCall = ERestApiMethods.update;
        return this.update(request, response);
      }
    );
    this._router.delete(
      this.restApiPaths.delete,
      (request: MongooseRequest, response: Response) => {
        request.methodCall = ERestApiMethods.delete;
        return this.delete(request, response);
      }
    );
    this._router.delete(
      this.restApiPaths.deleteAll,
      (request: MongooseRequest, response: Response) => {
        request.methodCall = ERestApiMethods.deleteAll;
        return this.deleteAll(request, response);
      }
    );
    return this._router;
  }
}
