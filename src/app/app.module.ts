import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CountdownModule } from 'ngx-countdown';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HeaderComponent } from './user-home/header/header.component';
import { ContentsComponent } from './user-home/contents/contents.component';
import { FooterComponent } from './user-home/footer/footer.component';
import { DetailsComponent } from './user-home/details/details.component';

import { MyMaterialModule } from  './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LocaltimeService } from './service/localtime.service';
import { AuthenticationService } from './service/authentication.service';
import { DetailToViewService } from './service/detail-to-view.service';
 
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserAccountComponent,
    UserLogoutComponent,
    UserHomeComponent,
    HeaderComponent,
    ContentsComponent,
    FooterComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    CountdownModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, 
    LocaltimeService,
    DetailToViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
