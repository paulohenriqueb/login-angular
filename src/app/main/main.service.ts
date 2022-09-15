import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { Person } from './person';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private readonly base_url: string= 'http://localhost:9000/api';
  constructor(private http: HttpClient) { }

  getPeople():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.base_url}/person`)
      .pipe(
        tap(p=>console.log(p)),
        catchError((e)=>{
          console.log(e)
          return throwError(()=> new Error(e));
        })
      )
  }

  getProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.base_url}/product`)
      .pipe(
        tap(pr=>console.log(pr)),
        catchError((e)=>{
          console.log(e);
          return throwError(()=> new Error(e));
        })
      )
  }


}
