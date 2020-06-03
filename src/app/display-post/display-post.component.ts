import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})

export class DisplayPostComponent implements OnInit, OnDestroy {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  lastUpdate: string;
  author: string;
  unsubscribeGetPost: Subscription;

  constructor(
    private userService: UserService,
    private globalService: GlobalService,
    private loaderService: LoaderService
  ) { 
    this.loaderService.showLoader();
    this.unsubscribeGetPost = this.userService.getPostDetails.subscribe(
      (data) => {
        if (data['id']) {
          this.postValueSet(data);
        } else {
          this.unsubscribeGetPost = this.userService.getPost().subscribe(
            (data) => {
              this.postValueSet(data['data']);
            },
            (error) => {
              console.log("Error While getting post from API.. ", error);
            }
          );
        }
      },
      (error) => {
        console.log("Error while getting post from behavior!!", error);
      }
    );
    this.loaderService.hideLoader();
  }

  ngOnInit(): void {

  }

  /**
   * This method is used to set values into post fields for display.
   * 
   * @param data 
   */
  postValueSet(data: object) {
    this.id = data['id'];
    this.title = data['title'];
    this.description = data['description'];
    this.createdAt = data['createdAt'];
    this.lastUpdate = data['updatedAt'];
    this.author = data['user'].username;
  }

  /**
   * This method is used to convert date format.
   *  
   * @param date 
   */
  dateFormat(date: string) {
    return this.globalService.dateFormat(date);
  }

  ngOnDestroy() {
    if (this.unsubscribeGetPost) {
      this.unsubscribeGetPost.unsubscribe();
    }
  }
}
