import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProfile } from "./profile";
import { ISkill } from "./skill";

@Injectable()
export class ProfileService {
  // private _url: string = "http://localhost:8080/users/";
  private _url: string = "http://localhost:8080/users";
  private _skillsurl: string = "http://localhost:8080/skills";
  private _skillsurld: string = "http://localhost:8080/him";
  private http: HttpClient;
  
  constructor(private httpclient: HttpClient) { }

  
  getProfileInfo(_emailId: string): Observable<IProfile> {
    return this.httpclient.get<IProfile>(`${this._url}/${_emailId}`);
  }
  deleteprofileInfo():Observable<any>{
    console.log("deleted");
    
    return this.httpclient.delete(`${this._skillsurld}?sid=${7}`);
  }
 updateSkillInfo(_userId, payload):Observable<any>{
   console.log("haha");
        return this.httpclient.post(`${this._skillsurl}`,payload);
  }
  getSkillInfo(_userId: number): Observable<ISkill[]> {
    return this.httpclient.get<ISkill[]>(`${this._skillsurl}?id=${_userId}`);
}

  //     getProfileInfo(): any{
  // 		return this.http.get(this._url,  {responseType: 'blob'});
  //    }
}
