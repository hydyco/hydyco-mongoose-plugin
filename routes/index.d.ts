/**
 * Extending Express Class
 */
import { Router, Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
declare type MongooseRequest = Request & {
    methodCall?: string;
};
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
declare type TMiddlewareRoute = Router | Array<Router> | [];
interface IMiddleware {
    list: TMiddlewareRoute;
    create: TMiddlewareRoute;
    read: TMiddlewareRoute;
    update: TMiddlewareRoute;
    delete: TMiddlewareRoute;
    deleteAll: TMiddlewareRoute;
}
/**
 * Class - ExpressRoutes - Auto Generate express routes for mongoose model
 * @param {string} modelName - Name of the Model
 * @param {Array[string]} helperModels - Helpers Model list
 */
export default class ExpressRoutes {
    private _model;
    private _router;
    private _defaultPath;
    private _helperModels;
    constructor(modelName: string, helperModels?: Array<string>);
    /**
     * Get all registered express routes
     * @return {Router} - Express Router Object
     */
    Routes(): Router;
    /**
     * Set Allowed methods
     * @return {IAllowedMethods} allowedMethods
     */
    allowedMethods(): IAllowedMethods;
    /**
     * Get all route paths for the model
     * @return {IRestApiPaths} restApiPaths
     */
    curdPaths(): IRestApiPaths;
    /**
     * Custom Routes
     * @param {Router} - Express Router object
     * @param {string} - default path string
     * @param {Model} - mongoose model
     */
    customRoutes(router: Router, defaultPath: string, model: Model<Document<any, any>, {}, {}>, helperModels: Array<Model<Document<any, any>, {}, {}>>): Router;
    middleware(): IMiddleware;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     * @param {model} - Current Mongoose Model
     */
    list(request: MongooseRequest, response: Response, model: Model<Document<any, any>, {}, {}>): Promise<void>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    create(request: MongooseRequest, response: Response, model: Model<Document<any, any>, {}, {}>): Promise<void>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    read(request: MongooseRequest, response: Response, model: Model<Document<any, any>, {}, {}>): Promise<void>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    update(request: MongooseRequest, response: Response, model: Model<Document<any, any>, {}, {}>): Promise<void>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    delete(request: MongooseRequest, response: Response, model: Model<Document<any, any>, {}, {}>): Promise<void>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    deleteAll(request: MongooseRequest, response: Response, model: Model<Document<any, any>, {}, {}>): Promise<void>;
    /**
     * Gets called before every api call
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     * @return {MongooseRequest,Response} - Return MongooseRequest and Response
     */
    before(request: MongooseRequest, response: Response, next: NextFunction, model: Model<Document<any, any>, {}, {}>, helperModels: Array<Model<Document<any, any>, {}, {}>>): void;
    /**
     * Method Call Middleware
     */
    private methodCallMiddleware;
    /**
     * Gets called after every api call
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    after(res: any, request: MongooseRequest, response: Response): Response<any, Record<string, any>>;
    private _boot;
}
export {};
