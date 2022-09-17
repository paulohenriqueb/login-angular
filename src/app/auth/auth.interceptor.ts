import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from 'rxjs';
@Inject
export class AuthInterceptor implements HttpInterceptor{
  constructor(){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req);
  }
}
