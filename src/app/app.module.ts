import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { ShowFlightsComponent } from './flight/show-flights/show-flights.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerRangePopup } from './datepicker-range-popup';

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    ShowFlightsComponent,
    NgbdDatepickerRangePopup,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [SharedService],
  exports: [NgbdDatepickerRangePopup],
  bootstrap: [AppComponent, NgbdDatepickerRangePopup],
})
export class AppModule {}
