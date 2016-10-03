import {Injectable} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import {SocketMessage} from "./socket-message";
import {EventService} from "./event.service";
import * as _ from 'lodash';

@Injectable()
export class SocketService {
    private ws:$WebSocket;
    private events:Object = {};
    private eventsIds:Object = {};
    private eventName = 'socket';

    constructor(protected eventService:EventService) {
        this.ws = new $WebSocket("ws://" + location.hostname + (location.port ? ':' + location.port : '') + "/ws?time=" + localStorage.getItem('time'), null, {
            initialTimeout: 50000,
            maxTimeout: 30000000,
            reconnectIfNotNormalClose: true
        });
        var self = this;

        this.ws.connect(true);
        this.ws.onOpen(function () {
            self.authorization();
        });
        window.addEventListener("storage", (event) => {
            if ((event.key === 'token' && event.oldValue !== event.newValue) || (_.get(event, 'detail.key') === 'token')) {
                self.authorization();
            }
            if ((event.key === 'time' && event.oldValue !== event.newValue) || (_.get(event, 'detail.key') === 'time')) {
                self.time();
            }
        }, false);
        this.ws.onMessage(function (event:MessageEvent) {
            if (typeof event['data'] !== "undefined" && event['data'] && event['data'].length) {
                var data = JSON.parse(event['data']);
                if (typeof data['data'] !== "undefined" && _.isArray(data['data']) && data['data'].length) {
                    var time = data.time;
                    data['data'].forEach(function (item:SocketMessage) {
                        self.eventService.emit(self.getEventName(item.type, item.id), item.data);
                    });
                }
            }
        }, null);
    }

    /**
     * Подписаться на определённое событие
     * @param targetType Событие
     * @param targetId ID события
     * @param callback
     * @param model В какую модель надо преобразовать первый аргумент функции
     */
    public onId(targetType, targetId, callback, model?) {
        if (typeof this.eventsIds[targetType] !== "undefined" && this.eventsIds[targetType] !== targetId) {
            this.off(targetType + ':' + this.eventsIds[targetType]);
        }
        this.eventsIds[targetType] = targetId;
        this.on((targetType + (targetId ? ':' + targetId : '')), callback, model);
    }

    /**
     * Подписаться на событие
     * @param targetType Событие
     * @param callback
     * @param model В какую модель надо преобразовать первый аргумент функции
     */
    public on(targetType, callback, model?) {
        if (typeof this.events[targetType] === "undefined") {
            this.events[targetType] = [];
        }
        this.events[targetType].push(callback);
        this.eventService.on(this.getEventName(targetType), callback, model);
        this.send('on', {type: targetType})
    }

    /**
     * Отписаться от события
     * @param targetType
     */
    public off(targetType) {
        var self = this;
        if (typeof this.events[targetType] !== "undefined") {
            this.events[targetType].forEach(function (callback) {
                self.eventService.off(self.getEventName(targetType), callback);
            });
            this.send('off', {type: targetType});
            delete this.events[targetType];
        }
    }

    /**
     * Отписаться от определённого события
     * @param targetType
     * @param targetId
     */
    public offId(targetType, targetId) {
        if (typeof this.eventsIds[targetType] !== "undefined") {
            delete this.eventsIds[targetType];
        }
        this.off((targetType + (targetId ? ':' + targetId : '')));
    }

    public send(type, data){
        this.ws.send({
            type: type,
            data: data
        });
    }

    private authorization() {
        this.send('token', {'token': localStorage.getItem("token") ? localStorage.getItem("token") : null})
    }

    private time() {
        this.send('time', {'time': localStorage.getItem("time")});
    }

    private getEventName(...args) {
        return this.eventName + ':' +
            _.compact(args)
                .join(':');
    }
}