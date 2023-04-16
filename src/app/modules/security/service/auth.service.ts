import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { adminNavItems } from 'src/app/core/adminlayout/_adminnav';
import { userNavItems } from 'src/app/core/adminlayout/_usernav';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/login.response';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.baseURL + 'auth'
  private userUrl = environment.baseURL + 'user'
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public navItems$: BehaviorSubject<INavData[] | null> = new BehaviorSubject<INavData[] | null>(null);
  constructor(private http: HttpClient, handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  login(form: { userName: string | null; password: string | null }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, form)
      .pipe(
        tap(response => {
          this.setToken('token', response.accessToken);
          localStorage.setItem('userId', response.userId?.toString() || '{}');
          localStorage.setItem('userRole', response.userRole || '{}');
        }),
      );
  }
  private setToken(key: string, token: string): void {
    localStorage.setItem(key, token);
  }
  fetchCurrentUser(): Observable<User> {
    var userId: string | null = localStorage.getItem('userId');
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

        const token = localStorage.getItem('token');
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.user$.next(null);
  }
}
