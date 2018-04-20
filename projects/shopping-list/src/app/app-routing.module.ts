import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent
  },
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      {
        path: "",
        //redirectTo: "recipe-start",
        //pathMatch: ""
        component: RecipeStartComponent
      },
      {
        path: "recipe-start",
        component: RecipeStartComponent
      },
      {
        path: "new",
        component: RecipeEditComponent
      },
      {
        path: ":id",
        component: RecipeDetailComponent
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  
}