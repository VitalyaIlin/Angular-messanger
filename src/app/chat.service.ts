import { Injectable } from '@angular/core';
import { WebsocketService } from './websoket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {


  messages: Subject<any>;


  constructor(private wsService: WebsocketService) { 
   /* this.messages = <Subject<any>>wsService
      .connect()
      .map((response:any):any => {
        return response;
      })*/
  }

  /*getMessages(resipientId, senderId){
    this.messages.next({one: "one"});
  }

  
  sendMsg(msg){
    this.messages.next(msg);
  }*/

}
