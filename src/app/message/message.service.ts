import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MESSAGES } from './messages.data';
import { Message } from './message';

@Injectable()
export class MessageService {
  getMessages(): Observable<Message[]> {
    return Observable.of(MESSAGES);
  }
}
