import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shpping-list.service";


@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list-component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredients: Ingredient[];
  private ingredientsChangedSubscription: Subscription


  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingredientsChangedSubscription =
      this.slService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }


}