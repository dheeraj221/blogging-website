import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: Object
  public userUnsubscribe: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private loaderService: LoaderService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.userUnsubscribe = this.userService.getUser().subscribe(
      (userData) => {
        this.user = userData['data'];
      },
      (error) => {
        console.log("User Profile Display Error ==> ", error);
      }
    );
    this.loaderService.hideLoader();
  }

  /**
   * This method convert date format.
   * @param date 
   */
  dateFormat(date: string) {
    return this.globalService.dateFormat(date);
  }

  /**
   * this method set value in BehaviorSubject before naviagation to next component.
   */
  updateUser() {
    this.userService.userSubject.next(this.user);
    this.router.navigate(['users/edit-user']);
  }

  ngOnDestroy() {
    if (this.userUnsubscribe) {
      this.userUnsubscribe.unsubscribe();
    }
  }
}
