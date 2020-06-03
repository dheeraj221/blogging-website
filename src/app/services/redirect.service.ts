import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from './localStorage.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class RedirectService implements CanActivate {
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private localStorageService: LocalStorageService) {
  }

  canActivate(): boolean {
    this.globalService.redirectUrl = this.router.url;
    console.log(this.router.url);
    return true;
  }
}
