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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var socket_service_1 = require("./socket.service");
var event_service_1 = require("./event.service");
var SocketModule = (function () {
    function SocketModule() {
    }
    SocketModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [],
            providers: [
                socket_service_1.SocketService, event_service_1.EventService
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SocketModule);
    return SocketModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocketModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2NrZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0MsZUFBZSxDQUFDLENBQUE7QUFDL0Qsc0JBQStDLGdCQUFnQixDQUFDLENBQUE7QUFDaEUsdUJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFDN0MsK0JBQTRCLGtCQUFrQixDQUFDLENBQUE7QUFDL0MsOEJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFrQjdDO0lBQUE7SUFDQSxDQUFDO0lBakJEO1FBQUMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHFCQUFZO2dCQUNaLG1CQUFXO2dCQUNYLDJCQUFtQjthQUN0QjtZQUNELFlBQVksRUFBRSxFQUNiO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLDhCQUFhLEVBQUUsNEJBQVk7YUFDOUI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsNkJBQXNCO2FBQ3pCO1NBRUosQ0FBQzs7b0JBQUE7SUFFRixtQkFBQztBQUFELENBQUMsQUFERCxJQUNDO0FBREQ7OEJBQ0MsQ0FBQSJ9