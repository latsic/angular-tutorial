import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sumbitFailed: boolean = false;
  passwordMinLen: number = 6;
  errorMessage: string = "";
  inputsNotChangedSinceSubmit = true;

  constructor(
    private authService: AuthService,
    private dsService: DataStorageService) {

      console.log("signin constructor");
  }

  ngOnInit() {

    console.log("signin onInit");
  }

  onSignin(form: NgForm): void {

    this.sumbitFailed = false;
    this.inputsNotChangedSinceSubmit = true;

    const email: string = form.value.email;
    const password: string = form.value.password;
    this.authService.signinUser(email, password)
      .then(() => {
        this.dsService.getRecipes();
      })
      .catch((error) => {
        this.sumbitFailed = true;
        this.errorMessage = error.message;
      });
  }

  getPasswordMinLen(): number {
    return this.passwordMinLen;
  }

  setChangedAfterSubmit() {
    this.inputsNotChangedSinceSubmit = false;
  }

}
