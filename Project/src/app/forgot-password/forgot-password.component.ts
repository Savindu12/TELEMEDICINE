import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private afAuth: AngularFireAuth) { }

ngOnInit(): void {
    
}

reset(){

}
}