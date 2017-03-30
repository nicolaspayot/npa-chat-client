import 'material-design-lite';

import { Component } from '@angular/core';
import { MessageService } from './message/message.service';

@Component({
  selector: 'npa-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private messageService: MessageService) {}

  sendMessage(message) {
    this.messageService.send(message).subscribe();
  }
}
