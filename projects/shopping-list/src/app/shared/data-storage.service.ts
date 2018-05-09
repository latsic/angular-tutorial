import { Injectable } from "@angular/core";
//import { Http, Headers, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
//import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";


@Injectable()
export class DataStorageService {

  private readonly recipeBookName = "recipe-book.json";
  // private readonly recipeBookUrl
  //   = "https://latsic.com/recipe_book_backend/" + this.recipeBookName;

  private readonly recipeBookUrl
    = "https://ng-recipe-book-bb599.firebaseio.com/" + this.recipeBookName;


  constructor(
    //private http: Http,
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    /*private authService: AuthService*/) {

  }

  // storeRecipes() {

  //   //const token = this.authService.getToken();

  //   //const myHeaders = new Headers({'Content-Type': 'application/json'});

  //   // return this.http.put(
  //   //   this.recipeBookUrl + "?auth=" + token,
  //   //   this.recipeService.getRecipes(),
  //   //   {headers: myHeaders}
  //   // );

  //   //const myHeaders = new HttpHeaders({'Content-Type': 'application/json'});    

  //   const myHeaders = new HttpHeaders().set("Content-Type", "application/json");

  //   // return this.httpClient.put(
  //   //   this.recipeBookUrl,
  //   //   this.recipeService.getRecipes(),
  //   //   { headers: myHeaders,
  //   //     observe: 'events',
  //   //     params: new HttpParams().set("auth", token)
  //   //   }
  //   // );

  //   const req = new HttpRequest(
  //     "PUT",
  //     this.recipeBookUrl,
  //     this.recipeService.getRecipes(),
  //     {
  //       headers: myHeaders,
  //       reportProgress: true,
  //       // params: new HttpParams().set("auth", token)
  //     }
  //   );
  //   return this.httpClient.request(req);

  // }

  // getRecipes(): void {

  //   console.log("getRecipes called");

  //   //const token = this.authService.getToken();

  //   // this.http.get(
  //   //   this.recipeBookUrl + "?auth=" + token
  //   // ).map(
  //   //   (response: Response) => {
  //   //   const recipes: Recipe[] = response.json();
  //   //   recipes.forEach(
  //   //     (recipe: Recipe) => {
  //   //       console.log("recipe", recipe);
  //   //       if(!recipe["ingredients"]) {
  //   //         console.log("adding empty ingridient array");
  //   //         recipe.ingredients = [];
  //   //       }
  //   //     });
  //   //   return recipes;
  //   // }).subscribe(
  //   //   (recipes: Recipe[]) => {
  //   //     this.recipeService.setRecipes(recipes);
  //   //   }
  //   // );

  //   this.httpClient.get<Recipe[]>(
  //     this.recipeBookUrl,
  //     {
  //       // params: new HttpParams().set("auth", token)
  //     })
  //     .map(
  //       (recipes) => {
  //         console.log("fetching: ", recipes);
  //         for(let recipe of recipes) {
  //           if(!recipe["ingredients"]) {
  //             recipe["ingredients"] = [];
  //           }
  //         }
  //         return recipes;
  //     }).subscribe(
  //       (recipes: Recipe[]) => {
  //         console.log("fetched recipes", recipes);
  //         this.recipeService.setRecipes(recipes);
  //       }
  //     );

     

    // this.httpClient.get<Recipe[]>(
    //   this.recipeBookUrl + "?auth=" + token,
    //     {
    //       observe: "body",
    //       responseType: "json"
    //     })
    //     .map(
    //       (recipes) => {
    //         for(let recipe of recipes) {
    //           if(!recipe["ingredients"]) {
    //             recipe["ingredients"] = [];
    //           }
    //         }
    //         return recipes;
    //     }).subscribe(
    //       (recipes: Recipe[]) => {
    //         this.recipeService.setRecipes(recipes);
    //       }
    //     );

  //}

}