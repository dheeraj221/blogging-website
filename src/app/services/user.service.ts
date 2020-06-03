import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  postId: string;
  userId: string;
  public url: string = "http://localhost:8000/users";
  // postId = this.localStorageService.getKeyData("post_id");
  // userId = this.localStorageService.getKeyData("user_id");
  public userSubject = new BehaviorSubject<Object>({});
  public getUserData = this.userSubject.asObservable();

  public postSubject = new BehaviorSubject<Object>({});
  public getPostDetails = this.postSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
    private globalService: GlobalService,
    private localStorageService: LocalStorageService
    ) {
    this.globalService.getUserDetails.subscribe(
      (data) => {
        if (data['id']) {
          this.userId = data['id'];
        } else {
          this.userId = this.localStorageService.getKeyData("user_id");
        }
      }, 
      (err) => {
        console.log(err);
      }
    ) 
    this.postId = this.localStorageService.getKeyData("post_id");
  }

  /**
  * This method is used for LogIn.
  * 
  * @param UserLoginData : 
  * 
  * @return <Observable> 
  */
  login(UserLoginData: Object) {
    return this.http.post<Object>(`${this.url}/login`, UserLoginData);
  }

  /**
   * This method return the find and return user data by Id 
   */
  getUser() {
    return this.http.get(`${this.url}/${this.userId}`);
  }

  /**
   * This method is used to Add New User
   * @param UserRegisterData 
   */
  register(UserRegisterData: Object) {
    return this.http.post<Object>(`${this.url}/sign-up`, UserRegisterData);
  }

  /**
   * This method is used to delete user data
   */
  deleteAccount() {
    return this.http.delete(`${this.url}/${this.userId}`);
  }

  /**
   * This method is used to update the existing user data
   * @param userUpdates 
   */
  editUserProfile(userUpdates: Object) {
    return this.http.put<Object>(`${this.url}/${this.userId}`, userUpdates);
  }

  /**
   * This method returns the particular post of user by post-id.
   * 
   * @return <Observable>
   */
  getPost() {
    return this.http.get(`${this.url}/${this.userId}/posts/${this.postId}`);
  }

  /**
   * This method returns all the post of User.
   * 
   * @return <Observable>
   */
  getAllPost() {
    return this.http.get(`${this.url}/${this.userId}/posts`);
  }

  /**
   * This method is used to create New Post.
   * 
   * @param postData
   * 
   * @return <Observable> 
   */
  createPost(postData: Object) {
    return this.http.post<Object>(`${this.url}/${this.userId}/posts`, postData);
  }

  /**
   * This method is used to edit/update post of User.
   * 
   * @param postUpdates: Object 
   * 
   * @return <Observable>
   */
  editPost(postUpdates: Object, id: string) {
    return this.http.put<Object>(`${this.url}/${this.userId}/posts/${id}`, postUpdates);
  }

  /**
   * This method is used to delete Post
   * 
   * @param postId: string 
   * 
   * @return <Observable>
   */
  deletePost(postId: string) {
    return this.http.delete(`${this.url}/${this.userId}/posts/${postId}`);
  }

  /**
   * This method is used for LogOut and before logout, it clears the localStorage.
   */
  logout() {
    this.localStorageService.removeAllKeysData();
    this.router.navigate(['']);
  }
}
