import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {slot_dates} from './slot_dates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {

//  private _url="http://ec2-3-111-33-68.ap-south-1.compute.amazonaws.com:8080/User/Interview/all?i_id=6";
  
  private _url2="/assets/dummy-data/slot_dates.json";


  private _url3="Interview-api-link";
  constructor(private http:HttpClient) {
  }

  getSlots() :Observable<slot_dates[]>
  {
    return this.http.get<slot_dates[]>(this._url3);
  }
  
  getS() :Observable<slot_dates["date"]>
  {
    return this.http.get<slot_dates["date"]>(this._url2);
  }

}
