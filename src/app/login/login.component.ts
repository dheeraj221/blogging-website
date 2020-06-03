import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  message: string;
  email: string;
  password: string;
  loginUnsubscribe: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private globalService: GlobalService,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    if (this.localStorageService.getKeyData("user_id")) {
      this.router.navigate(['users']);
    }
  }

  /**
   * This method is used for login user and save token
   *  
   * @param email
   *  
   * @param password 
   */
  loginRequest() {

    this.loaderService.showLoader();
    this.loginUnsubscribe = this.userService.login({
      email: this.email,
      password: this.password
    }).subscribe(
      (data) => {
        const accessToken = data["data"].accessToken;
        const userId = data["data"].id;
        this.localStorageService.setKey('user_id', userId);
        this.localStorageService.setKey('access_token', accessToken);
        this.globalService.userDetails.next({
          id: userId
        })
        if (this.globalService.redirectUrl) {
          this.router.navigate([this.globalService.redirectUrl])
        }
        else {
          this.router.navigate(['users']);
        }
      },
      (err) => {
        console.log(err);
        this.message = err.error.message;
      }
    );
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    if (this.loginUnsubscribe) {
      this.loginUnsubscribe.unsubscribe();
    }
  }

  /**
   * TODO : 
   * Temporary method to fill login data 
   * Delete This function when project completed
   */
  fillTempData() {
    this.email = "dheeraj123@gmail.com";
    this.password = "Password@123";
  }
}

