import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import sampleData from '../hourdetails.json';
import LocationData from '../locationdetails.json';
import { LocaltimeService } from '../../service/localtime.service';
import { DetailToViewService } from '../../service/detail-to-view.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, DoCheck {

  NewFormStatus: boolean = true;
  ActiveStatus: boolean = false;
  DefaultWatchExitTimer :number = 60000;
  DestroyTimer : any;
  selectedLocation: FormGroup;
  existedLocation: FormGroup;

  LocationList: any[] = LocationData;

  CurrentLocalTime: any;

  EndTime: any;
  EndTimeExist: any;
  RemainingExistTime: number = 0;
  ActiveRemainingTimer: any;

  hourDetails: any = sampleData;

  timeCurrentInit = 0;
  currentHourInfo = this.hourDetails[this.timeCurrentInit];
  timeLastInit = this.hourDetails.length;

  constructor(private fb: FormBuilder,
    private router: Router,
    private timeService: LocaltimeService,
    private detailService: DetailToViewService) {
    this.createForm();
  }
  createForm() {
    this.selectedLocation = this.fb.group({
      LocationList: ['', Validators.required],
      CarPlat: ['', Validators.required],
      ParkingNo: ['']
    });
    this.existedLocation = this.fb.group({
      LocationList: ['', Validators.required]
    });
  }
  ngOnInit() {
    //get db itemToView
    this.CurrentLocalTime = new Date(this.timeService.getCurrentTime());

    console.log("Parking to view Exist ", this.detailService.get('parking_to_view'));

    var toViewFlag = this.detailService.get('parking_to_view');
    if (toViewFlag.car_plat) {
      this.NewFormStatus = false;
      console.log("Parking to view Exist");
      if (this.getRemainingFlag(toViewFlag.end_time)) {
        this.ActiveStatus = true;
        var toViewEndTime = new Date(toViewFlag.end_time);
        this.ActiveRemainingTimer = new Date(toViewEndTime.getTime() - this.CurrentLocalTime.getTime());
        this.existForm(toViewFlag);
        console.log("Active");
      } else {
        //turn to new request
        this.ActiveStatus = false;
        this.existForm(toViewFlag);
        console.log("Not Active");
      }
    } else {
      this.NewFormStatus = true;
      this.newForm();
      console.log("Parking to view not Exist: Add New");
    }
  }

  ngDoCheck() {
    this.CurrentLocalTime = new Date(this.timeService.getCurrentTime());
    this.EndTime = new Date(this.CurrentLocalTime.getTime() + (this.currentHourInfo.value * 60 * 1000));
    this.EndTimeExist = new Date(this.RemainingExistTime + this.CurrentLocalTime.getTime() + (this.currentHourInfo.value * 60 * 1000));
  }

  newForm(){
    const toSelect = this.LocationList.find(c => c.id == 0);
    console.log("Location auto select : ", toSelect);
    this.selectedLocation.get('LocationList').setValue(toSelect);
  }

  existForm(item){
    const toSelect = item.location;
    console.log('existForm : ',toSelect);
    //console.log('toSelect1 : ',toSelect);
    this.existedLocation.get('LocationList').setValue(toSelect);
    console.log(this.existedLocation.get('LocationList'));
    console.log('item.car_plat : '+item.car_plat);
    this.selectedLocation.get('CarPlat').setValue(item.car_plat);
    console.log('item.parking_no : '+item.parking_no);
    this.selectedLocation.get('ParkingNo').setValue(item.parking_no);

    this.existedLocation.get('LocationList').disable({onlySelf: true});
    this.selectedLocation.get('CarPlat').disable({onlySelf: true});

    //check if form is active mode of not active
  }

  getRemainingFlag(data) {
    var RemainingTime = this.getRemainingTime(data);
    console.log(RemainingTime);
    //if active more than 5 minute (300000) Activate timeWatcherFlag
    //else turn to new request
    if (RemainingTime >= this.DefaultWatchExitTimer) {
      this.timeCounterFlag(RemainingTime);
      return true;
    } else {
      return false;
    }
  }

  inputChanged(item){
    console.log(item);
  }

  getRemainingTime(data) {
    var endTime = new Date(data);
    return (endTime.getTime() - (this.CurrentLocalTime.getTime()));
  }

  timeCounterFlag(RemainingTime) {
    console.log("timeCounterFlag Activate", RemainingTime);
    
    this.DestroyTimer = setTimeout(() => {
      if(RemainingTime < this.DefaultWatchExitTimer){
        //turn to new request
        this.ActiveStatus = false;
        console.log("watch time Expired: Turn to create new request")
      }else{
        this.RemainingExistTime = RemainingTime - 1000;
        this.timeCounterFlag(this.RemainingExistTime);
      }
    }, 1000);
  }

  toggleMinusHour() {
    if (this.timeCurrentInit > 0) {
      console.log(this.currentHourInfo);
      this.timeCurrentInit--;
      this.currentHourInfo = this.hourDetails[this.timeCurrentInit];
    }
  }

  toggleAddHour() {
    if (this.timeCurrentInit < this.timeLastInit - 1) {
      console.log(this.currentHourInfo);
      this.timeCurrentInit++;
      this.currentHourInfo = this.hourDetails[this.timeCurrentInit];
    }
  }

  onSend() {
    var endTimeToSend;
    if(this.ActiveStatus)
      endTimeToSend = this.EndTime;
    else  
      endTimeToSend = this.EndTimeExist;

    var sendItem = {
      location: this.selectedLocation.value.LocationList,
      car_plat: this.selectedLocation.value.CarPlat,
      parking_no: this.selectedLocation.value.ParkingNo,
      submit_time: this.CurrentLocalTime,
      end_time: endTimeToSend,
      hour_id: this.currentHourInfo.id
    };

    this.detailService.set('parking_list', sendItem);

    this.turnOffTimer();

    this.router.navigate(['']);
  }

  back(){
    this.turnOffTimer();
    this.router.navigate(['']);
  }

  turnOffTimer(){
    if(this.DestroyTimer){
      clearTimeout(this.DestroyTimer);
    }
  }

}
