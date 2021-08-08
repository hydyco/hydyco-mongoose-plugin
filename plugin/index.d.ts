import { Schema } from "mongoose";
declare enum EOperations {
    list = "list",
    create = "create",
    update = "update",
    delete = "delete",
    deleteAll = "deleteAll",
    ref = "ref"
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
export interface IMongooseConfig {
    connectionString: string;
    options: {};
}
/**
 * Function - Config Mongoose to be used by Hydyco Core
 * @param {IMongooseConfig} config - Configuration object for mongoose
 * @return {IRouter} - express router that will be used by Hydyco core
 */
declare const HydycoMongoose: ({ connectionString, options, }: IMongooseConfig) => import("express-serve-static-core").Router;
export default HydycoMongoose;
