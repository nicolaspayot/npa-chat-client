import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Message } from './message';
import { HOST_URL, API_URL } from '../constants';

@Injectable()
export class MessageService {
  constructor(private http: Http) {}

  getMessages(): Observable<Message[]> {
    return this.http.get(`${API_URL}/messages`)
      .map((response: Response) => response.json());
  }

  send(message: string): Observable<any> {
    return this.http.post(`${API_URL}/messages`, { message });
  }

  onNewMessage(): Observable<Message> {
    const socket = io.connect(HOST_URL);
    return Observable.create(observer => {
      socket.on('messages/new', message => observer.next(message));
      return () => socket.disconnect();
    });
  }
}
