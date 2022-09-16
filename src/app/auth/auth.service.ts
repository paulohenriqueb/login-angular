import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly base_url= 'http://localhost:9000/auth';
  constructor(private http : HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.base_url}/register`, user);
  }

}
