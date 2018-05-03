import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/do"

export class LoggingInterceptor implements HttpInterceptor {
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).do(
       (httpEvent: HttpEvent<any>) => {
         console.log("LoggingInterceptor intercept", httpEvent);
       }); 
  }
}