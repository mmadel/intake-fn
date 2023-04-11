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
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) { }
  login(form: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authUrl}/login`, form)
      .pipe(
        tap(response => {
          this.user$.next(response.user);
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
      );
  }
  private setToken(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token));
  }
  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.authUrl}/current-user`)
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
