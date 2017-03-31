import { Component } from '@angular/core';
import { MessageService } from '../chat/message/message.service';

@Component({
  selector: 'npa-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private messageService: MessageService) {}

  setNickname(nickname) {
    this.messageService.nickname = nickname;
  }
}
