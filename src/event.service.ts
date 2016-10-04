import events = require('events');
import {BaseModel} from "./base-model";
import {ObjectHelper} from "./object.helper";
import {Injectable} from "@angular/core";
import * as _ from 'lodash';

@Injectable()
export class EventService {
    emitter:events.EventEmitter;
    private prefix:string = 'e';

    constructor(prefix?:string) {
        if (typeof prefix !== "undefined") {
            this.prefix = prefix;
        }
        this.emitter = new events.EventEmitter();
    }

    /**
     * Вызов события
     * @param eventName Событие
     * @param args Данные
     */
    emit(eventName:string, ...args: any[]) {
        this.emitter.emit(this.getEventName(eventName), ...args);
    }

    /**
     * Обработчик события
     * @param eventName Событие
     * @param callback
     * @param _model В какую модель преобразовать данные первого аргумента функции
     */
    on(eventName: string, callback: Function, _model = BaseModel) {
        this.emitter.on(this.getEventName(eventName), function (..._args: any[]) {
            if (typeof _model !== "undefined" && typeof _args[0] !== "undefined") {
                if (_.isArray(_args[0])) {
                    var _result = [];
                    _args[0].data.forEach(function(_item){
                        if (_item.constructor.name !== _.get(_model, 'name')) {
                            _result.push(ObjectHelper.setPropertiesObject(_model, _item));
                        } else {
                            _result.push(_item);
                        }
                    });
                    _args[0] = _result;
                } else {
                    if (_args[0].constructor.name !== _.get(_model, 'name')) {
                        _args[0] = ObjectHelper.setPropertiesObject(_model, _args[0]);
                    }
                }
            }
            callback(..._args);
        });
    }

    /**
     * Отписывание от события
     * @param eventName Событие
     * @param callback
     */
    off(eventName:string, callback?) {
        if (typeof callback !== "undefined") {
            this.emitter.removeListener(this.getEventName(eventName), callback);
        } else {
            this.emitter.removeAllListeners(this.getEventName(eventName));
        }
    }

    private getEventName(eventName){
        return this.prefix + ':' + eventName;
    }
}