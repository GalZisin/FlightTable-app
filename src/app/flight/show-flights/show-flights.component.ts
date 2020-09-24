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
  // @ViewChild('dpFromDate', { static: true }) dpFromDate: ElementRef;
  // @ViewChild('dpToDate', { static: true }) dpToDate: ElementRef;
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
    console.log('onInit');
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
    console.log('dpRangePopup: ' + JSON.stringify(this.dpRangePopup.fromDate));
    this.fromDepartureDateFilter =
      this.dpRangePopup.fromDate.year +
      '-' +
      this.dpRangePopup.fromDate.month +
      '-' +
      this.dpRangePopup.fromDate.day;
    this.toDepartureDateFilter =
      this.dpRangePopup.toDate.year +
      '-' +
      this.dpRangePopup.toDate.month +
      '-' +
      this.dpRangePopup.toDate.day;

    this.refreshFlightList();
  }
}
