import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://127.0.0.1:3020';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public draw(image: Object): void {
    this.socket.emit('draw', image);
  }

  public setStrokeStyle(data: Object): void {
    this.socket.emit('color', data);
  }

  public onStrokeStyle(): Observable<Object> {
    return new Observable<Object>((observer) => {
      this.socket.on('color', (data: any) => observer.next(data));
    });
  }

  public clearCanvas(): void {
    this.socket.emit('clear');
  }

  public onCanvasClear(): Observable<Object> {
    return new Observable<Object>((observer) => {
      this.socket.on('clear', (data: any) => observer.next(data));
    });
  }

  public onDraw(): Observable<Object> {
    return new Observable<Object>((observer) => {
      this.socket.on('draw', (data: any) => observer.next(data));
    });
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>((observer) => {
      this.socket.on(event, () => observer.next());
    });
  }
}
