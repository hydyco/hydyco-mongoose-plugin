/**
 * Parse json to mongoose schema object
 */
import { HydycoFile, HydycoParser } from "@hydyco/core";
import * as mongoose from "mongoose";
import { Schema, model, Model, Document } from "mongoose";

export default class HydycoModel {
  private _fileName: string;
  private _singleton: boolean = false;
  private _schema: Schema;
  private _file: HydycoFile = new HydycoFile();
  private _parser: HydycoParser = new HydycoParser();

  constructor(fileName: string, private _helperModels: Array<string> = []) {
    if (!fileName) throw new Error("Model name is required");
    if (this._singleton) throw new Error("Class is already initialized");
    this._singleton = true;
    this._fileName = this._file.getFileName(fileName);
    this._schema = this.mongooseSchema();
  }

  public raw() {
    return this._getSchemaJson();
  }

  public parsed() {
    return this._getSchemaParseData();
  }

  public mongooseSchema() {
    return this._getMongooseSchema();
  }

  public setMongooseSchema(schema: Schema) {
    this._schema = schema;
    this.updateMongooseModel();
  }

  public mongooseModel() {
    return this._getMongooseModel();
  }

  public helperModels() {
    return this._helperModels.map((model) => new HydycoModel(model));
  }

  /**
   * Get Schema json from mapping file
   *
   */
  private _getSchemaJson() {
    const jsonData: { name: string; schema: Object } =
      this._file.readMappingFile(this._fileName);
    return jsonData["schema"];
  }

  /**
   * Get Schema json from mapping file
   *
   */
  private _getSchemaParseData() {
    let jsonData: any = this._getSchemaJson();
    jsonData = _sanitizeJsonData(jsonData);
    jsonData = _parseTypeData(jsonData);
    return jsonData;
  }

  /**
   * Get Mongoose Schema
   */
  private _getMongooseSchema(): Schema {
    const jsonData = this._getSchemaParseData();
    const schema = new Schema(jsonData);
    schema.plugin((schema) => {
      const populates = Object.keys(schema.obj).filter(
        (key: any) => schema.obj[key].autopopulate
      );
      // plugin to auto populate
      schema.pre("find", function () {
        this.populate(populates);
      });
      schema.pre("findOne", function () {
        this.populate(populates);
      });
      schema.pre("findById", function () {
        this.populate(populates);
      });
    });
    return schema;
  }

  /**
   * Get Mongoose Model
   */
  private _getMongooseModel(): Model<Document<any, any>> {
    const modelName: any = this._parser.getModelName(this._fileName);
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }
    return model(modelName, this._schema);
  }

  /**
   * Update Mongoose model
   */
  public updateMongooseModel(): Model<Document<any, any>> {
    const modelName: any = this._parser.getModelName(this._fileName);
    if (mongoose.models[modelName]) {
      delete mongoose.models[modelName];
    }
    return model(modelName, this._schema);
  }
}

/**
 * Remove unwanted data from json file
 * @param {Object} - Json data from json file
 * @return {Object} - sanitized json data
 */

const _sanitizeJsonData = (jsonData: any) => {
  Object.keys(jsonData).forEach((fieldKey) => {
    Object.keys(jsonData[fieldKey]).forEach((fieldDataKey) => {
      if (
        typeof jsonData[fieldKey][fieldDataKey] === "boolean" &&
        jsonData[fieldKey][fieldDataKey] === false
      ) {
        delete jsonData[fieldKey][fieldDataKey];
      }
      if (
        typeof jsonData[fieldKey][fieldDataKey] == "string" &&
        jsonData[fieldKey][fieldDataKey].length === 0
      ) {
        delete jsonData[fieldKey][fieldDataKey];
      }

      if (
        typeof jsonData[fieldKey][fieldDataKey] == "number" &&
        jsonData[fieldKey][fieldDataKey] === 0
      ) {
        delete jsonData[fieldKey][fieldDataKey];
      }
      if (
        fieldDataKey === "enum" &&
        jsonData[fieldKey][fieldDataKey].length === 0
      ) {
        delete jsonData[fieldKey][fieldDataKey];
      }
      if (
        fieldDataKey === "ref" &&
        jsonData[fieldKey][fieldDataKey] === "none"
      ) {
        delete jsonData[fieldKey]["relationship"];
        delete jsonData[fieldKey]["ref"];
        delete jsonData[fieldKey]["autopopulate"];
      }

      delete jsonData[fieldKey]["name"];
    });
  });
  return jsonData;
};

const _parseTypeData = (jsonData: any) => {
  const schemaJson: any = {};

  Object.keys(jsonData).forEach((fieldKey) => {
    const fieldData = jsonData[fieldKey];
    switch (jsonData[fieldKey]["type"]) {
      case "string":
        schemaJson[fieldKey] = {
          ...fieldData,
          type: _typeHandler("string"),
        };
        break;
      case "boolean":
        schemaJson[fieldKey] = {
          ...fieldData,
          type: _typeHandler("boolean"),
        };
        break;
      case "number":
        schemaJson[fieldKey] = {
          ...fieldData,
          type: _typeHandler("number"),
        };
        break;
      case "boolean":
        schemaJson[fieldKey] = {
          ...fieldData,
          type: _typeHandler("boolean"),
        };
        break;
      case "date":
        schemaJson[fieldKey] = {
          ...fieldData,
          type: _typeHandler("date"),
        };
        break;
      case "ref":
        schemaJson[fieldKey] = {
          ...fieldData,
          ref: getModelName(fieldData["ref"]),
          type:
            fieldData["relationship"] === "hasmany"
              ? [_typeHandler("ref")]
              : _typeHandler("ref"),
        };
        delete schemaJson[fieldKey]["relationship"];
        break;
      case "file":
        schemaJson[fieldKey] = {
          ...fieldData,
          ref: getModelName(fieldData["ref"]),
          type:
            fieldData["relationship"] === "hasmany"
              ? [_typeHandler("ref")]
              : _typeHandler("ref"),
        };
        delete schemaJson[fieldKey]["relationship"];
        break;
      default:
        throw new Error(
          `Unable to parse type data for ${jsonData[fieldKey]["type"]}`
        );
    }
  });

  return schemaJson;
};

const getModelName = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Returns mongoose type on the basis of json data type
 * @param {string} - Type from json file
 * @return {mongoose.Types}
 */

const _typeHandler = (type: string) => {
  switch (type) {
    case "string":
      return Schema.Types.String;
    case "boolean":
      return Schema.Types.Boolean;
    case "number":
      return Schema.Types.Number;
    case "date":
      return Schema.Types.Date;
    case "ref":
      return Schema.Types.ObjectId;

    default:
      throw new Error(
        `Unable to determine data type of given argument : ${type}`
      );
  }
};
