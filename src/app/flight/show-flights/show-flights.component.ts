import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared.service';
import { NgbdDatepickerRangePopup } from '../../datepicker-range-popup';
@Component({
  selector: 'app-show-flights',
  templateUrl: './show-flights.component.html',
  styleUrls: ['./show-flights.component.css'],
})
export class ShowFlightsComponent implements OnInit {
  @ViewChild(NgbdDatepickerRangePopup) dpRangePopup: NgbdDatepickerRangePopup;
  flightList: any = [];
  destinationCountryFilter: string = '';
  fromDepartureDateFilter: string = '';
  toDepartureDateFilter: string = '';

  constructor(private service: SharedService) {
    // this.service.currentDatePickData.subscribe((message) => {
    //   console.log('message: ' + message);
    //   if (message != null && message != '') {
    //     this.refreshFlightList();
    //   }
    // });
    this.service.listen().subscribe(
      (m: any) => {
        console.log('m: ' + m);
        let dateArray: string[] = m.split(':');

        this.fromDepartureDateFilter = dateArray[0];
        this.toDepartureDateFilter = dateArray[1];
        this.refreshFlightList();
      },
      (error) => {
        console.log('error: ' + JSON.stringify(error.error));
      }
    );
  }

  ngOnInit(): void {
    this.refreshFlightList();
  }
  refreshFlightList() {
    console.log('dpRangePopup' + this.dpRangePopup);
    if (!this.dpRangePopup == undefined) {
      let month: string = this.dpRangePopup.fromDate.month.toString();
      if (month.length < 2) {
        month = '0' + month;
      }
      let day: string = this.dpRangePopup.fromDate.day.toString();
      if (day.length < 2) {
        day = '0' + day;
      }

      this.fromDepartureDateFilter =
        this.dpRangePopup.fromDate.year + '-' + month + '-' + day;

      month = this.dpRangePopup.toDate.month.toString();
      if (month.length < 2) {
        month = '0' + month;
      }
      day = this.dpRangePopup.toDate.day.toString();
      if (day.length < 2) {
        day = '0' + day;
      }

      this.toDepartureDateFilter =
        this.dpRangePopup.toDate.year + '-' + month + '-' + day;
    }
    this.service
      .getFlightList(
        this.destinationCountryFilter == ''
          ? '-'
          : this.destinationCountryFilter,
        this.fromDepartureDateFilter == '' ? '-' : this.fromDepartureDateFilter,
        this.toDepartureDateFilter == '' ? '-' : this.toDepartureDateFilter
      )
      .subscribe((data) => {
        this.flightList = data;
      });
  }

  FilterFn() {
    this.refreshFlightList();
  }
}
