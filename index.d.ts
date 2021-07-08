import HydycoModel from "./parser";
import HydycoMongoose from "./plugin";
import MongooseExpress from "./routes";
declare const MongooseExpressRoutes: any;
/**
 * Get all mongoose express routes
 */
declare const getAllRoutes: (mongooseExpressRoutes?: any) => unknown[];
export { HydycoModel, HydycoMongoose, MongooseExpress, MongooseExpressRoutes, getAllRoutes, };
