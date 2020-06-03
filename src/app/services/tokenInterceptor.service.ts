import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { LocalStorageService } from './localStorage.service';
import { UserService } from './user.service';
import { LoaderService } from './loader.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = this.localStorageService.getKeyData("access_token");

    if (token && token.trim().length !== 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request)
      .pipe(
        tap(
          event => { },
          error => {
            if (error.status === 401) {
              console.log(error.statusText);
              alert("\nSession Expired, Please Login Again!!");  
            }
            if (error.status === 0) {
              alert("Sorry, Server in Maintenance!! \nPlease try again later..");
            }
            this.loaderService.hideLoader();
            this.userService.logout();
          })
      );
  }
}