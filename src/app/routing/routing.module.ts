import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { StartComponent } from '../start/start.component';
import { AuthComponent } from '../auth/auth.component';
import { CabinetComponent } from '../cabinet/cabinet.component';
import { SettingsComponent } from '../settings/settings.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { UsersComponent } from '../users/users.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { 
  
}
