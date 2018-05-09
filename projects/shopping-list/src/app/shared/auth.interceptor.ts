import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, 
  HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
//import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor(private authService: AuthService) {

  // }
  constructor(private store: Store<fromApp.AppState>) {
    
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      
    // const copiedRequest = request.clone({
    //   params: request.params.append("auth", this.authService.getToken())
    // });

    // console.log("AuthInterceptor intercepted", copiedRequest);
    // return next.handle(copiedRequest);


    return this.store.select("auth")
      .take(1)
      .map(
      (authState: fromAuth.State) => {

        console.log("authState", authState);

        const copiedRequest = request.clone({
          params: request.params.append("auth", authState.token)
        });
        console.log("AuthInterceptor intercepted", copiedRequest);

        return copiedRequest;
      }
    ).switchMap(
      (request: HttpRequest<any>) => {
        return next.handle(request);
      }
    );

  }
}