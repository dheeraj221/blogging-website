import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { LocalStorageService } from '../services/localStorage.service';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit, OnDestroy {
  public allPosts: Array<Object>;
  unsubscribeGetAllPost: Subscription;
  unsubscribeDeleteUser: Subscription;
  unsubscribeDeletePost: Subscription;

  constructor(
    private globalService: GlobalService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.unsubscribeGetAllPost = this.userService.getAllPost().subscribe(
      (postData) => {
        this.allPosts = postData['data'];
      },
      (error) => {
        console.log("Error in UserComponent finding all posts => ", error);
      }
    ) 
    this.loaderService.hideLoader();
  }

  /**
   * This Method protect post from deletion by mistake..
   * 
   * @param postId: Id of post which user want to delete 
   * 
   * @param index index of the post
   */
  getConfirmation(postId: string, index: number) {
    var confirmation = confirm("Do you want to delete Post ? ");
    if (confirmation === true) {
      this.removePost(postId, index);
    }
  }

  /**
   * This method is used to delete post
   * 
   * @param postId 
   * 
   * @param index 
   */
  removePost(postId: string, index: number) {
    this.loaderService.showLoader();
    this.unsubscribeDeletePost = this.userService.deletePost(postId).subscribe(
      (data) => {
        this.loaderService.hideLoader();
        alert("Post Deleted successfully");
        this.allPosts.splice(index, 1);
      },
      (error) => {
        console.log("ERROR in Deletion Post => ", error)
      }
    );
  }

  /**
   * This method is used to set value of behaviorSubject to save getPost API calling
   * and navigate to next component edit-post
   * 
   * @param post
   */
  editPost(post: Object) {
    this.localStorageService.setKey("post_id", post['id']);
    this.userService.postSubject.next(post);
    this.router.navigate(['users/edit-post']);
  }

  /**
   * This method is used to display particular post from all the posts
   * 
   * @param post 
   */
  showPost(post: Object) {
    this.localStorageService.setKey("post_id", post['id']);
    this.userService.postSubject.next(post);
    this.router.navigate(['users/show-post']);
  }

  /**
   * This method return total time from post creation to till now
   * 
   * @param date 
   */
  dateFormat(date: string) {
    return this.globalService.dateFrom(date);
  }

  ngOnDestroy() {
    if (this.unsubscribeGetAllPost) this.unsubscribeGetAllPost.unsubscribe();
    if (this.unsubscribeDeleteUser) this.unsubscribeDeleteUser.unsubscribe();
    if (this.unsubscribeDeletePost) this.unsubscribeDeletePost.unsubscribe();
  }
}
