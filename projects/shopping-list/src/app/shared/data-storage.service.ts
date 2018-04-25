import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

  private readonly recipeBookName = "recipe-book.json";
  // private readonly recipeBookUrl
  //   = "https://latsic.com/recipe_book_backend/" + this.recipeBookName;

  private readonly recipeBookUrl
    = "https://ng-recipe-book-bb599.firebaseio.com/" + this.recipeBookName;


  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) {

  }

  storeRecipes() {

    const myHeaders = new Headers({'Content-Type': 'application/json'});

    const token = this.authService.getToken();

    return this.http.put(
      this.recipeBookUrl + "?auth=" + token,
      this.recipeService.getRecipes(),
      {headers: myHeaders}
    );
  }

  getRecipes(): void {

    const token = this.authService.getToken();

    this.http.get(
      this.recipeBookUrl + "?auth=" + token
    ).map(
      (response: Response) => {
      const recipes: Recipe[] = response.json();
      recipes.forEach(
        (recipe: Recipe) => {
          console.log("recipe", recipe);
          if(!recipe["ingredients"]) {
            console.log("adding empty ingridient array");
            recipe.ingredients = [];
          }
        });
      return recipes;
    }).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}