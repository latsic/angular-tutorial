
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromAuth from "./store/auth.reducers";
import * as fromApp from "../store/app.reducers";
import * as AuthActions from "./store/auth.actions";

@Injectable()
export class AuthService {

  private fireBaseStateUnsubscribeFunc;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) {
      
      // firebase.initializeApp({
      //   apiKey: "AIzaSyCY6Md14CtyS38oMMlGxUPJVXSXole_QWc",
      //   authDomain: "ng-recipe-book-bb599.firebaseapp.com"
      // });

      // console.log("AuthService constructor");

      // store.select("auth").take(1).subscribe(
      //   (authState: fromAuth.State) => {

      //     console.log("auth state changed, authenticated:",
      //       authState.authenticated);

      //     if(!authState.authenticated) {
      //       this.autoSignIn();
      //     }
      //   }
      // );
  }

  // signupUser(email: string, password: string): Promise<any> {

  //   let signUpPromise: Promise<any> = 
  //     firebase.auth()
  //     .createUserAndRetrieveDataWithEmailAndPassword(email, password);

  //   signUpPromise.then(() => {
  //     this.store.dispatch(new AuthActions.Signup(email)); 
      
  //     firebase.auth().currentUser.getIdToken()
  //       .then((token: string) => {
  //         console.log("signupUser", "retrieved firebase token!");
          
  //         this.store.dispatch(new AuthActions.SetToken(token));
  //       });
  //   });

  //   return signUpPromise;
  // }

  // signinUser(email: string, password: string) : Promise<any> {

  //   let signinPromise = new Promise((resolve, reject) => {

  //     firebase.auth().signInWithEmailAndPassword(
  //       email, password)
  //       .then((response) => {

  //         this.store.dispatch(
  //           new AuthActions.Signin(firebase.auth().currentUser.email));

  //         this.router.navigate(['/']);

  //         firebase.auth().currentUser.getIdToken()
  //           .then((token: string) => {
  //             console.log("signinUser", "retrieved firebase token!");
              
  //             this.store.dispatch(new AuthActions.SetToken(token));

  //           });
          
  //         resolve(true);
  //         console.log("Signed in successfully", response);
  //       })
  //       .catch((error) => {
  //         console.log("Error while signing in", error);
  //         reject(error);
  //       });
  //     });

  //   return signinPromise;
  // }

  // logout() {
  //   firebase.auth().signOut().then(() => {
  //     this.store.dispatch(new AuthActions.Logout());
  //   });
  // }

  // autoSignIn(): Promise<boolean> {

  //   console.log("auto Sign in called");

  //   return new Promise((resolve, reject) => {

  //     this.fireBaseStateUnsubscribeFunc = firebase.auth().onAuthStateChanged(
  //       (user: firebase.User) => {

  //         console.log("onAuthStateChanged, user:", user);

  //         if(!user){
  //           this.fireBaseStateUnsubscribeFunc();
  //           resolve(false);
  //           return;
  //         }

  //         if(firebase.auth().currentUser == null) {
  //           this.fireBaseStateUnsubscribeFunc();
  //           reject(new Error("auto sign in, error, no user!"));
  //         }
          
  //         firebase.auth().currentUser.getIdToken()
  //           .then((token: string) => {
  //             console.log("auto sign in successfull");
              
  //             this.store.dispatch(new AuthActions.AutoSignin(user.email));
  //             this.store.dispatch(new AuthActions.SetToken(token));

  //             console.log("autosignin token", token);
  //             this.fireBaseStateUnsubscribeFunc();
  //             resolve(true);
  //           })
  //           .catch((error) => {
  //             console.log("auto sign in failed", error);
  //             this.fireBaseStateUnsubscribeFunc();
  //             reject(error);
  //           }
  //         );
  //       });
  //   });
  // }

}