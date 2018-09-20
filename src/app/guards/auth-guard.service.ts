import{ Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CanActivate, Router } from '@angular/router';


@Injectable()

export class AuthGuard implements CanActivate{

        constructor(private router: Router, private auth: AuthService){

        }

        
        canActivate(){

            if(localStorage.getItem('token') !== null){
                return true;
            }else{
                this.router.navigate(['/auth']);
                return false;
            }
            
        }


  

}