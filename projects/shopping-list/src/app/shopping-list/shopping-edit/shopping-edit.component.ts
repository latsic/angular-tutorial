import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shpping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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

  startedEditingSubscription: Subscription
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
 
  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {

    this.startedEditingSubscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          "name": this.editedItem.name,
          "amount": this.editedItem.amount
        });
      }
    );
    console.log(this.slForm);
  }

  onSubmit(form: NgForm): void {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
        this.slService.addIngredient(newIngredient);
    }

    form.reset({"amount": "1"});
    this.editMode = false;


    // this.slService.addIngredient(
    //   new Ingredient(
    //     this.nameInputRef.nativeElement.value,
    //     this.amountInputRef.nativeElement.value));

  }

  onClear() {
    this.slForm.reset({"amount": "1"});
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

}
