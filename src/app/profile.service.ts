import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProfile } from "./profile";
import { ISkill } from "./skill";

@Injectable()
export class ProfileService {
  // private _url: string = "http://localhost:8080/users/";
  private _url: string = "users-api-link";
  private _skillsurl: string = "skills-api-link";
  private _skillsurld: string = "skilld-2-api-link";
  private http: HttpClient;
  //private _url: string = "http://ec2-3-111-33-68.ap-south-1.compute.amazonaws.com:8080/users/harsh.arora@accolitedigital.com";

  
  constructor(private httpclient: HttpClient) { }

  
  getProfileInfo(_emailId: string): Observable<IProfile> {
    return this.httpclient.get<IProfile>(`${this._url}/${_emailId}`);
  }
  deleteprofileInfo():Observable<any>{
    console.log("deleted");
    
    return this.httpclient.delete(`${this._skillsurld}?sid=${2}`);
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
