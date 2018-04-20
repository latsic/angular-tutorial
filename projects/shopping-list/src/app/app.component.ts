import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  loadedFeature: string = "recipe";

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {

    //   }
    // );
    //this.router.navigate(["recipes"], {relativeTo: this.route});
  }

  onNavigate(feature: string): void {
    this.loadedFeature = feature;
    console.log("onNavigate", feature);

    //if(this.loadedFeature == "recipe") {
    //  this.router.navigate(["recipes"], {relativeTo: this.route});
    //}
    //else{
    //  this.router.navigate(["shopping-list"], {relativeTo: this.route});
    //}
  }
}
