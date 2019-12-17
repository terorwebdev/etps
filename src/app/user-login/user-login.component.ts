import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DetailToViewService } from '../service/detail-to-view.service';
//import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../service/authentication.service';
//import { LocaltimeService } from '../service/localtime.service';
//import { LocaltimeService2 } from '../localtime2.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  invalidLogin = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private detailService: DetailToViewService
    //private auth: ServiceAuth,
    //private http: HttpClient,
    //private timeService: LocaltimeService
  ) { 
    //this.createForm();
  }

  /*
  createForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }
  */

  ngOnInit() {
    //this.http.get('http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur').subscribe(json => console.log(json));
    //console.log(this.timeService.get_time_now());
    //this.timeService.get_time_now().subscribe(json => console.log(json));
    this.detailService.init();
  }

  onClickSubmit(username, password) {
    
    if (this.authenticationService.authenticate(username, password)) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else{
      this.invalidLogin = true
    }
    
  }
  

}
