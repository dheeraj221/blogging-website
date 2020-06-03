import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit, OnDestroy {
  message: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  unsubscribeGetUser: Subscription;
  unsubscribeUserUpdate: Subscription;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService
  ) {
    this.loaderService.showLoader();
    this.unsubscribeGetUser = this.userService.getUserData.subscribe(
      (data) => {
        if (data['data']) {
          this.setData(data);
        } else {
          this.unsubscribeGetUser = this.userService.getUser().subscribe(
            (data) => {
              this.setData(data['data']);
            },
            (error) => {
              console.log("Error in getting User data from API calling => ", error);
            }
          )
        }
      },
      (error) => {
        console.log("Error in getting User data from behaviorSubject => ", error);
      }
    )
    this.loaderService.hideLoader();
  }

  ngOnInit(): void {
  }

  /**
   * This method is used to set previous data into user fields.
   * 
   * @param data 
   */
  setData(data: Object) {
    this.name = data['username'];
    this.email = data['email']; 
  }

  /**
   * this method is used for update user data 
   */
  updateUser() {
    this.loaderService.showLoader();
    const userUpdates = {
      username: this.name,
      email: this.email,
      oldPassword: this.password,
    }
  
    this.unsubscribeUserUpdate = this.userService.editUserProfile(userUpdates).subscribe(
      (data) => {
        this.message = "Updated !!";
      },
      (error) => {
        console.log("Error in update User data ",error);
        this.message = "Error in Updation, please try again later!!";
      }
    );
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    if (this.unsubscribeGetUser) this.unsubscribeGetUser.unsubscribe();
    if (this.unsubscribeUserUpdate) this.unsubscribeUserUpdate.unsubscribe();
  }
}
