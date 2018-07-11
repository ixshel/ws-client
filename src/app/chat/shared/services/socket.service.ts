import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

// Models
import { Event } from '../model/event';
import { Message } from '../model/message';

// SocketIO
import * as socketIO from 'socket.io-client';

// Settings
// const url: String = 'https://localhost:8080';
const url: String = 'https://socket-ng6.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIO(url);
  }

  public send(message: Message) {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on('event', () => observer.next());
    });
  }

}
