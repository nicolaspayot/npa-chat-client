import { Component } from '@angular/core';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'npa-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  message = '';

  constructor(private messageService: MessageService) {}

  sendMessage() {
    this.messageService.send(this.message).subscribe();
    this.message = '';
  }
}
