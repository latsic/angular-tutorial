import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions"
//import * as fromShoppingList from "../../shopping-list/store/shopping-list.reducers";
import * as fromApp from "../../store/app.reducers";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  id: number = -1;
  recipeInitialized: boolean = false;

  paramsSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        if(this.id < 0 || this.recipeService.getRecipes().length <= this.id){
          console.log("recipeIndexError", "id", this.id);
          this.router.navigate(["../"], {relativeTo: this.route})
        }
        else {
          this.recipe = this.recipeService.getRecipe(this.id);
          this.recipeInitialized = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onAddToShoppingList(): void {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(): void {
    this.router.navigate(["edit"], {relativeTo: this.route});
    //this.router.navigate(["../", this.id, "edit"], {relativeTo: this.route});
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["../"], {relativeTo: this.route});
  }
}
