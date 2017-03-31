import { Component } from '@angular/core';
import { MessageService } from './message/message.service';

@Component({
  selector: 'npa-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  constructor(private messageService: MessageService) {}

  sendMessage(message) {
    this.messageService.send(message).subscribe();
  }
}
