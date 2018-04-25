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
  signupFailed: boolean = false;
  errorMessage: string = "";
  inputNotChangedSinceSignup = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.signupFailed = false;
    this.inputNotChangedSinceSignup = true;

    this.authService.signupUser(email, password)
      .then(() => {
        console.log(`User ${email} successfully created!`)
      })
      .catch((error: Error) => {
        this.errorMessage = error.message;
        this.signupFailed = true;
      });
  }
  
  getPasswordMinLen(): number {
    return this.passwordMinLen;
  }

  setInputChanged(): void {
    this.inputNotChangedSinceSignup = false;
  }

}
