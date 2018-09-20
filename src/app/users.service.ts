import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './websoket.service';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient, private ws: WebsocketService) { }

  getAllUsers(){
    return this.http.get('http://localhost:3000/users');
  }

  addFriend(friendId){
    let userId = localStorage.getItem('myId');
    let firstname = localStorage.getItem('firstname');
    let secondname = localStorage.getItem('secondname');

    this.ws.addFriend({userId: userId, friendId: friendId, firstname: firstname, secondname: secondname});
    alert("Request had been sent");
  }


}
