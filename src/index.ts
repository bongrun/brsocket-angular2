import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SocketService} from "./socket.service";
import {EventService} from "./event.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ],
    providers: [
        SocketService, EventService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SocketModule {
}