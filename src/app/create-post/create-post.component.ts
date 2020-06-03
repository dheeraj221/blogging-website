import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnDestroy {
  public message: string;
  public title: string;
  public description: string;
  unsubscribeCreatePost: Subscription;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService
  ) { }

  /**
   * This method is used to create post.
   */
  createPost() {
    this.loaderService.showLoader();
    
    this.unsubscribeCreatePost = this.userService.createPost({
      title: this.title,
      description: this.description
    }).subscribe(
      (data) => {
        alert("Post Created Successfully..");
        this.title = "";
        this.description = "";
      },
      (err) => {
        this.message = err.error.message;
      }
    )
    
    this.loaderService.hideLoader();
  }

  ngOnDestroy() {
    if (this.unsubscribeCreatePost) {
      this.unsubscribeCreatePost.unsubscribe();
    }
  }
}
