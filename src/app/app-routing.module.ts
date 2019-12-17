import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { DetailsComponent } from './user-home/details/details.component';

const routes: Routes = [{ path: '', component:  UserHomeComponent },
{ path: 'detail', component:  DetailsComponent },
{ path: 'account', component:  UserAccountComponent },
{ path: 'login', component:  UserLoginComponent },
{ path: 'logout', component:  UserLogoutComponent },
{ path: 'register', component:  UserRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
