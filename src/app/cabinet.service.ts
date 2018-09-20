import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()
export class CabinetService {

  resipientId: string = null;
  senderId: string;

  constructor(private http: HttpClient, private router: Router) { }

  getMessages(resipientId, senderId){
    return  this.http.post('http://localhost:3000/messages', {recipientId: resipientId, senderId: senderId})
  }

}
