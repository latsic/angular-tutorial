import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { AuthService } from '../auth.service';
//import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable ,  Subscription } from "rxjs";


import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import * as fromAuth from "../store/auth.reducers";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  passwordMinLen: number = 6;
  inputNotChangedSinceSignup = false;

  authState: Observable<fromAuth.State>;
  authSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {

    this.authState = this.store.select("auth");
    this.authSubscription = this.authState.subscribe(
      (authData: fromAuth.State) => {
        if(!authData.authenticated) {
          this.inputNotChangedSinceSignup = true;
        }
      }
    )
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  
  onSignup(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({email, password}));
  }
  
  getPasswordMinLen(): number {
    return this.passwordMinLen;
  }

  setInputChanged(): void {
    this.inputNotChangedSinceSignup = false;
  }

}
