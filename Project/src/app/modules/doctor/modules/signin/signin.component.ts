import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/model/user';
 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  {

  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;
  
   signinForm: FormGroup;
  loading: boolean = false;
  snackBar: any;
  AuthService: any;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    public Auth: AuthService,
    private router: Router,
   
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role:['',Validators.required],
    })
  }
  ngOnInit(): void {}

  usersubmit() {
  
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    const role =this.signinForm.value.role;

    
    this.loading = true;
    console.log(email, password,role);
    
    this.Auth.signInDoctor(email, password);

  }
  

  }



