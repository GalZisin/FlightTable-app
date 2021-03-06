import { Component, ViewChild } from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from './shared.service';

@Component({
  selector: 'ngbd-datepicker-range-popup',
  templateUrl: './datepicker-range-popup.html',
  styles: [
    `
      .dateInput {
        margin: 5px !important;
      }
      .form-group.hidden {
        width: 0;
        margin: 0;
        border: none;
        padding: 0;
      }
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: rgb(2, 117, 216);
        color: white;
      }
      .custom-day.faded {
        background-color: rgba(2, 117, 216, 0.5);
      }
    `,
  ],
})
export class NgbdDatepickerRangePopup {
  @ViewChild('datepicker') elDatepicker: NgbInputDatepicker;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private serviceData: SharedService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    let cpickdata = '';
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;

      let fromDateYear = this.fromDate.year.toString();
      let fromDateMonth = this.fromDate.month.toString();
      let fromDateDay = this.fromDate.day.toString();
      let toDateYear = this.toDate.year.toString();
      let toDateMonth = this.toDate.month.toString();
      let toDateDay = this.toDate.day.toString();

      let fromDateFormated =
        fromDateYear + '-' + fromDateMonth + '-' + fromDateDay;
      let toDateFormated = toDateYear + '-' + toDateMonth + '-' + toDateDay;

      cpickdata =
        this.fromDate.year.toString() +
        this.fromDate.month.toString() +
        this.fromDate.day.toString() +
        this.toDate.year.toString() +
        this.toDate.month.toString() +
        this.toDate.day.toString();
      // this.serviceData.changeDatePickData(cpickdata);
      this.serviceData.filter(fromDateFormated + ':' + toDateFormated);
      console.log(
        'changeDatePickData: ' + fromDateFormated + ':' + toDateFormated
      );

      this.elDatepicker.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
