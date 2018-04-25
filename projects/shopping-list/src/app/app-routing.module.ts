import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "recipes",
    loadChildren: "./recipes/recipes.module#RecipesModule"
  },
  {
    path: "shopping-list",
    loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule"
  }
  // {
  //   path: "",
  //   redirectTo: "/recipes",
  //   pathMatch: "full"
  // }
  // ,
  // {
  //   path: "please-login",
  //   component: PleaseLoginComponent
  // }
  
  // {
  //   path: "**",
  //   redirectTo: "/"
  // }
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