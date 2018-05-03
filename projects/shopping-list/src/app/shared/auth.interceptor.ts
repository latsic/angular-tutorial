import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, 
  HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      
    const copiedRequest = request.clone({
      params: request.params.append("auth", this.authService.getToken())
    });

    console.log("AuthInterceptor intercepted", copiedRequest);
    return next.handle(copiedRequest);
  }
}