import { HydycoFile } from "@hydyco/core";
import HydycoModel from "./parser";
import HydycoMongoose from "./plugin";
import MongooseExpress from "./routes";

const files = new HydycoFile().readAllMappingFiles();

const MongooseExpressRoutes: any = {};
// create mongoose model for every json file present in project
files.forEach((file: any) => {
  MongooseExpressRoutes[file.name] = new MongooseExpress(file.name).Routes();
});

/**
 * Get all mongoose express routes
 */
const getAllRoutes = (mongooseExpressRoutes?: any) => {
  if (mongooseExpressRoutes) {
    return Object.values(mongooseExpressRoutes);
  }
  return Object.values(MongooseExpressRoutes);
};

export {
  HydycoModel,
  HydycoMongoose,
  MongooseExpress,
  MongooseExpressRoutes,
  getAllRoutes,
};
