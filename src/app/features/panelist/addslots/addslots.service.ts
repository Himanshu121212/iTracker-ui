import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddslotsService {
  constructor(private httpclient: HttpClient) { }

  
  
  slotsUrl = "Interview-api-link";

  saveUser(user:any): Observable<any>{
    
    return this.httpclient.post(this.slotsUrl, user);
    
  }
  
  /*saveUser(user:any): Observable<any>{
    
    return this.httpclient.post("http://localhost:3000/users",user);
  }*/
}