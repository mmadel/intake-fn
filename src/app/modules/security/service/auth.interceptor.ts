import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, from, mergeMap, Observable, throwError } from 'rxjs';
import { UserRoleURLS } from 'src/app/core/adminlayout/header/user.role.urls';
import { KcAuthServiceService } from './kc/kc-auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private kcAuthServiceService: KcAuthServiceService
    , private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
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
          if(error.status === 401){
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

  private getNotSecuredURL(): string[] {

    var notSecuredURLS: string[] = new Array();
    UserRoleURLS.forEach(element => {
      if (element.name === 'PERMITTED')
        notSecuredURLS = element.urls;
    });
    return notSecuredURLS;
  }
}
