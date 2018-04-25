import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  passwordMinLen: number = 6;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;

    this.authService.signupUser(email, password);
  }
  
  getPasswordMinLen(): number {
    return this.passwordMinLen;
  }

}
