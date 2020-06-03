import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { LocalStorageService } from '../services/localStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerUnsubscribe: Subscription;
  message: string;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    if (this.localStorageService.getKeyData("user_id")) {
      this.router.navigate(['users']);
    }
  }

  /**
   * This method is used to clean all fields after new user registration
   */
  clearFields() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }

  /**
   * This method is used to add new user.
   */
  registerUser() {
    this.loaderService.showLoader();
    if (this.password === this.confirmPassword) {
      const registerUserData = {
        username: this.name,
        email: this.email,
        password: this.password
      }
      this.registerUnsubscribe = this.userService.register(registerUserData).subscribe(
        (dataFromServer) => {
          this.message = "Successfully Registered";
          this.clearFields();
        },
        (err) => {
          console.log("Login Error");
          this.message = err.error.message;
        }
      );
    } else {
      this.message = "Password Doesn't Match";
      console.log(this.message);
    }
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    if (this.registerUnsubscribe) {
      this.registerUnsubscribe.unsubscribe();
    }
  }
}
