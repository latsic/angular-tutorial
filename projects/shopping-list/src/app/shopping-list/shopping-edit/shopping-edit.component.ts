import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable ,  Subscription } from "rxjs";
import { Ingredient } from '../../shared/ingredient.model';
//import { ShoppingListService } from '../shopping-list.service';


import * as ShoppingListActions  from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducers";
import * as fromApp from "../../store/app.reducers";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild("nameInput")
  // nameInputRef: ElementRef;

  // @ViewChild("amountInput")
  // amountInputRef: ElementRef;

  @ViewChild("nameRef")
  nameRef: ElementRef;

  @ViewChild("f")
  slForm: NgForm;

  //startedEditingSubscription: Subscription
  editMode = false;
  //editedItemIndex: number;
  //editedItem: Ingredient;
  shoppingListStateSubscription: Subscription;
 
  shoppingListState: Observable<fromShoppingList.State>;

  constructor(
    //private slService: ShoppingListService,
    private store: Store<fromApp.AppState>) {
  }

  

  ngOnInit() {

    this.shoppingListState = this.store.select("shoppingList");

    this.shoppingListStateSubscription = this.shoppingListState
      .subscribe(
        (data) => {

          console.log("subscribe", data);

        
          if(data.editMode.state){
            this.editMode = true;
            let editedItem = data.ingredients[data.editMode.index];
          
            this.slForm.setValue({
              "name": editedItem.name,
              "amount": editedItem.amount
            });
          }
          else {
            this.editMode = false;
          }
        }
    );


    // this.startedEditingSubscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.editedItem = this.slService.getIngredient(index);

       

    //     this.slForm.setValue({
    //       "name": this.editedItem.name,
    //       "amount": this.editedItem.amount
    //     });
    //   }
    // );
    console.log(this.slForm);
  }

  onSubmit(form: NgForm): void {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex, newIngredient);

      console.log("is edit mode");

      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient));
    }
    else {

      console.log("non edit mode");

        //this.slService.addIngredient(newIngredient);

        this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient));
    }

    form.reset({"amount": "1"});
    //this.editMode = false;
    
    // this.slService.addIngredient(
    //   new Ingredient(
    //     this.nameInputRef.nativeElement.value,
    //     this.amountInputRef.nativeElement.value));

  }

  onClear() {
    this.slForm.reset({"amount": "1"});
    //this.editMode = false;
    console.log("About to dispatch edit action, on clear()");
    this.store.dispatch(new ShoppingListActions.EditIngredient({state: false, index: 0}));
  }

  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    //this.startedEditingSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.EditIngredient({state: false, index: 0}));
    this.shoppingListStateSubscription.unsubscribe();
  }

}
