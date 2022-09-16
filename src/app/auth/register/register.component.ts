import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister = this.fb.group({
    'firstname': ['', [Validators.required]],
    'lastname' : ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required,  Validators.minLength(6)]],
    'phone' : ['', [Validators.required]],
    'mobilephone': ['', [Validators.required]],
    'address': ['', [Validators.required]],
    'city':['', [Validators.required]],
    'state' : ['',[Validators.required]],
  }, { validator: this.matchingPasswords})

  states = ["MG", "RS", "SC", "GO", "SP", "RJ", "CE"];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router : Router
    ) { }

  ngOnInit(): void {
  }
  matchingPasswords(gp: FormGroup){
    if(gp){
      const pass1 = gp.controls['password1'].value;
      const pass2 = gp.controls['password2'].value;
      if(pass1 == pass2){
        return null;
      }
    }
    return {matching: false};
  }
  onSubmit(){
    let u: User = { ...this.formRegister.value,
      password:this.formRegister.value.password1 }
      this.authService.register(u)
        .subscribe((u)=>{
          this.snackBar.open(
            "Successfuly registered. Use you credentials to sign in.",
            'Ok', {duration: 3000})
            this.router.navigateByUrl('/auth/login')
        }, (err)=>{
          console.log(err);
          this.snackBar.open(err.error.message, 'Ok!');
        })
  }
}
