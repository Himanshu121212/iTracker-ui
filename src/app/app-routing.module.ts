import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { AddslotsComponent } from "./features/panelist/addslots/addslots.component";
import { PanelistComponent } from "./features/panelist/panelist.component";
import { ViewSlotComponent } from "./features/panelist/view-slot/view-slot.component";
import { RecruiterComponent } from "./features/recruiter/recruiter.component";
import { ProfileComponent } from "./profile/profile.component";



const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
   {path: 'profile', component: ProfileComponent},
   {path:'recruiter',component:RecruiterComponent},
   {path:'panelist',component:PanelistComponent},
   {path: 'view-slots', component: ViewSlotComponent},
   {path: 'add-slots', component: AddslotsComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
