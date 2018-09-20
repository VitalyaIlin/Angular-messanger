import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  @ViewChild('avatar') avatar;

  constructor(private http:HttpClient, private router: Router) { }

  form;

  ngOnInit() {

    this.form = new FormGroup({
      firstname: new FormControl("", Validators.pattern('^[a-zA-Z\-]+$')),
      secondname: new FormControl("", Validators.pattern('^[a-zA-Z\-]+$')),
      useremail: new FormControl("", Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')),
      password: new FormControl("", Validators.minLength(8))
    });
  }

  registration(userdata){

    this.http.post('http://localhost:3000', userdata)
        .subscribe(
          (data: any) => {
            console.log(data);
          
            if(data == 200){
              this.router.navigate(['auth']);
            }else{
              alert("Пользователь под таким email уже зарегистрирован");
            }
          },

          (error) => { console.log(error) }
        );
  }

}
