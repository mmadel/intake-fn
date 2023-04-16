import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token') || '{}';
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

  private logoutAndRedirect(err: any): Observable<HttpEvent<any>> {
    this.authService.logout();
    this.router.navigateByUrl('/login');

    return throwError(err);
  }
}
