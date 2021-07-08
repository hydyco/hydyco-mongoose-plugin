import { HydycoFile } from "@hydyco/core";
import HydycoModel from "./parser";
import HydycoMongoose from "./plugin";
import MongooseExpress from "./routes";

const files = new HydycoFile().readAllMappingFiles();

const MongooseExpressRoutes: Array<any> = files.map((file: any) =>
  new MongooseExpress(file.name).Routes()
);

export { HydycoModel, HydycoMongoose, MongooseExpress, MongooseExpressRoutes };
