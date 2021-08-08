import HydycoModel from "./parser";
import HydycoMongoose from "./plugin";
import MongooseExpress, { HydycoQuery } from "./routes";

import { HydycoFile } from "@hydyco/core";

const files = new HydycoFile().readAllMappingFiles();

const MongooseExpressRoutes: any = {};
// create mongoose model for every json file present in project
files.forEach((file: any) => {
  MongooseExpressRoutes[file.name] = new MongooseExpress(file.name).Routes();
});

/**
 * Get all mongoose express routes
 */
const HydycoRoutes = (mongooseExpressRoutes?: any) => {
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
  HydycoRoutes,
  HydycoQuery,
};
