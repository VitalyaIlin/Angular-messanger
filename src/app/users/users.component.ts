import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  firstname: string = "default";
  secondname: string = "default";
  photoName: string = "";
  profileFlag: boolean = false;

  constructor(private us: UsersService) { }

  ngOnInit() {
    this.us.getAllUsers().subscribe(
      (data: any) => {
        this.users = data.result;
      }
    )
  }

  showUserProfile(user){
    this.firstname = user.firstname;
    this.secondname = user.secondname;
    this.photoName = user.photoName;
    this.profileFlag = true;
  }

  addFriend(friendId){
    this.us.addFriend(friendId);
  }

}
