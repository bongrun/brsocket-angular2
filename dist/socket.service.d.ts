import { EventService } from "./event.service";
export declare class SocketService {
    protected eventService: EventService;
    private ws;
    private events;
    private eventsIds;
    private eventName;
    constructor(eventService: EventService);
    /**
     * Подписаться на определённое событие
     * @param targetType Событие
     * @param targetId ID события
     * @param callback
     * @param model В какую модель надо преобразовать первый аргумент функции
     */
    onId(targetType: any, targetId: any, callback: any, model?: any): void;
    /**
     * Подписаться на событие
     * @param targetType Событие
     * @param callback
     * @param model В какую модель надо преобразовать первый аргумент функции
     */
    on(targetType: any, callback: any, model?: any): void;
    /**
     * Отписаться от события
     * @param targetType
     */
    off(targetType: any): void;
    /**
     * Отписаться от определённого события
     * @param targetType
     * @param targetId
     */
    offId(targetType: any, targetId: any): void;
    send(type: any, data: any): void;
    private authorization();
    private time();
    private getEventName(...args);
}
