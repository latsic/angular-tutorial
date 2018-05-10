import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from "firebase"
//import { AuthService } from './auth/auth.service';
//import { DataStorageService } from './shared/data-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
//import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { take } from "rxjs/operators";

import * as fromApp from "./store/app.reducers";
import * as fromAuth from "./auth/store/auth.reducers";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // constructor(private router: Router, private route: ActivatedRoute) {
  // }

  constructor(
    //private authService: AuthService,
    //private dsService: DataStorageService,
    private router: Router,
    private store: Store<fromApp.AppState>) {
    
  }

  //loadedFeature: string = "recipe";
  
  ngOnInit() {

    firebase.initializeApp({
      apiKey: "AIzaSyCY6Md14CtyS38oMMlGxUPJVXSXole_QWc",
      authDomain: "ng-recipe-book-bb599.firebaseapp.com"
    });

    this.store.select("auth").pipe(take(1)).subscribe(
      (authState: fromAuth.State) => {

        console.log("auth state changed, authenticated:",
          authState.authenticated);

        if(!authState.authenticated) {
          this.store.dispatch(new AuthActions.TryAutoSignin());
        }
      }
    );

    //this.authService.signinUser("test@test.com", "test11");

    // this.authService.autoSignIn()
    //   .then((success) => {
    //     if(success) {
    //       this.dsService.getRecipes();
    //       //this.router.navigate(["/recipes"]);
    //     }
    //     else {
    //       this.router.navigate(["/signin"]);
    //     }
    //   })
    //   .catch((error: Error) => {
    //     console.log("auto sign in failed with error", error);
    //   });

    // firebase.initializeApp({
    //   apiKey: "AIzaSyCY6Md14CtyS38oMMlGxUPJVXSXole_QWc",
    //   authDomain: "ng-recipe-book-bb599.firebaseapp.com"
    // });

    // this.route.params.subscribe(
    //   (params: Params) => {

    //   }
    // );
    //this.router.navigate(["recipes"], {relativeTo: this.route});
  }

  // onNavigate(feature: string): void {
  //   this.loadedFeature = feature;
  //   console.log("onNavigate", feature);

  //   //if(this.loadedFeature == "recipe") {
  //   //  this.router.navigate(["recipes"], {relativeTo: this.route});
  //   //}
  //   //else{
  //   //  this.router.navigate(["shopping-list"], {relativeTo: this.route});
  //   //}
  // }

  ngOnDestroy(): void {
    //this.autoSignInSubscription.unsubscribe();
  }
}

//https://ng-recipe-book-bb599.firebaseio.com/
