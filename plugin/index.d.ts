import { Schema } from "mongoose";
declare const app: import("express-serve-static-core").Router;
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
export default app;
