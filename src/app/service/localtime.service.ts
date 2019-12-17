import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocaltimeService {
  
  Times: any[];

  URL = "http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur";

  constructor(private httpClient: HttpClient) { }

  public get_time_now(): Observable<any> {
    return this.httpClient.get(this.URL)
    .pipe(
      map(response => response));
  }

  public setCurrentTime(data) {
      sessionStorage.setItem('time', data);
  }

  public getCurrentTime() {
    return sessionStorage.getItem('time');
}

}
