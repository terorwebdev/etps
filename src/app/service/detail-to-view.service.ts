import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailToViewService {

  constructor() { }

  init() {
    this.parkinglistInit();
    this.parkingToViewInit();
  }

  set(db, data) {
    console.log("Save to db " + db + " Data : ", data);
    switch (db) {
      case 'parking_list': {
        this.saveparking(db, data);
        break;
      }
      case 'parking_to_view': {
        this.setToView(db, data);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  update(db, data) {
    console.log("Update to db " + db + " Data : ", data);
    switch (db) {
      case 'parking_list': {
        this.updateparking(db, data);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  updateparking(db, data) {
      localStorage.setItem(db, JSON.stringify(data));
  }

  saveparking(db, data) {
    var item = localStorage.getItem(db);
    if (!item) {
      var saveItem = [data];
      localStorage.setItem(db, JSON.stringify(saveItem));
    } else {
      var rawItem = JSON.parse(item);
      rawItem.push(data);
      localStorage.setItem(db, JSON.stringify(rawItem));
    }
  }

  parkinglistInit() {
    var item = localStorage.getItem('parking_list');
    if (!item) {
      var saveItem = [];
      localStorage.setItem('parking_list', JSON.stringify(saveItem));
    }
  }

  parkingToViewInit() {
    var item = localStorage.getItem('parking_to_view');
    if (!item) {
      var saveItem = {};
      localStorage.setItem('parking_to_view', JSON.stringify(saveItem));
    }
  }

  parkingToViewReset() {
      var saveItem = {};
      localStorage.setItem('parking_to_view', JSON.stringify(saveItem));
  }

  setToView(db, data) {
    var item = localStorage.getItem(db);
    if (!item) {
      var saveItem = {};
      localStorage.setItem(db, JSON.stringify(saveItem));
    } else {
      var rawItem = JSON.parse(item);
      localStorage.setItem(db, JSON.stringify(data));
    }
  }


  get(db) {
    console.log("Get to db " + db);
    var item = undefined;

    switch (db) {
      case 'parking_list': {
        item = localStorage.getItem(db);
        break;
      }
      case 'parking_to_view': {
        item = localStorage.getItem(db);
        //statements; 
        break;
      }
      default: {
        //statements; 
        break;
      }
    }

    return JSON.parse(item);
  }

}
