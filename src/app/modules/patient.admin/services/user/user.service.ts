import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/security/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.baseURL + 'user'
  constructor(private http: HttpClient) { }
  create(user: User) {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(`${this.userUrl}`, JSON.stringify(user), { 'headers': headers, observe: 'response' })
  }

  get() {
    return this.http.get<User[]>(`${this.userUrl}` + '/find', { observe: 'response' })
  }
}
