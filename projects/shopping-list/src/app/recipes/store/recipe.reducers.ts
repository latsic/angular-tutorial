import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

import * as RecipeActions from "./recipe.actions";
import { AppState } from "../../store/app.reducers";

export interface FeatureState extends AppState{
  recipes: State;
}

export interface State {

  recipes: Recipe[];

}

const initialState: State =  {
  recipes: []
};

export function recipeReducer(
  state = initialState, action: RecipeActions.RecipeActions) {

  switch(action.type) {

    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      {
        const recipes: Recipe[] = [...state.recipes]; 
        const updatedRecipe = {
          ...recipes[action.payload.index],
          ...action.payload.recipe
        };
        recipes[action.payload.index] = updatedRecipe;
        return {
          ...state,
          recipes: recipes
        };
      }
    case RecipeActions.DELETE_RECIPE:
      {
        const recipes: Recipe[] = [...state.recipes];
        recipes.splice(action.payload, 1);
        return {
          ...state,
          recipes: recipes
        }
      }
    default:
      return state;

  }
}