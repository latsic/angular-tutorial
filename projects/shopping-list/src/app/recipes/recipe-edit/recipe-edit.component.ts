import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  recipeForm: FormGroup;


  paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {

  }

  ngOnInit() {

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
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.router.navigate(["../"], {relativeTo: this.route});
    }
    else{
      this.id = this.recipeService.addRecipe(newRecipe);
      this.router.navigate(["../", this.id], {relativeTo: this.route});
      //this.router.navigate(["../"], {relativeTo: this.route});
    }
  }

  onCancel(): void {
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
      const recipe = this.recipeService.getRecipe(this.id);
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

    this.recipeForm = new FormGroup({

      "name": new FormControl(recipeName, [Validators.required]),
      "imagePath": new FormControl(recipeImagePath, [Validators.required]),
      "description": new FormControl(recipeDescription, [Validators.required]),
      "ingredients": recipeIngredients
    });

  }

}
