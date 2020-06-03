import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit, OnDestroy {
  message: string = "";
  id: string = "";
  title: string = "";
  description: string = "";
  unsubscribeGetPost: Subscription;
  unsubscribeUpdatePost: Subscription;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService
  ) {
    this.loaderService.showLoader();
  
    this.unsubscribeGetPost = this.userService.getPostDetails.subscribe(
      (data) => {
        if (data['id']) {
          this.setData(data);
        } else {
          this.unsubscribeGetPost = this.userService.getPost().subscribe(
            (data) => {
              this.setData(data['data']);
            },
            (error) => {
              console.log("Error in getting post", error);
            }
          )
        }
      },
      (error) => {
        console.log("Error while getting post from behavior!!", error);
      }
    );
    this.loaderService.hideLoader();
  }

  ngOnInit(): void { }

  /**
   * This method is used to set previous data into fields.
   * 
   * @param data 
   */
  setData(data: Object) {
    this.id = data['id']
    this.title = data['title'];
    this.description = data['description']; 
  }

  /**
   * This Method is used to update post
   */
  saveChanges() {
    this.loaderService.showLoader();
    let postUpdates = {};
    if (this.title.trim() !== "") postUpdates['title'] = this.title;
    if (this.description.trim() !== "") postUpdates['description'] = this.description;
    if (postUpdates['title'] || postUpdates['description']) {
      this.unsubscribeUpdatePost = this.userService.editPost(postUpdates, this.id).subscribe(
        (data) => {
          this.message = "Updated Successfully";
          this.title = "";
          this.description = "";
        },
        (err) => {
          this.message = err.error.message;
        }
      )
    }
    this.message = "Please Fill fields to update post";
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    if (this.unsubscribeUpdatePost) this.unsubscribeUpdatePost.unsubscribe();
    if (this.unsubscribeGetPost) this.unsubscribeGetPost.unsubscribe();
  }
}
