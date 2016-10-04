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
var events = require('events');
var base_model_1 = require("./base-model");
var object_helper_1 = require("./object.helper");
var core_1 = require("@angular/core");
var _ = require('lodash');
var EventService = (function () {
    function EventService(prefix) {
        this.prefix = 'e';
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
    EventService.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.emitter).emit.apply(_a, [this.getEventName(eventName)].concat(args));
        var _a;
    };
    /**
     * Обработчик события
     * @param eventName Событие
     * @param callback
     * @param _model В какую модель преобразовать данные первого аргумента функции
     */
    EventService.prototype.on = function (eventName, callback, _model) {
        if (_model === void 0) { _model = base_model_1.BaseModel; }
        this.emitter.on(this.getEventName(eventName), function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i - 0] = arguments[_i];
            }
            if (typeof _model !== "undefined" && typeof _args[0] !== "undefined") {
                if (_.isArray(_args[0])) {
                    var _result = [];
                    _args[0].data.forEach(function (_item) {
                        if (_item.constructor.name !== _.get(_model, 'name')) {
                            _result.push(object_helper_1.ObjectHelper.setPropertiesObject(_model, _item));
                        }
                        else {
                            _result.push(_item);
                        }
                    });
                    _args[0] = _result;
                }
                else {
                    if (_args[0].constructor.name !== _.get(_model, 'name')) {
                        _args[0] = object_helper_1.ObjectHelper.setPropertiesObject(_model, _args[0]);
                    }
                }
            }
            callback.apply(void 0, _args);
        });
    };
    /**
     * Отписывание от события
     * @param eventName Событие
     * @param callback
     */
    EventService.prototype.off = function (eventName, callback) {
        if (typeof callback !== "undefined") {
            this.emitter.removeListener(this.getEventName(eventName), callback);
        }
        else {
            this.emitter.removeAllListeners(this.getEventName(eventName));
        }
    };
    EventService.prototype.getEventName = function (eventName) {
        return this.prefix + ':' + eventName;
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [String])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ldmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFPLE1BQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUNsQywyQkFBd0IsY0FBYyxDQUFDLENBQUE7QUFDdkMsOEJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFDN0MscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRzVCO0lBSUksc0JBQVksTUFBYztRQUZsQixXQUFNLEdBQVUsR0FBRyxDQUFDO1FBR3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQkFBSSxHQUFKLFVBQUssU0FBZ0I7UUFBRSxjQUFjO2FBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYztZQUFkLDZCQUFjOztRQUNqQyxNQUFBLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxZQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQUssSUFBSSxFQUFDLENBQUM7O0lBQzdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHlCQUFFLEdBQUYsVUFBRyxTQUFpQixFQUFFLFFBQWtCLEVBQUUsTUFBa0I7UUFBbEIsc0JBQWtCLEdBQWxCLCtCQUFrQjtRQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQVUsZUFBZTtpQkFBZixXQUFlLENBQWYsc0JBQWUsQ0FBZixJQUFlO2dCQUFmLDhCQUFlOztZQUNuRSxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDakIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO3dCQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDbEUsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsNEJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxRQUFRLGVBQUksS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBCQUFHLEdBQUgsVUFBSSxTQUFnQixFQUFFLFFBQVM7UUFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDTCxDQUFDO0lBRU8sbUNBQVksR0FBcEIsVUFBcUIsU0FBUztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFqRUw7UUFBQyxpQkFBVSxFQUFFOztvQkFBQTtJQWtFYixtQkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUM7QUFqRVksb0JBQVksZUFpRXhCLENBQUEifQ==