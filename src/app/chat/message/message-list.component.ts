import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
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
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[];
  private socketConnection: Subscription;

  constructor(
    private elementRef: ElementRef,
    private messageService: MessageService) {}

  ngOnInit() {
    this.fetchMessages();
    this.connectSocket();
  }

  fetchMessages() {
    this.messageService.getMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  connectSocket() {
    this.socketConnection = this.messageService.onNewMessage().subscribe(message => {
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    const parent = this.elementRef.nativeElement.parentNode;
    setTimeout(() => {
      parent.scrollTop = parent.scrollHeight;
    });
  }

  ngOnDestroy() {
    this.socketConnection.unsubscribe();
  }
}
