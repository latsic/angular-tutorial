import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { DeepEqual } from "../shared/deepEqual.service";

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { NavbarHamburgerCollapseDirective } from "../shared/navbar-hamburger-collapse.directive";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { AuthGuard } from "../auth/auth-guard.service";
//import { AuthService } from "../auth/auth.service";
//import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
//import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { LoggingInterceptor } from "../shared/logging.interceptor";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NavbarHamburgerCollapseDirective
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    AuthModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    AuthModule
  ],
  providers: [
    //ShoppingListService,
    //RecipeService,
    //DataStorageService,
    //AuthService,
    AuthGuard,
    DeepEqual,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

}