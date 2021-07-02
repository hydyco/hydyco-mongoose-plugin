export default class Model {
    private _file;
    /**
     * Create model from json data
     * @param {string} modelName
     * @param {map} jsonData
     *
     */
    createModel(modelName: string, jsonData: {}): void;
    /**
     * Get all model list
     */
    getModelList(): Object[];
    /**
     * Delete Model
     * @param {string} modelName
     */
    deleteModel(modelName: string): void;
}
