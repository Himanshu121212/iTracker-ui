import { Component, OnInit } from "@angular/core";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent {
  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService
  ) {}

  logout(): void {
    this.socialAuthService
      .signOut()
      .then(() => this.router.navigate(["login"]));
  }
}
