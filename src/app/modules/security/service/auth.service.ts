import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
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
  constructor(private http: HttpClient) { }
  login(form: { userName: string | null; password: string | null }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, form)
      .pipe(
        tap(response => {
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
          localStorage.setItem('userId', response.userId?.toString() || '{}');
        })
      );
  }
  private setToken(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token));
  }
  fetchCurrentUser(): Observable<User> {
    var userId: string | null = localStorage.getItem('userId');
    return this.http.get<User>(`${this.userUrl}/find/loggedIn/` + userId)
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }
  getCurrentUser(): Observable<User | null> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data        
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
}
