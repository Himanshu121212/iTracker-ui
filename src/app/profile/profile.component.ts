import { Component, OnInit, TemplateRef } from "@angular/core";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";

import { ProfileService } from "../profile.service";
import { IProfile } from "../profile";
import { ISkill } from "../skill";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService,
    private modalService: BsModalService,
    private _profileServive: ProfileService
  ) {}

  form: any = {
    primary_skill: "Java",
    secondary_skill: "React",
    tertiary_skill: "JavaScript",
  };

  public profile: IProfile;
  public skills: ISkill[] = [];
  modalRef?: BsModalRef;
  public user: SocialUser;
  loggedIn: boolean;
  public editSkillForm: any;
  public updated_skill:any;

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
     // this.redirectToPage();
    });

    this._profileServive
      .getSkillInfo(7)
      .subscribe((response: ISkill[]) => (this.skills = response));

    this._profileServive
      .getProfileInfo(this.user.email)
      .subscribe((response: IProfile) => {
        this.profile = response;
        this.router.navigate(["profile"]);
        // alert(this.profile.userRole.role);
        // if (this.profile.userRole.role == "Recruiter") {
        //   this.router.navigate(["recruiter"]);
        // } else if (this.profile.userRole.role == "interviewer") {
        //   this.router.navigate(["panelist"]);
        // } else {
        //   this.router.navigate(["profile"]);
        // }
      });


    // alert(this.profile.userRole.role);
    // if (this.profile.userRole.role == "Recruiter") {
    //   this.router.navigate(["recruiter"]);
    // } else if (this.profile.userRole.role == "interviewer") {
    //   this.router.navigate(["panelist"]);
    // } else {
    //   this.router.navigate(["profile"]);
    // }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  updateSkillInfo(editSkillForm) {
    console.log(editSkillForm.value);
    let userRole = this.skills[0].userRole;
//     this.updated_skill = [
// ,
// {userRole: userRole, skill: editSkillForm.value['secondary_skill'], round: 2},
// {userRole: userRole, skill: editSkillForm.value['tertiary_skill'], round: 3}];
    // console.log(this.updated_skill);
try {
  this._profileServive
      .deleteprofileInfo().subscribe((data)=>{
        console.log('del req : ', data);
      });

  this._profileServive.updateSkillInfo(userRole.userId, {userRole: userRole, skill: editSkillForm.value['primary_skill'], round: 1})
  .subscribe((data) => {
    console.log('post req : ', data);
  });
  this._profileServive.updateSkillInfo(userRole.userId, {userRole: userRole, skill: editSkillForm.value['secondary_skill'], round: 2})
  .subscribe((data) => {
    console.log('post req : ', data);
  });
  this._profileServive.updateSkillInfo(userRole.userId, {userRole: userRole, skill: editSkillForm.value['tertiary_skill'], round: 3})
  .subscribe((data) => {
    console.log('post req : ', data);
  });
} catch (err) {
  console.log('error in saving skills : ', err)
}
  }

  logout(): void {
    this.socialAuthService
      .signOut()
      .then(() => this.router.navigate(["login"]));
  }

redirectToPage= () => {
  if (this.profile.userRole.role == "Recruiter") {
       this.router.navigate(["recruiter"]);
    } else if (this.profile.userRole.role == "interviewer") {
      this.router.navigate(["panelist"]);
    } else {
      this.router.navigate(["profile"]);
    }
  throw new Error("Function not implemented.");
}
}

function payload(payload: any) {
  throw new Error("Function not implemented.");
}

