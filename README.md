# BRSocket-Angular2

Socket на angular2. Принимающий события из websocket-a.

## Установка

```
npm i -S brsocket-angular2
```

## Использование
```typescript
import {SocketModule} from "brsocket-angular2";

@NgModule({
    imports: [
        ... 
        SocketModule
        ...
    ],
    declarations: [
        DemoComponent
    ]
})
export class Demo {
}
```

```typescript
@Component({
    .....
})
export class DemoComponent {
    public messages: Message[];

    constructor(protected socket:SocketService) {
    }
    
    ngOnInit() {
        var self = this;
        this.socket.on('chat:message', function (message) {
            self.messages.push(message);
        }, Message);
    }
}
```