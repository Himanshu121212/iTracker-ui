import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { GoogleLoginProvider, SocialLoginModule } from "angularx-social-login";
import { AuthGuardService } from "./auth-guard.service";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileService } from "./profile.service";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { MatMenuModule } from "@angular/material/menu";
import { HttpClientModule } from "@angular/common/http";
import { RecruiterModule } from "./features/recruiter/recruiter.module";
import { RecruiterService } from "./features/recruiter/recruiter.service";
import { RecruiterComponent } from "./features/recruiter/recruiter.component";
import { PanelistModule } from "./features/panelist/panelist.module";
import { SlotsService } from "./slots.service";
import { ViewSlotComponent } from "./features/panelist/view-slot/view-slot.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    ProfileComponent,
  ],
  imports: [
    //Dependency Modules
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      {
        path: "profile",
        component: MainPageComponent,
        canActivate: [AuthGuardService],
      },
    ]),
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    HttpClientModule,

    //Componenet Modules
    SocialLoginModule,
    PanelistModule,
    RecruiterModule,

    //Material Modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    NgbModule,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "408208327082-571vttplk0c4fq06n7i6023kikjj65p5.apps.googleusercontent.com"
            ),
          },
        ],
      },
    },
    AuthGuardService,
    ProfileService,
    RecruiterService,
    SlotsService,
    DatePipe
  ],
  bootstrap: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    MainPageComponent,
    RecruiterComponent,
    ViewSlotComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
