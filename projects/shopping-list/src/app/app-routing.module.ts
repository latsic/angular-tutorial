import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { HomeComponent } from "./core/home/home.component";
import { AuthGuard } from "./auth/auth-guard.service";
//import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "recipes",
    canLoad: [AuthGuard],
    loadChildren: "./recipes/recipes.module#RecipesModule"
  },
  {
    path: "shopping-list",
    canLoad: [AuthGuard],
    loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule"
  }
  // 
  // {
  //   path: "shopping-list",
  //   loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule"
  // },
  // {
  //   path: "shopping-list",
  //   component: ShoppingListComponent
  // }
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
    RouterModule.forRoot(
      appRoutes, { 
        preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  
}