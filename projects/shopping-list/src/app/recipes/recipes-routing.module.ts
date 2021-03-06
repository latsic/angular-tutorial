import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth-guard.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { CanDeactivateGuard } from "./recipe-edit/can-deactivate-guard.service";

const recipesRoutes: Routes = [
  
  {
    path: "",
    component: RecipesComponent,
    //canActivate: [AuthGuard],
    //canLoad: [AuthGuard],
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
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":id",
        component: RecipeDetailComponent
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {
  
}