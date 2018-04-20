

import {Injectable } from '@angular/core';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shpping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  //recipeSelected = new EventEmitter<Recipe>();

  //recipeSelectedIndex = new EventEmitter<number>();

  recipesChanged = new Subject<Array<Recipe>>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "A super tasty Schnitzel - just awesome",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Wiener_Schnitzel.jpg/800px-Wiener_Schnitzel.jpg",
      /*"https://get.pxhere.com/photo/dish-meal-food-green-mediterranean-vegetable-recipe-healthy-snack-cuisine-food-photography-zucchini-vegetarian-food-delicious-food-rosemary-appetizer-plated-food-beautiful-food-zucchini-wraps-zucchini-slices-fish-fillet-recipe-fish-recipes-1376204.jpg",*/
      [
        new Ingredient("Meat", 1),
        new Ingredient("French Fries", 1)
      ]
    ),
    new Recipe(
      "Big Fat Burger",
      "What else you need to say?",
      /*"https://get.pxhere.com/photo/sweet-dish-meal-food-produce-recipe-breakfast-baking-dessert-cuisine-delicious-cake-homemade-bakery-baked-plum-chocolate-cake-bake-pastries-sugar-piece-poppy-baked-goods-flavor-poppy-seed-cake-piece-of-cake-coffee-and-cake-blue-poppy-addressed-bake-your-own-favorite-cake-baking-recipes-1272569.jpg",*/
      "https://upload.wikimedia.org/wikipedia/commons/d/dc/Lounge_Burger_Wiki.jpg",
      [
        new Ingredient("Buns", 2),
        new Ingredient("Meat", 1)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    return this.recipes.length - 1;
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}