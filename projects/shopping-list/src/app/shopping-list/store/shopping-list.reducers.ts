
import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions  from "./shopping-list.actions";

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[],
  editMode: {
    state: boolean,
    index: number;
  }
}

const initialState: State =  {
  ingredients: [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 11)
  ],
  editMode: {
    state: false,
    index: 0
  }
};

export function shoppingListReducer(

  state = initialState,
  action: ShoppingListActions.ShoppingListActions) {
  
    console.log("shoppingListReducer", state);

    let newIngredients: Ingredient[];

    switch(action.type) {

      case ShoppingListActions.ADD_INGREDIENT:

        console.log("add", state);

        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };

      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.payload],
        }

      case ShoppingListActions.UPDATE_INGREDIENT:
        
        newIngredients = state.ingredients.slice();
        newIngredients[state.editMode.index] = action.payload;
        
        console.log("update", state.editMode.state, state.editMode.index);

        return {
          ...state,
          ingredients: newIngredients,
          editMode: {state: false, index: 0}
        };
      
      case ShoppingListActions.DELETE_INGREDIENT:
        
        console.log("state", state);


        newIngredients = state.ingredients.slice();
        newIngredients.splice(state.editMode.index, 1);

        console.log("delete", state.editMode.state, state.editMode.index);

        return {
          ...state,
          ingredients: newIngredients,
          editMode: {state: false, index: 0}
        };
      
      case ShoppingListActions.EDIT_INGREDIENT:
        
        console.log("change to edit mode", action.payload);

        return {
          ...state,
          editMode: action.payload
        };
      
      default: return state;
  }
}