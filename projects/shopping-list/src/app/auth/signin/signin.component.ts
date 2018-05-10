import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable ,  Subscription } from "rxjs";

import { Store } from '@ngrx/store';

import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "../store/auth.reducers";
import * as AuthActions from "../store/auth.actions";

//import { AuthService } from '../auth.service';
import { DataStorageService } from '../../shared/data-storage.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  passwordMinLen: number = 6;
  inputsNotChangedSinceSubmit = true;

  authState: Observable<fromAuth.State>;
  authSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>) {

      console.log("signin constructor");
  }

  ngOnInit() {

    console.log("signin onInit");

    this.authState = this.store.select("auth");

    this.authSubscription = this.authState.subscribe(
      (authData: fromAuth.State) => {
        if(!authData.authenticated && authData.errorMsg) {
          this.inputsNotChangedSinceSubmit = true;
        }
      }
    )
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSignin(form: NgForm): void {

    const email: string = form.value.email;
    const password: string = form.value.password;

    console.log(email);
    console.log(password);

    this.store.dispatch(new AuthActions.TrySignin(
      {email: email, password: password}));
  }

  getPasswordMinLen(): number {
    return this.passwordMinLen;
  }

  setChangedAfterSubmit() {
    this.inputsNotChangedSinceSubmit = false;
  }

}
