import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
//import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
//import { Router, ActivatedRoute } from '@angular/router';

import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import * as fromRecipe from "./store/recipe.reducers";
import * as RecipeActions from "./store/recipe.actions";

import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {

  //selectedRecipe: Recipe;
  //selectedRecipeIndex: number;

  // constructor(
  //   private recipeService: RecipeService,
  //   private router: Router,
  //   private route: ActivatedRoute) {
  // }

  private authSubscription: Subscription;

  constructor(
    //private dsService: DataStorageService,
    private store: Store<fromRecipe.FeatureState>) {

  }

  ngOnInit() {

    this.authSubscription = this.store.select("auth")
      .take(1).subscribe((authState: fromAuth.State) => {
        if(authState.authenticated) {

          console.log("RecipesComponent, ngOnInit, getRecipes");

          //this.dsService.getRecipes();
          this.store.dispatch(new RecipeActions.FetchRecipes());
        }
        else {
          
        }
      });

    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );

    // this.router.navigate(
    //   ["recipe-start"],
    //   {relativeTo: this.route}
    // )

    // this.recipeService.recipeSelectedIndex.subscribe(
    //   (recipeIndex: number) => {
    //     this.selectedRecipeIndex = recipeIndex;

    //     this.selectedRecipe = this.recipeService.getRecipes()[recipeIndex];

    //     this.router.navigate(
    //       [String(recipeIndex)],
    //       {relativeTo: this.route})
    //   }
    // )



  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
