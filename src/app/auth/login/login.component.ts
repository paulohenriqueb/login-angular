import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const credentials = this.loginForm.value;
    this.authService.login(credentials)
      .subscribe((user)=> {
        this.snackBar.open(
          'Logged in successfuly. Welcome' + user.firstname + '!',
          'Ok!',
          {duration: 3000});
          this.router.navigateByUrl('/');
        console.log(user)
      },
        (err)=>{
          this.snackBar.open('Login error', 'Ok')
          console.log(err)
        } )
  }

}
