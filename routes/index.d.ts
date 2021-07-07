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
     */
    customRoutes(router: Router, defaultPath: string, model: Model<Document<any, any>, {}, {}>): Router;
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
     */
    before(request: MongooseRequest, response: Response, next: NextFunction): void;
    /**
     * Gets called after every api call
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    after(res: any, request: MongooseRequest, response: Response): Response<any, Record<string, any>>;
    private _boot;
}
export {};
