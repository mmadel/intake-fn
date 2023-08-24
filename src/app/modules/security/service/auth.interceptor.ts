import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { from, mergeMap } from 'rxjs';
import { BehaviorSubject, catchError, EMPTY, finalize, NEVER, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from '../../common';
import { UserRoleURLS } from 'src/app/core/adminlayout/header/user.role.urls';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { KcAuthServiceService } from './kc/kc-auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
    , private localService: LocalService
    , private kcAuthServiceService: KcAuthServiceService
    , private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.kcAuthServiceService.getToken())
      .pipe(
        mergeMap(token => {
          console.log(localStorage.getItem('access-token')===null)
          if (localStorage.getItem('access-token') === null){
            console.log('no cached acces token');
            localStorage.setItem('access-token', token)
          }
          console.log(localStorage.getItem('access-token'))
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
          });
          return next.handle(request);
        }
        ), catchError(error => {
          this.kcAuthServiceService.logout();
          return [];
        }))
  }

  private getNotSecuredURL(): string[] {

    var notSecuredURLS: string[] = new Array();
    UserRoleURLS.forEach(element => {
      if (element.name === 'PERMITTED')
        notSecuredURLS = element.urls;
    });
    return notSecuredURLS;
  }
}
