import { Routes, RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { AuthGuard } from "../auth/auth-guard.service";
import { NgModule } from "@angular/core";

const shoppingListRoutes: Routes = [
  {
    //path: "shopping-list",
    //component: ShoppingListComponent,
    //canActivate: [AuthGuard]
     path: "",
     component: ShoppingListComponent
    // canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(shoppingListRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRouting {

}