import { Component, OnInit, DoCheck } from '@angular/core';
import { DetailToViewService } from '../../service/detail-to-view.service';
import { LocaltimeService } from '../../service/localtime.service';
//import sampleData from '../infodetails.json';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit, DoCheck {

  //typesOfShoes: string[] = [ 'Clogs'];
  //typesOfShoes: any = sampleData;
  ListUserDetails: any;

  CurrentLocalTime: any;

  RemainingTime: any;

  constructor(private timeService: LocaltimeService,
    private detailService: DetailToViewService) { }

  ngOnInit() {
    this.ListUserDetails = this.detailService.get('parking_list');
    this.detailService.parkingToViewReset();
  }

  ngDoCheck() {
    this.CurrentLocalTime = new Date(this.timeService.getCurrentTime());
  }

  public getRemainingTime(data) {
    var endTime = new Date(data);
    this.RemainingTime = (endTime.getTime() - (this.CurrentLocalTime.getTime()));
    //console.log("Current : "+this.CurrentLocalTime);
    //console.log("End : "+endTime);
    //console.log("Remaining : " + (this.RemainingTime / 1000));
    if (this.RemainingTime > 0)
      return this.RemainingTime / 1000;
    else
      return 0;
  }

  toView(item){
    this.detailService.set('parking_to_view', item);
  }

}
