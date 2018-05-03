import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import "rxjs/Rx";
import { Observable } from "rxjs/Observable"
import { Observer } from "rxjs/Observer";


@Injectable()
export class ServersService {

  constructor(private http: Http){
  }

  appendServers(servers: any[]) {

    const myHeaders = new Headers({'Content-Type': 'application/json'});

    return this.http.post(
      "https://udemy-angular-http-486e9.firebaseio.com/data.json",
      servers,
      { headers: myHeaders }
    );
  }
  storeServers(servers: any[]) {

    const myHeaders = new Headers({'Content-Type': 'application/json'});

    return this.http.put(
      "https://udemy-angular-http-486e9.firebaseio.com/data.json",
      servers,
      { headers: myHeaders }
    );
  }

  getServers(): Observable<any[]>  {

    return this.http.get(
      "https://udemy-angular-http-486e9.firebaseio.com/data.json",
      //"https://udemy-angular-http-486e9.firebaseio.com/",
    ).map(
      (response: Response) => {
        return response.json();
      }
    ).catch(
      (error: Response) => {
        return Observable.throw("something went wrong");
      }
    );
  }

  getAppName() {
    return this.http.get("https://udemy-angular-http-486e9.firebaseio.com/appName.json")
      .map((response: Response) => {
        console.log("getAppName", response.json());
        return response.json();
      }
    ).catch(
        (error: Response) => {
          //return Observable.throw("getAppName went wrong");
          return Observable.create((observer: Observer<string>) => {
            observer.next("getAppName went wrong");
          });
        }
      );
  }
}