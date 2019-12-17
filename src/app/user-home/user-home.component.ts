import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { LocaltimeService } from '../service/localtime.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  Time : any;
  myDate : any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private timeService: LocaltimeService) { }

  ngOnInit() {
    this.checkSession();
    this.timeSession();
  }

  checkSession(){
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  timeSession(){
    this.timeService.get_time_now().subscribe(
      success => {
        // handle success
        console.log("Request Time Success : " + success.datetime.split('.')[0]);
        this.timeInterval(success.datetime.split('.')[0]);
      },
      error => {
        // handle error
        console.log(error);
      });
  }

  timeInterval(data){
    var myDate = new Date(data);
    this.myDate = myDate;
    setInterval(() => {
      this.myDate = new Date(this.myDate.getTime() + 1000);
      this.timeService.setCurrentTime(this.myDate);
    }, 1000);
  }
  
}
