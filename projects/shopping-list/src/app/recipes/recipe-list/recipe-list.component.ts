import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs";

import { Recipe } from '../recipe.model';
//import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';


import * as fromRecipe from "../store/recipe.reducers";
  


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  //recipes: Recipe[];
  //recipesChangedSubscription: Subscription;

  recipesState: Observable<fromRecipe.State>;
  //recipeStateSubscription: Subscription;

  constructor(
    //private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {

    this.recipesState = this.store.select("recipes");

    this.recipesState.subscribe(
      (recipesData: fromRecipe.State) => {
        console.log("RecipeListComponent", recipesData.recipes);
      }
    );

    
    // this.recipes = this.recipeService.getRecipes();

    // this.recipesChangedSubscription = 
    // this.recipeService.recipesChanged.subscribe(
    //   (recipes: Array<Recipe>) => {
    //     this.recipes = recipes;
    //   }
    // )
  }

  onNewRecipe(): void {
    this.router.navigate(
      ["new"],
      {relativeTo: this.route}
    )
  }

  ngOnDestroy() {
    //this.recipesChangedSubscription.unsubscribe();
  }
}
