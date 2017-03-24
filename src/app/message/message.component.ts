import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message';
import { HOST_URL } from '../constants';

@Component({
  selector: 'npa-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() data: Message;
  avatarUrl: string;

  ngOnInit() {
    this.avatarUrl = `${HOST_URL}/${this.data.sender.avatar}`;
  }
}
