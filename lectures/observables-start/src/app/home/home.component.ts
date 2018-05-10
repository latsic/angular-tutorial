//declare const myEasyTimer: any;

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  intervalSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
      .map((value: number) => value * 2);

    this.intervalSubscription = myNumbers.subscribe(
      (myNumber: number) => {
        console.log(myNumber);
      }
    )

    console.log("ngOnInit");

    const timeOrigin: number = window.performance.now();

    const myObservable = Observable.create(
      (observer: Observer<string>) => {

        setTimeout(() => {

          const timeNow = window.performance.now() - timeOrigin;
          observer.next(
            "first package " + String(timeNow) + " millis");

        }, 2000);
        setTimeout(() => {

          const timeNow = window.performance.now() - timeOrigin;
          observer.next("second package " + String(timeNow) + " millis");

        }, 4000);
        setTimeout(() => {

          const timeNow = window.performance.now() - timeOrigin;

          observer.error("this does not work " + String(timeNow) + " millis");
        }, 5000);
      }
    );

    myObservable.subscribe(
      (data: string) => { console.log(data) },
      (error: string) => { console.log(error) },
      () => {console.log("completed"); }
    );

  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

}
