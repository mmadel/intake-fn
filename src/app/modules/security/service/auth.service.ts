import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { adminNavItems } from 'src/app/core/adminlayout/_adminnav';
import { userNavItems } from 'src/app/core/adminlayout/_usernav';
import { environment } from 'src/environments/environment';
import { LocalService } from '../../common';
import { LoginResponse } from '../model/login.response';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.baseURL + 'auth'
  private userUrl = environment.baseURL + 'user'
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, handler: HttpBackend
    , private localService: LocalService) {
    this.http = new HttpClient(handler);
  }
  login(form: { userName: string | null; password: string | null }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, form)
      .pipe(
        tap(response => {
          this.setToken('token', response.accessToken);
          this.localService.saveData('userId', response.userId?.toString() || '{}')
          this.localService.saveData('userRole', response.userRole || '{}')
        }),
      );
  }
  private setToken(key: string, token: string): void {
    this.localService.saveData(key, token)
  }
  fetchCurrentUser(): Observable<User> {
    var userId: string | null = this.localService.getData('userId');
    return this.http.get<User>(`${this.userUrl}/find/loggedIn/` + userId)
      .pipe(
        tap(user => {
          this.user$.next(user);
        }),
      );
  }
  getCurrentUser(): Observable<User | null> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return of(user);
        }

        const token = this.localService.getData('token');
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  logout(): void {
    this.localService.removeData('token');
    this.localService.removeData('userId');
    this.localService.removeData('userRole');
    this.user$.next(null);
  }
}
