import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { map } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, combineLatest, EMPTY, finalize, from, mergeMap, Observable, of, switchMap, throwError } from 'rxjs';
import { UserRoleURLS } from 'src/app/core/adminlayout/header/user.role.urls';
import { KcAuthServiceService } from './kc/kc-auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private kcAuthServiceService: KcAuthServiceService, private keycloakService: KeycloakService
    , private spinner: NgxSpinnerService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    // if (this.router.routerState.snapshot.url === '/digital-intake') {
    //   return next.handle(request).pipe(
    //     finalize(() => {
    //       this.spinner.hide();
    //     }),
    //   )
    // }
    if ((this.kcAuthServiceService.isTokenExpired() && this.isRefreshURLS(this.router.routerState.snapshot.url))
    ) {
      console.log('intake');
      return from(this.kcAuthServiceService.updateToken(1800))
        .pipe(
          mergeMap(val => {
            var newToken = this.keycloakService.getKeycloakInstance().token;
            localStorage.setItem('access-token', newToken!)
            request = request.clone({
              setHeaders: { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            return next.handle(request);
          }),
          finalize(() => {
            this.spinner.hide();
          }),
        )
    } else {
      return from(this.kcAuthServiceService.getToken())
        .pipe(
          mergeMap(token => {
            if (localStorage.getItem('access-token') === null) {
              localStorage.setItem('access-token', token)
            }

            request = request.clone({
              setHeaders: { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            return next.handle(request);
          }
          ),
          finalize(() => {
            this.spinner.hide();
          }),
          catchError(error => {
            if (error.status === 401) {
              this.kcAuthServiceService.logout();
            }
            if (error.error.errorCode === 'UNAUTHORIZED') {
              this.kcAuthServiceService.logout();
            } else {
              return throwError(error);
            }
            return [];
          }))
    }
  }

  private isRefreshURLS(url: string): boolean {
    var isRefreshURL: boolean = false;
    var urls: string[] = ['intake', 'patient/create', 'agreement', 'insurance/company/find', 'patient/upload', 'patient/signature/upload'];
    for (let element of urls) {
      if (url.includes(element)) {
        isRefreshURL = true;
        break;
      }
    }
    console.log(isRefreshURL)
    return isRefreshURL;
  }
}
