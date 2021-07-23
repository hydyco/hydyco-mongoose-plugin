import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose";
export default class HydycoModel {
    private _helperModels;
    private _fileName;
    private _singleton;
    private _schema;
    private _file;
    private _parser;
    constructor(fileName: string, _helperModels?: Array<string>);
    raw(): any;
    rawSchema(): Object;
    parsedSchema(): any;
    mongooseSchema(): mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
    setMongooseSchema(schema: Schema): void;
    mongooseModel(): mongoose.Model<mongoose.Document<any, any>, {}, {}>;
    helperModels(): HydycoModel[];
    private _getRawJson;
    /**
     * Get Schema json from mapping file
     *
     */
    private _getSchemaJson;
    /**
     * Get Schema json from mapping file
     *
     */
    private _getSchemaParseData;
    /**
     * Get Mongoose Schema
     */
    private _getMongooseSchema;
    /**
     * Get Mongoose Model
     */
    private _getMongooseModel;
    /**
     * Update Mongoose model
     */
    updateMongooseModel(): Model<Document<any, any>>;
}
