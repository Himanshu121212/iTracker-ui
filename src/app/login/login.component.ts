import { Component, OnInit } from "@angular/core";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { Router } from "@angular/router";
import { ProfileService } from "../profile.service";
import { IProfile } from "../profile";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public user: SocialUser;
  loggedIn: boolean;
  private profile: IProfile;

  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService,
    private _profileServive: ProfileService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
    this._profileServive
      .getProfileInfo(this.user.email)
      .subscribe((response: IProfile) => {
        this.profile = response;
        //alert(this.profile.userRole.role);
      });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.redirectToPage()
      // alert(this.profile.userRole.role);
      // if (this.profile.userRole.role == "Recruiter") {
      //   this.router.navigate(["recruiter"]);
      // } else if (this.profile.userRole.role == "interviewer") {
      //   this.router.navigate(["panelist"]);
      // } else {
      //   this.router.navigate(["profile"]);
      // }
    });
  }
  redirectToPage= () => {
    this.router.navigate(["profile"]);
    if (this.profile.userRole.role == "Recruiter") {
         this.router.navigate(["recruiter"]);
      } else if (this.profile.userRole.role == "interviewer") {
        this.router.navigate(["panelist"]);
      } else {
        this.router.navigate(["profile"]);
      }
    throw new Error("Function not implemented.");
  }

  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
  //     this._profileServive
  //       .getProfileInfo(this.user.email)
  //       .subscribe((response: IProfile) => (this.currentprofile = response));
  //     alert(this.currentprofile.userRole.role);
  //     if (this.currentprofile.userRole.role == "Recruiter") {
  //       this.router.navigate(["recruiter"]);
  //     } else if (this.currentprofile.userRole.role == "interviewer") {
  //       this.router.navigate(["panelist"]);
  //     } else {
  //       this.router.navigate(["profile"]);
  //     }
  //   });
  // }

  // refreshToken() {
  //   this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  //   console.log(this.user.name);
  // }
}
function logOut() {
  throw new Error("Function not implemented.");
}
