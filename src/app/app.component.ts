import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authenticated$ : Observable<boolean>;
  user$: Observable<User | null>;
  constructor(private authService: AuthService){
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ =  this.authService.getUser();
  }
}
