import HydycoModel from "./parser";
import HydycoMongoose from "./plugin";
import MongooseExpress, { HydycoQuery } from "./routes";
declare const MongooseExpressRoutes: any;
/**
 * Get all mongoose express routes
 */
declare const HydycoRoutes: (mongooseExpressRoutes?: any) => unknown[];
export { HydycoModel, HydycoMongoose, MongooseExpress, MongooseExpressRoutes, HydycoRoutes, HydycoQuery, };
