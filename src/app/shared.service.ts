import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'https://localhost:44349/api';
  constructor(private http: HttpClient) {}

  // private datePickData = new BehaviorSubject<string>('');

  // currentDatePickData = this.datePickData.asObservable();

  // changeDatePickData(message: string) {
  //   this.datePickData.next(message);
  // }

  public _listeners = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  getFlightList(
    destinationCountryFilter,
    fromDepartureDateFilter,
    toDepartureDateFilter
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.APIUrl +
        '/flights/' +
        destinationCountryFilter +
        '/' +
        fromDepartureDateFilter +
        '/' +
        toDepartureDateFilter
    );
  }
}
