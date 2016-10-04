import { Error } from "./error";
export declare class BaseModel {
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
    _types: Object;
    /**
     * Включить отдание значений из toArray по списку полей из attributesColumns
     * @type {boolean}
     */
    protected attributesCheck: boolean;
    /**
     * Какие поля будут отданны при toArray
     * @type {Array}
     */
    protected attributesColumns: string[];
    protected error: Error;
    /**
     * @param error
     */
    setError(error: any): void;
    /**
     * Устонавливаем свойства
     * @param fields
     */
    setFields(fields: BaseModel): void;
    /**
     * To Array
     * @returns {Object}
     */
    toArray(): Object;
    private getColumns(attributesColumns, result);
    private getValue(result, object, attributesColumns, attributesCheck);
}
