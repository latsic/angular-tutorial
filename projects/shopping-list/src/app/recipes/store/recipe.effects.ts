import { Actions, Effect } from "@ngrx/effects";
import * as RecipeActions from "../store/recipe.actions";

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";

import * as fromRecipe from "./recipe.reducers";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {

  private readonly recipeBookName = "recipe-book.json";
  // private readonly recipeBookUrl
  //   = "https://latsic.com/recipe_book_backend/" + this.recipeBookName;

  private readonly recipeBookUrl
    = "https://ng-recipe-book-bb599.firebaseio.com/" + this.recipeBookName;

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>) {

  }

  @Effect()
  recipesFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {

      return this.httpClient.get<Recipe[]>(
        this.recipeBookUrl,{});
    })
    .map((recipes: Recipe[]) => {
      console.log("fetching: ", recipes);
      for(let recipe of recipes) {
        if(!recipe["ingredients"]) {
          recipe["ingredients"] = [];
        }
      }
      return new RecipeActions.SetRecipes(recipes);
    });
  
  @Effect({dispatch: false})
  recipesStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select("recipes"))
    .switchMap(([action, recipeState]) => {

      const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
      const req = new HttpRequest(
        "PUT",
        this.recipeBookUrl,
        recipeState.recipes,
        {
          headers: myHeaders,
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    });
}