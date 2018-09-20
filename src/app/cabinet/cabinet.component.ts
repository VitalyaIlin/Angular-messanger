import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../chat.service';
import { CabinetService } from '../cabinet.service';
import { ArrayType } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { WebsocketService } from '../websoket.service';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  firstname: string = localStorage.getItem('firstname');
  secondname: string = localStorage.getItem('secondname');
  users: Array<any>;
  recipientId: string = null;
  recipientFirstname: string = "";
  recipientSecondname: string = ""
  senderId: string = localStorage.getItem('myId');
  identificators = {
    recipientId: null,
    senderId: null
  };
  message: Object = {};
  conversation: Array<any> = [];



  constructor(
    private auth: AuthService, 
    private app: AppComponent, 
    private chat: ChatService, 
    private cabinet: CabinetService,
    private ws: WebsocketService
  ) {

  }

  ngOnInit() {

    this.app.token = true;
    this.app.firstname = localStorage.getItem('firstname');
    this.app.secondname = localStorage.getItem('secondname');
    this.app.profilePhotoName = localStorage.getItem('photoName');

    this.auth.checkAccess().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data.users;
      }
    );

    this.ws.getConversation().subscribe(
      (data: any) => {
        this.conversation = data.res;
      }
    );

    this.ws.listenOnMessage().subscribe(
      (data: any) => {
        let sender: string = JSON.parse(data.text).sender;
        console.log(data);
        this.users.forEach((user) => {
          if(user._id == sender){
            if(this.recipientId == sender){
              this.conversation.push(JSON.parse(data.text));
            }else{
              alert(`New message from ${user.firstname} ${user.secondname}`);
            }
          }
        })
      }
    )

  }

  selectChat(recipientId, firstname, secondname){
    this.recipientId = recipientId;
    this.recipientFirstname = firstname;
    this.recipientSecondname = secondname;

    this.identificators.recipientId = recipientId;
    this.identificators.senderId = this.senderId;

    this.ws.selectChat(this.identificators);
  }
  
  sendMessage(msg){
    this.message = {
      recipient: this.recipientId,
      sender: this.senderId,
      text: msg
    }

    this.ws.sendMsg(this.message);
    this.conversation.push(this.message);    
  }

}
