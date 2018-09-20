import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  headers: Object;
  authToken: string;
  firstname: string;
  secondname: string;

  constructor(private http: HttpClient, private router: Router) {}

  auth(data){

    this.http.post('http://localhost:3000/auth', data)
      .subscribe(
        (data: any) => { 
          if(data.result == null){
            alert("Can't find user")
          }else{
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstname', data.result.firstname);
            localStorage.setItem('secondname', data.result.secondname);
            localStorage.setItem('myId', data.result._id);
            localStorage.setItem('photoName', data.result.photoName);
            this.router.navigate(['/cabinet']);
          }
        },
        (error) => { console.log(`Error: ${error}`) }
      )
      
  }

  checkAccess(){
    
    this.authToken = localStorage.getItem('token');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      }),
      params: {
        userId: localStorage.getItem('myId')
      }
    };

    return this.http.get('http://localhost:3000/cabinet', httpOptions);

  }

  logOut():void{
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
