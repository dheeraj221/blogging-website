import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as moment from 'moment/moment.js';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  public redirectUrl: string;
  public userDetails = new BehaviorSubject<Object>({});
  public getUserDetails = this.userDetails.asObservable()

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * This method return the time from date to till now
   *  
   * @param date : string
   * 
   * @return total_Time : string
   */
  dateFrom(date: string): string {
    return moment(date).fromNow();
  }

  /**
   * This method return the time from date to till now
   *  
   * @param date : string
   * 
   * @return date in format Date MonthName Year: string
   */
  dateFormat(date: string): string {
    return moment(date).format("DD MMMM, YYYY");
  }

  /**
   * This Method Return true or false on the basis of 
   * user status: Logged In/ Not Logged In
   */
  isUserLoggedIn(): boolean {
    let token = this.localStorageService.getKeyData("access_token");
    if (token) {
      return true;
    }
    return false;
  }
}