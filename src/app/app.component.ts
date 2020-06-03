import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';
import { LoaderService } from './services/loader.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private userService: UserService,
    private globalService: GlobalService,
    public loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  isUserLoggedIn(): boolean {
    return this.globalService.isUserLoggedIn();
  }

  LogOut() {
    this.globalService.redirectUrl = null;
    this.userService.logout();
  }
}
