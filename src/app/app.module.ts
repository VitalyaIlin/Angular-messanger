import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './routing/routing.module';
import { AuthService } from './auth.service';
import { StartComponent } from './start/start.component';
import { AuthComponent } from './auth/auth.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { AuthGuard } from './guards/auth-guard.service';
import { CabinetService } from './cabinet.service';


//Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import 'hammerjs';

import { WebsocketService } from './websoket.service';
import { ChatService } from './chat.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    StartComponent,
    AuthComponent,
    CabinetComponent,
    ImageUploadComponent,
    FileSelectDirective,
    SettingsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    WebsocketService, 
    ChatService, 
    CabinetService,
    UsersService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
