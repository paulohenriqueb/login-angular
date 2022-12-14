import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, catchError, of } from 'rxjs';
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
    const token = localStorage.getItem('token');
    if(token && !this.subjLoggedIn$.value){
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean>{
    return this.http.get<User>(`${this.base_url}/user`)
      .pipe(
        tap((u:User)=>{
          if(u){
            localStorage.setItem('token', u.token!);
            this.subjLoggedIn$.next(true);
            this.subjUser$.next(u);
          }
        }),
        map((u:User)=> (u)? true : false),
        catchError((err)=>{
          this.logout();
          return of(false);
        })
      );
  }

  getUser():Observable<User | null>{
    return this.subjUser$?.asObservable();
  }

  logout(){
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
