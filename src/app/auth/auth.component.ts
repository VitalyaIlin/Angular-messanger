import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  auth_form;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.auth_form = new FormGroup({
      email: new FormControl("", Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')),
      password: new FormControl("", Validators.minLength(8))
    });
  }

  authrization(auth_data){
    this.authService.auth(auth_data);
  }

}
