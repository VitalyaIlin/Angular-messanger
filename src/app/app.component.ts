import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';
import { WebsocketService } from './websoket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  menuToggle: boolean = false;
  notificationsToggle: boolean = false;
  token;
  firstname: string;
  secondname: string;
  profilePhotoName: any;
  notifications: Array<string> = [];
  
  constructor(private auth: AuthService, private ws: WebsocketService){}

  ngOnInit(){
    if(localStorage.getItem('token')){
      this.token = true;
    }else{
      this.token = false;
    }

    this.ws.listenNotifications().subscribe(
      (data: any) => {
        console.log(data);
        this.notifications.push(data.text);
      }
    )
  }

  toggle(){
    this.menuToggle = !this.menuToggle;
  }

  getNotifications(){
    this.notificationsToggle = !this.notificationsToggle;
  }

  logout(){
    this.ws.disconect();
    this.token = false;
    this.auth.logOut();
    this.menuToggle = false;
  }

  
  
 

}
