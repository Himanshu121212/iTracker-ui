import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class RecruiterService {

  private _url: string = "../../assets/data/slots.json"
  constructor(private http:HttpClient) { }

  /*getSlots()
  {
    return this.http.get<any[]>(this._url);
  }
  */
  getSlots()
  {
    return this.http.get<any[]>( "booked-api-link");
  }

  getInfo()
  {
    return this.http.get<any>( "users-api-link");
  }

  getSkills()
  {
    return this.http.get<any[]>("skils-api-link")
  }
}
