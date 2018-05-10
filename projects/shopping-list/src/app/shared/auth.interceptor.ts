import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, 
  HttpEvent} from "@angular/common/http";


import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take, switchMap, map} from "rxjs/operators";

//import { AuthService } from "../auth/auth.service";
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
      
     return this.store.select("auth").pipe(
      take(1),
      map((authState: fromAuth.State) => {
        const copiedRequest = request.clone({
          params: request.params.append("auth", authState.token)
        });
        return copiedRequest;
      }),
      switchMap((request: HttpRequest<any>) => {
        return next.handle(request);
      })
    );
  }
}