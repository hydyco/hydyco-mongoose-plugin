/**
 * Extending Express Class
 */
import { Router, Request, Response, NextFunction } from "express";
declare type MongooseRequest = Request & {
    methodCall?: string;
};
interface IRestApiPaths {
    default: string;
    list: string;
    create: string;
    read: string;
    update: string;
    delete: string;
    deleteAll: string;
}
export default class ExpressRoutes {
    private modelName;
    private _parser;
    private _router;
    restApiPaths: IRestApiPaths;
    constructor(modelName: string, restApiPaths?: IRestApiPaths);
    /**
     * Get all registered express routes
     * @return {Router} - Express Router Object
     */
    get Routes(): Router;
    /**
     * Custom Routes
     */
    customRoutes(router: Router, defaultPath: string): void;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    list(request: MongooseRequest, response: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    create(request: MongooseRequest, response: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    read(request: MongooseRequest, response: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    update(request: MongooseRequest, response: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    delete(request: MongooseRequest, response: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Get all mongoose model data
     * @param {MongooseRequest} - Express MongooseRequest object
     * @param {Response} - Express Response object
     */
    deleteAll(request: MongooseRequest, response: Response): Promise<Response<any, Record<string, any>>>;
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
    after(res: any, request: MongooseRequest, response: Response): {
        res: any;
        request: MongooseRequest;
        response: Response;
    };
    private _init;
}
export {};
