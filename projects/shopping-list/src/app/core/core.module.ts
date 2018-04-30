import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { NavbarHamburgerCollapseDirective } from "../shared/navbar-hamburger-collapse.directive";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { AuthGuard } from "../auth/auth-guard.service";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shpping-list.service";
import { DeepEqual } from "../shared/deepEqual.service";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NavbarHamburgerCollapseDirective
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuard,
    DeepEqual
  ]
})
export class CoreModule {

}