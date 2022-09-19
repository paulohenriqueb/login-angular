import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token');
      const authReq = req.clone({setHeaders:{
          Authorization: token!
        }
      })
      return next.handle(authReq)
        .pipe(
          catchError((err)=>{

            console.log(err);
            if(err instanceof HttpErrorResponse){
              if(err.status === 401){
                this.authService.logout();
                this.router.navigateByUrl('/auth/login');
              }
            }
            return throwError( ()=> new Error(err) )
          })
        )
    }
    return next.handle(req);
  }
}
