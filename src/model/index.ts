import { HydycoFile } from "@hydyco/core";
import * as mongoose from "mongoose";

export default class Model {
  private _file: HydycoFile = new HydycoFile();

  /**
   * Create model from json data
   * @param {string} modelName
   * @param {map} jsonData
   *
   */
  createModel(modelName: string, jsonData: {}) {
    modelName = modelName.toLowerCase();
    this._file.writeMappingFile(modelName, jsonData);
    if (mongoose.models[modelName]) delete mongoose.models[modelName];
  }

  /**
   * Get all model list
   */
  getModelList() {
    const modelNames = this._file.readAllMappingFiles();
    return modelNames;
  }

  /**
   * Delete Model
   * @param {string} modelName
   */
  deleteModel(modelName: string) {
    modelName = modelName.toLowerCase();
    this._file.deleteMappingFile(modelName);
    if (mongoose.models[modelName]) delete mongoose.models[modelName];
  }
}
