/**
 * Extending Express Class
 */
import { Router, Request, Response } from "express";
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
declare type TMiddlewareRoute = Router | Array<Router> | [];
interface IMiddleware {
    list: TMiddlewareRoute;
    create: TMiddlewareRoute;
    read: TMiddlewareRoute;
    update: TMiddlewareRoute;
    delete: TMiddlewareRoute;
    deleteAll: TMiddlewareRoute;
}
export default class ExpressRoutes {
    private modelName;
    private _model;
    private _router;
    private _defaultPath;
    constructor(modelName: string);
    /**
     * Get all registered express routes
     * @return {Router} - Express Router Object
     */
    Routes(): Router;
    /**
     * Get all route paths for the model
     */
    curdPaths(): IRestApiPaths;
    /**
     * Custom Routes
     * @param {Router} - Express Router object
     * @param {string} - default path string
     * @param {Model} - mongoose model
     */
    customRoutes(router: Router, defaultPath: string, model: Model<Document<any, any>, {}, {}>): Router;
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
    before(request: MongooseRequest, response: Response): [request: MongooseRequest, response: Response];
    /**
     * before middleware middleware to handle before function
     */
    private beforeMiddleware;
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
