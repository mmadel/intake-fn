import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, NEVER, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LocalService } from '../../common';
import { UserRoleURLS } from 'src/app/core/adminlayout/header/user.role.urls';
import * as _ from 'lodash';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService,
    private router: Router
    , private localService: LocalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.localService.getData('token') || '{}';
    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      catchError(err => {
        // in case of 401 http error
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.logoutAndRedirect(err);
        }

        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );

  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    let headers: HttpHeaders = new HttpHeaders();
    var permitedURLS: string[] = new Array();
    UserRoleURLS.forEach(element => {
      if (element.name === this.localService.getData('userRole'))
        permitedURLS = element.urls
    });
    console.log(JSON.stringify(permitedURLS))
    console.log(request.url)
    if (_.some(permitedURLS, (el) => _.includes(request.url, el))) {
      if (token) {
        headers = headers.append('Authorization', `Bearer ${token}`)
        if (request.method === 'POST' || "PUT")
          headers = headers.append('Content-Type', 'application/json')
        return request.clone({ headers });
      }
      request.clone({
        setHeaders: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        }
      });
      return request;
    }
    return Observable.create(EMPTY);;
  }

  private logoutAndRedirect(err: any): Observable<HttpEvent<any>> {
    this.authService.logout();
    this.router.navigateByUrl('/login');

    return throwError(err);
  }
}
