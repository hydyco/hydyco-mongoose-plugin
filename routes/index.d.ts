/**
 * Extending Express Class
 */
import { Router, Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
declare type MongooseRequest = Request & {
    methodCall?: string;
    mquery?: any;
};
declare type MongooseModel = Model<Document<any, any>, {}, {}>;
/**
 * Function - Make Mongoose Data query using mquery parsed object
 * @param {Object} query - mquery parsed req object
 * @param {Object} Model - Mongoose Model
 * @return {Promise}
 */
export declare const HydycoQuery: (query: any, Model: MongooseModel) => import("mongoose").Query<Document<any, any>[], Document<any, any>, {}>;
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
    private _modelHelper;
    private _middleware;
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
    private allowedMethods;
    /**
     * Get all route paths for the model
     * @return {IRestApiPaths} restApiPaths
     */
    private curdPaths;
    /**
     * Custom Routes
     * @param {Router} - Express Router object
     * @param {string} - default path string
     * @param {Model} - mongoose model
     */
    customRoutes(router: Router, defaultPath: string, model: MongooseModel, helperModels: Array<MongooseModel>): Router;
    /**
     * Add routes methods
     * @param {IMiddleware} method - Name of the method
     * @param {Function}  middleware - Express Middleware
     */
    addMiddleware(method: string, middleware: any): void;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     * @param {model} - Current Mongoose Model
     */
    list(request: MongooseRequest, response: Response, model: MongooseModel, helperModels: Array<MongooseModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    create(request: MongooseRequest, response: Response, model: MongooseModel, helperModels: Array<MongooseModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    read(request: MongooseRequest, response: Response, model: MongooseModel, helperModels: Array<MongooseModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     *
     */
    update(request: MongooseRequest, response: Response, model: MongooseModel, helperModels: Array<MongooseModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    delete(request: MongooseRequest, response: Response, model: MongooseModel, helperModels: Array<MongooseModel>): Promise<any>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    deleteAll(request: MongooseRequest, response: Response, model: MongooseModel, helperModels: Array<MongooseModel>): Promise<any>;
    /**
     * Gets called before every api call
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     * @return {MongooseRequest,Response} - Return MongooseRequest and Response
     */
    before(request: MongooseRequest, response: Response, next: NextFunction, model: MongooseModel, helperModels: Array<MongooseModel>): void;
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
    /**
     * Apply Middleware to methods
     */
    private _applyMiddleware;
}
export {};
