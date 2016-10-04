import {Error} from "./error";
import * as _ from 'lodash';

export class BaseModel {
    /**
     * Преобразовывание в объекты
     *
     * Пример
     *
     *  _types:Object = {
     *      'user': User,
     *      'attachments': Attachment
     *  };
     *
     * @type {{}}
     * @private
     */
    public _types:Object = {};

    /**
     * Включить отдание значений из toArray по списку полей из attributesColumns
     * @type {boolean}
     */
    protected attributesCheck:boolean = false;

    /**
     * Какие поля будут отданны при toArray
     * @type {Array}
     */
    protected attributesColumns:string[] = [];

    protected error:Error;

    /**
     * @param error
     */
    public setError(error) {
        this.error = new Error();
        this.error.status = error.status;
        this.error.userMessage = error.userMessage;
        this.error.fields = error.data;
        if ('development' === process.env.NODE_ENV && error.developerMessage) {
            this.error.developerMessage = error.developerMessage;
        }
    }

    /**
     * Устонавливаем свойства
     * @param fields
     */
    public setFields(fields: BaseModel) {
        for (var key in fields) {
            if (key.substr(0, 1) === '_') {
                key = key.substr(1);
            }
            if (typeof fields[key] !== "undefined" && typeof fields[key] !== "function") {
                this[key] = fields[key];
            }
        }
    }

    /**
     * To Array
     * @returns {Object}
     */
    public toArray():Object {
        var result = {};
        var attributesCheck = !!(this.attributesCheck || this.attributesColumns.length);
        var attributesColumns = this.getColumns(this.attributesColumns, {});
        return this.getValue(result, this, attributesColumns, attributesCheck);
    }

    private getColumns(attributesColumns, result):Object {
        var self = this;
        attributesColumns.forEach(function(col){
            if (~col.indexOf('.')){
                var cols = col.split('.');
                var key = cols[0];
                if (!_.isObject(result[key])) {
                    result[key] = {};
                }
                cols = cols.slice(1);
                result[key] = self.getColumns(cols, result[key]);
            } else {
                result[col] = true;
            }
        });
        return result;
    }

    private getValue(result:Object, object:Object, attributesColumns:Object, attributesCheck:boolean):Object {
        for(var key in object){
            if (key.substr(0, 1) === '_') {
                key = key.substr(1);
            }
            if ((attributesCheck && typeof attributesColumns[key] !== "undefined" ) || !attributesCheck) {
                if (typeof object[key] !== "undefined" && typeof object[key] !== "function") {
                    if (_.isObject(attributesColumns[key])) {
                        //todo переделать нормально, на любую вложенность

                        if (_.isArray(object[key])) {
                            var i = 0;
                            object[key].forEach(function(item){
                                for(var key2 in item){
                                    if (key2.substr(0, 1) === '_') {
                                        key2 = key2.substr(1);
                                    }
                                    if ((attributesCheck && typeof attributesColumns[key][key2] !== "undefined" ) || !attributesCheck) {
                                        if (typeof item[key2] !== "undefined" && typeof item[key2] !== "function") {
                                            if (typeof result[key] === "undefined") {
                                                result[key] = [];
                                            }
                                            if (typeof result[key][i] === "undefined") {
                                                result[key][i] = {};
                                            }
                                            result[key][i][key2] = item[key2];
                                        }
                                    }
                                }
                                i++;
                            });
                        } else {
                            if(typeof object[key] === "object") {
                                for(var key2 in object[key]){
                                    if (key2.substr(0, 1) === '_') {
                                        key2 = key2.substr(1);
                                    }
                                    if ((attributesCheck && typeof attributesColumns[key][key2] !== "undefined" ) || !attributesCheck) {
                                        if (typeof object[key][key2] !== "undefined" && typeof object[key][key2] !== "function") {
                                            if (typeof result[key] === "undefined") {
                                                result[key] = [];
                                            }
                                            result[key][key2] = object[key][key2];
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        result[key] = object[key];
                    }
                }
            }
        }
        return _.omit(result, ['attributesCheck', 'attributesColumns']);
    }
}