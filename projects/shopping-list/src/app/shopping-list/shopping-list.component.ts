import { Component, OnInit, OnDestroy } from "@angular/core";
//import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
//import { ShoppingListService } from "./shopping-list.service";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromShoppingList from "./store/shopping-list.reducers";
import * as fromApp from "../store/app.reducers";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list-component.css"]
})
export class ShoppingListComponent implements OnInit {

  //ingredients: Ingredient[];
  shoppingListState: Observable<fromShoppingList.State>;
  //private ingredientsChangedSubscription: Subscription


  constructor(
    //private slService: ShoppingListService,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    // this.ingredientsChangedSubscription =
    //   this.slService.ingredientsChanged.subscribe(
    //     (ingredients: Ingredient[]) => this.ingredients = ingredients
    //   );

    this.shoppingListState = this.store.select("shoppingList");
    
  }

  onEditItem(index: number) {
    //this.slService.startedEditing.next(index);

    console.log("onEditItem");

    this.store.dispatch(
      new ShoppingListActions.EditIngredient({state: true, index: index}));
  }
  

  // ngOnDestroy() {
  //   this.ingredientsChangedSubscription.unsubscribe();
  // }


}