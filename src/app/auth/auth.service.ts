import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly base_url= 'http://localhost:9000/auth';
  private subjUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private subjLoggedIn$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http : HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.base_url}/register`, user);
  }

  login(credentials:{email: string, password: string}): Observable<User>{
    console.log(credentials);
    console.log(`${this.base_url}/login`);
    return this.http.post<User>(`${this.base_url}/login`, credentials)
    .pipe(
      tap((u: User)=>{
        if(u.token){
          localStorage.setItem('token', u.token)
          this.subjLoggedIn$.next(true);
          this.subjUser$?.next(u)
        }
      })
    )
  }

  isAuthenticated():Observable<boolean>{
    return this.subjLoggedIn$.asObservable();
  }

  getUser():Observable<User | null>{
    return this.subjUser$?.asObservable();
  }
}
