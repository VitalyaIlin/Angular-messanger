import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
//import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {

  private socket;

  constructor() { 
    this.socket = io('http://localhost:3000');
    this.socket.emit('online', {'name': 'name'});
  }

  disconect(){
    this.socket.emit('disconnect');
  }

  sendMsg(data: Object){
    this.socket.emit('message', JSON.stringify(data));
  }

  listenOnMessage(){
    return new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        if(JSON.parse(data.text).recipient == localStorage.getItem('myId')){
          observer.next(data);
        }
      })
    })
  }

  selectChat(data: Object){
    this.socket.emit('chatting', JSON.stringify(data));
  }

  getConversation(): Observable<any>{
    return new Observable((observer) => { 
      this.socket.on('chatting', (data: any) => {
        if(data.userId == localStorage.getItem('myId')){
          observer.next(data);
        }
      });
    });
  }

  addFriend(data){
    this.socket.emit('addFriend', JSON.stringify(data));
  }

  listenNotifications(){
    return new Observable((observer) => {
      this.socket.on('notifications', (data) =>  {
        observer.next(data);
      })
    })
  }

}
