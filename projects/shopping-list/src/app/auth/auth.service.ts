
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

  token: string;

  constructor(
    private router: Router) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
      email, password)
      .then(() => {
        console.log("Signup successfull!");
      })
      .catch((error) => {
        console.log("firebase auth error", error);
      });
  }

  signinUser(email: string, password: string) : Promise<any> {

    return new Promise((resolve, reject) => {

      firebase.auth().signInWithEmailAndPassword(
        email, password)
        .then((response) => {

          this.router.navigate(['/']);

          firebase.auth().currentUser.getToken()
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

    firebase.auth().currentUser.getToken()
      .then((token: string) => {
        console.log("getToke", "retrieved firebase token!");
        this.token = token;
      });

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

}