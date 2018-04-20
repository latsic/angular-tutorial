import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipesChangedSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipesChangedSubscription = 
    this.recipeService.recipesChanged.subscribe(
      (recipes: Array<Recipe>) => {
        this.recipes = recipes;
      }
    )
  }

  onNewRecipe(): void {
    this.router.navigate(
      ["new"],
      {relativeTo: this.route}
    )
  }

  ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
  }
}
