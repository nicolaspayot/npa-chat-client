import { Component, Input } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'npa-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  @Input() data: Message;
}
