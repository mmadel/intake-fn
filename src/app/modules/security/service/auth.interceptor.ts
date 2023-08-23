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
    //this.spinner.show();
    let accessToken = this.kcAuthServiceService.getToken();
    if (_.some(this.getNotSecuredURL(), (el) => _.includes(request.url, el))) {
      console.log('not secured')
      request;
    }
    //enrich secured urls with access token 
    else if (accessToken) {
      console.log('secured');
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }
    //reject other requests 
    else {
      console.log('rejected');
      Observable.create(EMPTY);
    }
    return next.handle(request);
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
