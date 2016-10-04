/// <reference types="node" />
import events = require('events');
import { BaseModel } from "./base-model";
export declare class EventService {
    emitter: events.EventEmitter;
    private prefix;
    constructor(prefix?: string);
    /**
     * Вызов события
     * @param eventName Событие
     * @param args Данные
     */
    emit(eventName: string, ...args: any[]): void;
    /**
     * Обработчик события
     * @param eventName Событие
     * @param callback
     * @param _model В какую модель преобразовать данные первого аргумента функции
     */
    on(eventName: string, callback: Function, _model?: typeof BaseModel): void;
    /**
     * Отписывание от события
     * @param eventName Событие
     * @param callback
     */
    off(eventName: string, callback?: any): void;
    private getEventName(eventName);
}
