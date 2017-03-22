import { Component, Input } from '@angular/core';

@Component({
  selector: 'npa-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  @Input() avatar: string;
  @Input() sender: string;
  @Input() timestamp: string;
  @Input() content: string;
}
