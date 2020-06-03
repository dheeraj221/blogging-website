import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageService } from './localStorage.service';
import { GlobalService } from './global.service';
import { LoaderService } from './loader.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(
    private loaderService: LoaderService,
    private globalService: GlobalService,
    private userService: UserService,
    private localStorageService: LocalStorageService) {
  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): boolean {
    this.globalService.redirectUrl = activatedRouteSnapshot['_routerState']['url'];
    const accessToken = this.localStorageService.getKeyData("access_token");
    
    if (!accessToken || accessToken.trim().length === 0) {
      alert("Please Login first to continue...")
      this.loaderService.hideLoader();
      this.userService.logout();
      return false;
    }

    return true;
  }
}
