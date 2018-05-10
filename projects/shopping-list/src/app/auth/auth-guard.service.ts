import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route } from "@angular/router";
import { Injectable } from "@angular/core";
//import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";

import { Observable} from "rxjs";
import { take, map } from "rxjs/operators";

import * as fromApp from "../store/app.reducers";
import * as fromAuth from "./store/auth.reducers";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  // constructor(private authService: AuthService) {

  // }
  constructor(private store: Store<fromApp.AppState>) {

  }

  private allowed(): Observable<boolean> {
    return this.store.select("auth").pipe(take(1), map(
      (authState: fromAuth.State) => {

        console.log("allowed?", authState.authenticated);
        return authState.authenticated;
      }
    ));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {

      console.log("AuthGuard Can Activate")
      return this.allowed();
  }

  canLoad(route: Route) : Observable<boolean> | Promise<boolean> | boolean { 
  
    console.log("AuthGuard CanLoad")
    return this.allowed();
  
  }
}