import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { reducers } from "./store/app.reducers";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HttpModule,
    HttpClientModule,
    SharedModule,
    //AuthModule,
    CoreModule,
    ShoppingListModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
} 
