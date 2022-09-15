import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

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

  }
}
