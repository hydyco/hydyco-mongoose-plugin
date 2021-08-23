import { HydycoFile } from "@hydyco/core";
import * as mongoose from "mongoose";
import { camelCase } from "camel-case";

export default class Model {
  private _file: HydycoFile = new HydycoFile();

  /**
   * Create model from json data
   * @param {string} modelName
   * @param {map} jsonData
   *
   */
  createModel(modelName: string, jsonData: {}) {
    modelName = this._file.getFileName(modelName);
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
    modelName = this._file.getFileName(modelName);
    this._file.deleteMappingFile(modelName);
    if (mongoose.models[modelName]) delete mongoose.models[modelName];
  }
}
