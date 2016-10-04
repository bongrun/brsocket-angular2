"use strict";
var error_1 = require("./error");
var _ = require('lodash');
var BaseModel = (function () {
    function BaseModel() {
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
        this._types = {};
        /**
         * Включить отдание значений из toArray по списку полей из attributesColumns
         * @type {boolean}
         */
        this.attributesCheck = false;
        /**
         * Какие поля будут отданны при toArray
         * @type {Array}
         */
        this.attributesColumns = [];
    }
    /**
     * @param error
     */
    BaseModel.prototype.setError = function (error) {
        this.error = new error_1.Error();
        this.error.status = error.status;
        this.error.userMessage = error.userMessage;
        this.error.fields = error.data;
        if ('development' === process.env.NODE_ENV && error.developerMessage) {
            this.error.developerMessage = error.developerMessage;
        }
    };
    /**
     * Устонавливаем свойства
     * @param fields
     */
    BaseModel.prototype.setFields = function (fields) {
        for (var key in fields) {
            if (key.substr(0, 1) === '_') {
                key = key.substr(1);
            }
            if (typeof fields[key] !== "undefined" && typeof fields[key] !== "function") {
                this[key] = fields[key];
            }
        }
    };
    /**
     * To Array
     * @returns {Object}
     */
    BaseModel.prototype.toArray = function () {
        var result = {};
        var attributesCheck = !!(this.attributesCheck || this.attributesColumns.length);
        var attributesColumns = this.getColumns(this.attributesColumns, {});
        return this.getValue(result, this, attributesColumns, attributesCheck);
    };
    BaseModel.prototype.getColumns = function (attributesColumns, result) {
        var self = this;
        attributesColumns.forEach(function (col) {
            if (~col.indexOf('.')) {
                var cols = col.split('.');
                var key = cols[0];
                if (!_.isObject(result[key])) {
                    result[key] = {};
                }
                cols = cols.slice(1);
                result[key] = self.getColumns(cols, result[key]);
            }
            else {
                result[col] = true;
            }
        });
        return result;
    };
    BaseModel.prototype.getValue = function (result, object, attributesColumns, attributesCheck) {
        for (var key in object) {
            if (key.substr(0, 1) === '_') {
                key = key.substr(1);
            }
            if ((attributesCheck && typeof attributesColumns[key] !== "undefined") || !attributesCheck) {
                if (typeof object[key] !== "undefined" && typeof object[key] !== "function") {
                    if (_.isObject(attributesColumns[key])) {
                        //todo переделать нормально, на любую вложенность
                        if (_.isArray(object[key])) {
                            var i = 0;
                            object[key].forEach(function (item) {
                                for (var key2 in item) {
                                    if (key2.substr(0, 1) === '_') {
                                        key2 = key2.substr(1);
                                    }
                                    if ((attributesCheck && typeof attributesColumns[key][key2] !== "undefined") || !attributesCheck) {
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
                        }
                        else {
                            if (typeof object[key] === "object") {
                                for (var key2 in object[key]) {
                                    if (key2.substr(0, 1) === '_') {
                                        key2 = key2.substr(1);
                                    }
                                    if ((attributesCheck && typeof attributesColumns[key][key2] !== "undefined") || !attributesCheck) {
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
                    }
                    else {
                        result[key] = object[key];
                    }
                }
            }
        }
        return _.omit(result, ['attributesCheck', 'attributesColumns']);
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYXNlLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBb0IsU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUI7SUFBQTtRQUNJOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFFMUI7OztXQUdHO1FBQ08sb0JBQWUsR0FBVyxLQUFLLENBQUM7UUFFMUM7OztXQUdHO1FBQ08sc0JBQWlCLEdBQVksRUFBRSxDQUFDO0lBcUg5QyxDQUFDO0lBakhHOztPQUVHO0lBQ0ksNEJBQVEsR0FBZixVQUFnQixLQUFLO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUN6RCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFTLEdBQWhCLFVBQWlCLE1BQWlCO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FB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