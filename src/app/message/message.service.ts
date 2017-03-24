import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Message } from './message';
import { API_URL } from '../constants';

@Injectable()
export class MessageService {
  constructor(private http: Http) {}

  getMessages(): Observable<Message[]> {
    return this.http.get(`${API_URL}/messages`)
      .map((response: Response) => response.json());
  }
}
