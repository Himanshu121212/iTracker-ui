import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewSlotComponent } from "./view-slot/view-slot.component";
import { AddslotsComponent } from "./addslots/addslots.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddslotsService } from "./addslots/addslots.service";
import { PanelistComponent } from './panelist.component';

@NgModule({
  declarations: [ViewSlotComponent, AddslotsComponent, PanelistComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [AddslotsService],
  exports: [
    ViewSlotComponent,
    AddslotsComponent,
    //EventsComponent,
  ],
})
export class PanelistModule {}
