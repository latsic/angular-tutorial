import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptor implements HttpInterceptor {
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).pipe(tap(
       (httpEvent: HttpEvent<any>) => {
         console.log("LoggingInterceptor intercept", httpEvent);
       })); 
  }
}