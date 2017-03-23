import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'npa-message-list',
  template: `
    <npa-message
      *ngFor="let msg of messages"
      [data]="msg">
    </npa-message>
  `
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}
