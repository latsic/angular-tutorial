
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromAuth from "./store/auth.reducers";
import * as AuthActions from "./store/auth.actions";

@Injectable()
export class AuthService {

  token: string;
  userEmail: string;

  constructor(
    private router: Router,
    private store: Store<fromAuth.State>) {
      
      firebase.initializeApp({
        apiKey: "AIzaSyCY6Md14CtyS38oMMlGxUPJVXSXole_QWc",
        authDomain: "ng-recipe-book-bb599.firebaseapp.com"
      });
  }

  signupUser(email: string, password: string): Promise<any> {

    let signUpPromise: Promise<any> =  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
      email, password);

    signUpPromise.then((user) => {
      this.store.dispatch(new AuthActions.Signup(user.email, user.getIdToken()));
    });


    return signUpPromise;

    // firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
    //   email, password)
    //   .then(() => {
    //     console.log("Signup successfull!");
    //   })
    //   .catch((error) => {
    //     console.log("firebase auth error", error);
    //   });
  }

  signinUser(email: string, password: string) : Promise<any> {

    return new Promise((resolve, reject) => {

      firebase.auth().signInWithEmailAndPassword(
        email, password)
        .then((response) => {

          this.userEmail = firebase.auth().currentUser.email;

          this.router.navigate(['/']);

          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
              console.log("signinUser", "retrieved firebase token!");
              this.token = token;
            });
          
          resolve(true);
          console.log("Signed in successfully", response);
        })
        .catch((error) => {
          console.log("Error while signing in", error);
          reject(error);
        });
      });
  }

  logout() {
    this.token = null;
    firebase.auth().signOut();
  }

  getToken() {

    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        console.log("getToke", "retrieved firebase token!");
        this.token = token;
      });

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  authenticatedUserEmail(): string {
    if(this.isAuthenticated()) {
      return this.userEmail;
    }
  }

  autoSignIn(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      console.log("auto Sign in called");

      if(this.isAuthenticated()) {
        console.log("auto Sign, already authenticated")
        resolve(true);
      }

      firebase.auth().onAuthStateChanged(
        (user: firebase.User) => {

          if(!user){
            resolve(false);
            return;
          }

          console.log("user", user);
          this.userEmail = user.email;

          if(firebase.auth().currentUser == null) {
            console.log("auto sign in, error", "no user!");
            reject(new Error("auto sign in, error, no user!"));
          }
          
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
              console.log("auto sign in successfull");
              this.token = token;
              resolve(true);
            })
            .catch((error) => {
              console.log("auto sign in failed", error);
              reject(error);
            }
          );
        });
    });
  }

}