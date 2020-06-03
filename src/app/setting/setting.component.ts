import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent implements OnInit, OnDestroy {
  message: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  unsubscribeDeleteUser: Subscription;
  unsubscribeUserUpdate: Subscription;

  constructor (
    private userService: UserService,
    private loaderService : LoaderService) { }

  ngOnInit(): void { }

  /**
   * this method is used to update user password. 
   */
  updateUser() {
    this.loaderService.showLoader();

    if (this.newPassword === this.confirmPassword) {
      if (this.password && this.password.trim().length) {
        const userUpdates = {
          oldPassword: this.password,
          newPassword: this.newPassword
        }
        this.unsubscribeUserUpdate = this.userService.editUserProfile(userUpdates).subscribe(
          (data) => {
            this.message = "Updated !!";
          },
          (error) => {
            this.message = "Error in Updation, please try again later!!";
            console.log(error);
          }
        );
      } else {
        this.message = "Please Enter Current Password";
      }
    } else {
      this.message = "Both New Password and Confirm Password field should be same";
    }
    
    this.loaderService.hideLoader();
  }

  /**
   * This method confirm the user account deletion.
   */
  getConfirmation() {
    var confirmation = confirm("Do you really want to delete account ?");
    if (confirmation === true) {
      // this.removeAccount();
      alert("Account Deleted");
    }
  }

  /***
   * Method is used for deleting the user account
   */
  removeAccount() {
    this.loaderService.showLoader();
    this.unsubscribeDeleteUser = this.userService.deleteAccount().subscribe(
      (data) => {
        console.log("Account Deleted...");
        this.userService.logout();
      },
      (error) => {
        console.log("Error in account Deletion", error);
      }
    );
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    if (this.unsubscribeUserUpdate) this.unsubscribeUserUpdate.unsubscribe();
    if (this.unsubscribeDeleteUser) this.unsubscribeDeleteUser.unsubscribe();
  }
}
