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
    return this.http.get<any[]>( "http://localhost:8080/User/Interview/booked?i_id=2");
  }

  getInfo()
  {
    return this.http.get<any>( "http://localhost:8080/user/2");
  }

  getSkills()
  {
    return this.http.get<any[]>(" http://localhost:8080/skills?id=2")
  }
}
