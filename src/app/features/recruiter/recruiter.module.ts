import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { RecruiterComponent } from "./recruiter.component";



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http' 
import { AppRoutingModule } from "src/app/app-routing.module";
import { RecruiterService } from "./recruiter.service";


@NgModule({
  declarations: [

    RecruiterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [RecruiterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [RecruiterService],
  bootstrap:[RecruiterComponent]

}
)
export class RecruiterModule {}
