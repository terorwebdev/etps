import { Component, OnInit } from '@angular/core';
import { DetailToViewService } from '../service/detail-to-view.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  panelOpenState = false;
  MyCarList: any;

  constructor(private detailService: DetailToViewService) {}

  ngOnInit() {
    this.MyCarList = this.detailService.get('parking_list');
  }

  removeMyCar(item){
    for(var i = 0; i< item.length; i++){
      this.MyCarList = this.MyCarList.filter( value => value.car_plat != item[i].value.car_plat);
    }

    //set to storage
    //console.log(this.MyCarList);
    this.detailService.update('parking_list', this.MyCarList);
  }

}
