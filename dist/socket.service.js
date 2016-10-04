"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_websocket_1 = require('angular2-websocket/angular2-websocket');
var event_service_1 = require("./event.service");
var _ = require('lodash');
var SocketService = (function () {
    function SocketService(eventService) {
        this.eventService = eventService;
        this.events = {};
        this.eventsIds = {};
        this.eventName = 'socket';
        this.ws = new angular2_websocket_1.$WebSocket("ws://" + location.hostname + (location.port ? ':' + location.port : '') + "/ws?time=" + localStorage.getItem('time'), null, {
            initialTimeout: 50000,
            maxTimeout: 30000000,
            reconnectIfNotNormalClose: true
        });
        var self = this;
        this.ws.connect(true);
        this.ws.onOpen(function () {
            self.authorization();
        });
        window.addEventListener("storage", function (event) {
            if ((event.key === 'token' && event.oldValue !== event.newValue) || (_.get(event, 'detail.key') === 'token')) {
                self.authorization();
            }
            if ((event.key === 'time' && event.oldValue !== event.newValue) || (_.get(event, 'detail.key') === 'time')) {
                self.time();
            }
        }, false);
        this.ws.onMessage(function (event) {
            if (typeof event['data'] !== "undefined" && event['data'] && event['data'].length) {
                var data = JSON.parse(event['data']);
                if (typeof data['data'] !== "undefined" && _.isArray(data['data']) && data['data'].length) {
                    var time = data.time;
                    data['data'].forEach(function (item) {
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
    SocketService.prototype.onId = function (targetType, targetId, callback, model) {
        if (typeof this.eventsIds[targetType] !== "undefined" && this.eventsIds[targetType] !== targetId) {
            this.off(targetType + ':' + this.eventsIds[targetType]);
        }
        this.eventsIds[targetType] = targetId;
        this.on((targetType + (targetId ? ':' + targetId : '')), callback, model);
    };
    /**
     * Подписаться на событие
     * @param targetType Событие
     * @param callback
     * @param model В какую модель надо преобразовать первый аргумент функции
     */
    SocketService.prototype.on = function (targetType, callback, model) {
        if (typeof this.events[targetType] === "undefined") {
            this.events[targetType] = [];
        }
        this.events[targetType].push(callback);
        this.eventService.on(this.getEventName(targetType), callback, model);
        this.send('on', { type: targetType });
    };
    /**
     * Отписаться от события
     * @param targetType
     */
    SocketService.prototype.off = function (targetType) {
        var self = this;
        if (typeof this.events[targetType] !== "undefined") {
            this.events[targetType].forEach(function (callback) {
                self.eventService.off(self.getEventName(targetType), callback);
            });
            this.send('off', { type: targetType });
            delete this.events[targetType];
        }
    };
    /**
     * Отписаться от определённого события
     * @param targetType
     * @param targetId
     */
    SocketService.prototype.offId = function (targetType, targetId) {
        if (typeof this.eventsIds[targetType] !== "undefined") {
            delete this.eventsIds[targetType];
        }
        this.off((targetType + (targetId ? ':' + targetId : '')));
    };
    SocketService.prototype.send = function (type, data) {
        this.ws.send({
            type: type,
            data: data
        });
    };
    SocketService.prototype.authorization = function () {
        this.send('token', { 'token': localStorage.getItem("token") ? localStorage.getItem("token") : null });
    };
    SocketService.prototype.time = function () {
        this.send('time', { 'time': localStorage.getItem("time") });
    };
    SocketService.prototype.getEventName = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this.eventName + ':' +
            _.compact(args)
                .join(':');
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6QyxtQ0FBeUIsdUNBQ3pCLENBQUMsQ0FEK0Q7QUFFaEUsOEJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFDN0MsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFHNUI7SUFNSSx1QkFBc0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFKdkMsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQVUsRUFBRSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxRQUFRLENBQUM7UUFHekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLCtCQUFVLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRTtZQUNsSixjQUFjLEVBQUUsS0FBSztZQUNyQixVQUFVLEVBQUUsUUFBUTtZQUNwQix5QkFBeUIsRUFBRSxJQUFJO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNYLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFLO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMs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