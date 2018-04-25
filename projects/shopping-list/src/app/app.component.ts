import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase"
//import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // constructor(private router: Router, private route: ActivatedRoute) {
  // }

  loadedFeature: string = "recipe";

  ngOnInit() {

    firebase.initializeApp({
      apiKey: "AIzaSyCY6Md14CtyS38oMMlGxUPJVXSXole_QWc",
      authDomain: "ng-recipe-book-bb599.firebaseapp.com"
    });

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
}

//https://ng-recipe-book-bb599.firebaseio.com/
