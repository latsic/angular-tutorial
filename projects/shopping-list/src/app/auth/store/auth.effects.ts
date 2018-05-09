
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { fromPromise } from "rxjs/observable/fromPromise";
import { from } from "rxjs/observable/from";
import { of } from "rxjs/observable/of";
import { pairs } from "rxjs/observable/pairs";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";

import * as AuthActions from "./auth.actions";

import * as firebase from "firebase";
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

interface AuthData{
  email: string,
  password: string,
  token: string,
  myError: Error
}

@Injectable()
export class AuthEffects {

  private fireBaseStateUnsubscribeFunc: firebase.Unsubscribe;

  

  constructor(
    private actions$: Actions,
    private router: Router) {
  }

  autoSignIn(): Promise<{email: string, token: string}> {

    console.log("auto Sign in called");

    return new Promise((resolve, reject) => {

      this.fireBaseStateUnsubscribeFunc = firebase.auth().onAuthStateChanged(
        (user: firebase.User) => {

          console.log("onAuthStateChanged, user:", user);

          if(!user){
            this.fireBaseStateUnsubscribeFunc();
            resolve({email: null, token: null});
            return;
          }

          if(firebase.auth().currentUser == null) {
            this.fireBaseStateUnsubscribeFunc();
            reject(new Error("auto sign in, error, no user!"));
          }
          
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
              console.log("auto sign in successfull");
              
              console.log("autosignin token", token);
              this.fireBaseStateUnsubscribeFunc();
              resolve({email: user.email, token: token});
            })
            .catch((error) => {
              console.log("auto sign in failed", error);
              this.fireBaseStateUnsubscribeFunc();
              reject(error);
            }
          );
        });
    });
  }

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      console.log("authSignup Called");

      const authdata: AuthData = {
        email: action.payload.email,
        password: action.payload.password,
        token: null,
        myError: null
      };

      return authdata;
    })
    .switchMap(
      (authData: AuthData) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(
          authData.email, authData.password))
          .map(() => authData)
          .catch(error => {
            authData.myError = error;
            return of(authData);
          });
      }
    )
    .switchMap(
      (authData: AuthData) => {

        if(authData.myError) {
          return of(authData);
        }
        return fromPromise(firebase.auth().currentUser.getIdToken())
          .map((firebaseToken: string) => {

            authData.token = firebaseToken;
            return authData;
          });
      }
    )
    .mergeMap((authData: AuthData) => {

      console.log("signupData", authData);

      if(authData.myError) {
        return [(<Action> new AuthActions.AuthError(authData.myError))];
      }

      this.router.navigate(["/recipes"]);
      return [
        (<Action> new AuthActions.SetToken(authData.token)),
        (<Action> new AuthActions.Signup(authData.email)) 
      ];   
    });


  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      console.log("effect signin");
      
      let authData: AuthData = {
        email: action.payload.email,
        password: action.payload.password,
        token: null,
        myError: null
      };
      
      return authData;
    })
    .switchMap((authData: AuthData) => {
      return fromPromise(
        firebase.auth().signInWithEmailAndPassword(
          authData.email, authData.password))
        .map(() => authData)
        .catch((error) => {
          console.log("sign in error");
          authData.myError = error;
          return of(authData);
        });
    })
    .switchMap((authData: AuthData) => {

      console.log("signin switchmap");

      if(authData.myError) {
        return of(authData);
      }

      return fromPromise(firebase.auth().currentUser.getIdToken())
        .map((token: string) => {
          authData.token = token;
          return authData;
      });
    })
    .mergeMap((authData: AuthData) => {

      if(authData.myError) {
        return [(<Action>new AuthActions.AuthError(authData.myError))];
      }
      
      this.router.navigate(["/recipes"]);
      return [(<Action>new AuthActions.SetToken(authData.token)),
              (<Action>new AuthActions.Signin(authData.email))];
      
    });
  
  @Effect()
  authLogout = this.actions$
    .ofType(AuthActions.TRY_LOGOUT)
    .switchMap(() => {
      return fromPromise(firebase.auth().signOut());
    })
    .map(() => {return {type: AuthActions.LOGOUT}});
    
  @Effect()
  authAutoSignin = this.actions$
    .ofType(AuthActions.TRY_AUTOSIGNIN)
    .switchMap(() => {
      return fromPromise(this.autoSignIn())
        .map((autoSigninData: {email: string, token: string}) => {
          return {
            email: autoSigninData.email,
            password: null,
            token: autoSigninData.token,
            error: null
          };
        })
        .catch((error: Error) => {
          console.log("AutosignIn error", error);
          return of({
            myError: error
          });
        });
    })
    .mergeMap((authData: AuthData) => {

      console.log("autosignin", authData);

      if(authData.myError) {
        return [
          (<Action> new AuthActions.AuthError(authData.myError))
        ];
      }
      if(!authData.email || !authData.token) {
        return Observable.empty();
      }

      this.router.navigate(["/recipes"]);
      return [
        (<Action> new AuthActions.SetToken(authData.token)),
        (<Action> new AuthActions.AutoSignin(authData.email))
      ];
    });
}