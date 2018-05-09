import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable} from "rxjs";
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
//import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { DeepEqual } from '../../shared/deepEqual.service';

import * as fromRecipe from "../store/recipe.reducers";
import * as RecipeActions from "../store/recipe.actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  isCancel = false;

  paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //private recipeService: RecipeService,
    private deepEqual: DeepEqual,
    private store: Store<fromRecipe.FeatureState>) {

  }

  getIngredientsCtrols(): any {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit() {

    this.isCancel = false;

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    console.log(this.recipeForm);

    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );

    console.log("newRecipe", newRecipe);

    if(this.editMode) {
      //this.recipeService.updateRecipe(this.id, newRecipe);

      this.store.dispatch(
        new RecipeActions.UpdateRecipe(
          {index: this.id, recipe: newRecipe}));

      this.router.navigate(["../"], {relativeTo: this.route});
    }
    else{
      //this.id = this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));

      this.store.select("recipes").take(1).subscribe(
        (recipeState: fromRecipe.State) => {

          this.id = recipeState.recipes.length - 1;
          this.router.navigate(["../", this.id], {relativeTo: this.route});
        }
      );

      //this.router.navigate(["../", this.id], {relativeTo: this.route});
      //this.router.navigate(["../"], {relativeTo: this.route});
    }
  }

  onCancel(): void {
    this.isCancel = true;
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, [Validators.required]),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  private initForm() {



    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      //const recipe = this.recipeService.getRecipe(this.id);

      this.store.select("recipes").take(1).subscribe(
        (recipeState: fromRecipe.State) => {

          const recipe = recipeState.recipes[this.id];
          
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
    
          if(recipe["ingredients"]) {
            for(let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  "name": new FormControl(ingredient.name, [Validators.required]),
                  "amount": new FormControl(ingredient.amount, [
                    Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        }
      );
    }

    this.recipeForm = new FormGroup({

      "name": new FormControl(recipeName, [Validators.required]),
      "imagePath": new FormControl(recipeImagePath, [Validators.required]),
      "description": new FormControl(recipeDescription, [Validators.required]),
      "ingredients": recipeIngredients
    });
  }

  canMyComponentDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    console.log("canMyComponentDeactivate");

    const currentRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );


    return new Promise((resolve, reject) => {

      this.store.select("recipes").take(1).subscribe(
        (recipeState: fromRecipe.State) => {
          if(this.isCancel &&
            !this.deepEqual.equals(currentRecipe, recipeState.recipes[this.id])) {
            console.log("canMyComponentDeactivate",  "NOK");
            resolve(confirm("Do you want to discard the changes"));
          }
      
          console.log("canMyComponentDeactivate",  "OK");
          resolve(true);
        }
      );
    });


    // if(this.isCancel &&
    //   !this.deepEqual.equals(currentRecipe, this.recipeService.getRecipe(this.id))) {
    //   console.log("canMyComponentDeactivate",  "NOK");
    //   return confirm("Do you want to discard the changes");
    // }

    // console.log("canMyComponentDeactivate",  "OK");
    // return true;
  }
  
  

}